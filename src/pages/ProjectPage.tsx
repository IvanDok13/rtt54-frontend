import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../clients/api';
import ErrorMessage from '../components/ui/ErrorMessages';
import Spinner from '../components/ui/Spinner';
import type { Project } from '../types';

export function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get('/api/projects');
        console.log(res.data);
        setProjects(res.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <Spinner />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await apiClient.post('/api/projects', { name, description });
      setProjects(prev => [...prev, res.data]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
      setName('');
      setDescription('');
    }
  };
  return (
    <div className='text-white'>
      <h1 className='text-4xl font-bold text-white'>Projects</h1>

      <form
        onSubmit={handleSubmit}
        className=' border p-2 h-50 mt-10 flex flex-col gap-2 rounded'
      >
        <label htmlFor='project-name'>Project Name: </label>
        <input
          type='text'
          name='project-name'
          className='border'
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <label htmlFor='project-description'>Project Description</label>
        <input
          type='text'
          name='project-description'
          className='border'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <input
          type='submit'
          value='Create Project'
          className='mt-auto inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-md'
        />
      </form>

      {error && <ErrorMessage message={error} />}

      <div className='w-full flex gap-5 mt-10'>
        {projects &&
          projects.map(project => (
            <div
              key={project._id}
              className='text-white w-50 flex flex-col h-50 border border-red-500 p-2 text-center rounded'
            >
              <div className='font-bold'>{project.name}</div>
              <div>{project.description}</div>
              <Link
                to={`/projects/${project._id}`}
                className='mt-auto inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-md'
              >
                See Project
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
