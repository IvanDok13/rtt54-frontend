import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiClient } from '../clients/api';
import ErrorMessage from '../components/ui/ErrorMessages';
import Spinner from '../components/ui/Spinner';
import type { Project } from '../types/index';

export function ProjectDetailsPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { projectId } = useParams();
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(`/api/projects/${projectId}`);
        console.log(res.data);
        setProject(res.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);
  return (
    <div className='text-white p-5'>
      <h1 className='text-4xl'>Project details</h1>
      {error && <ErrorMessage message={error} />}
      {loading && <Spinner />}
      {project && <div>{project.name}</div>}
      {project && <div>{project.description}</div>}
    </div>
  );
}
