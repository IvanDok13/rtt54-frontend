/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../clients/api';
import { ProjectForm } from '../components/ProjectComponent/ProjectForm';
import ErrorMessage from '../components/ui/ErrorMessages';
import Spinner from '../components/ui/Spinner';
import type { Project, ProjectDataShape } from '../types';

export function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSpinner(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get('/api/projects');
        setProjects(res.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading || showSpinner) return <Spinner />;

  const handleDelete = async (projectId: string) => {
    try {
      setError('');
      setLoading(true);
      await apiClient.delete(`/api/projects/${projectId}`);
      setProjects(prev => prev.filter(task => task._id !== projectId));
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (data: ProjectDataShape) => {
    try {
      setError('');
      setLoading(true);

      const res = await apiClient.post(`/api/projects/${projects}/tasks`, data);

      setProjects(prev => [...prev, res.data]);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className='
        min-h-screen p-6 relative
        bg-[#0a0f0a] text-[#00ff88]
        font-mono
      '
    >
      <div
        className='
          pointer-events-none absolute inset-0
          opacity-20
          bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.35)_51%)]
          bg-[length:100%_4px]
        '
      />

      <h1 className='text-4xl mb-6 font-bold tracking-widest flex items-center gap-2 drop-shadow-[0_0_6px_#00ff88]'>
        <span className='animate-pulse'>█</span> PROJECT TERMINAL
      </h1>

      {error && <ErrorMessage message={error} />}

      <ProjectForm onSubmit={handleCreateProject} />

      <h2 className='text-2xl mb-4 tracking-wide'>{'>'} ACTIVE PROJECTS</h2>

      <div className='flex flex-wrap gap-6'>
        {projects.map(project => (
          <div
            key={project._id}
            className='
              p-4 border border-[#00ff88] rounded w-64 bg-black/20
              shadow-[0_0_10px_#00ff88]
            '
          >
            <div className='font-bold text-[#00ffcc] drop-shadow-[0_0_4px_#00ffcc]'>
              {project.name}
            </div>

            <p className='text-sm text-[#66ffbb] mt-1 w-full'>
              {project.description}
            </p>

            <div className='flex flex-row gap-4'>
              <Link
                to={`/projects/${project._id}`}
                className='
                mt-4 inline-block bg-[#00ff88] text-black font-semibold 
                py-2 px-4 rounded shadow-[0_0_10px_#00ff88]
                hover:bg-[#00ffaa] transition
              '
              >
                OPEN →
              </Link>

              <button
                onClick={() => handleDelete(project._id)}
                className='
              mt-4 inline-block bg-[#cd3838] text-black font-semibold 
                py-2 px-4 rounded shadow-[0_0_10px_#00ff88]
                hover:bg-[#f60707] transition'
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
