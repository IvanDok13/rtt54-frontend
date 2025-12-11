/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiClient } from '../clients/api';
import { TaskForm } from '../components/TasksComponent/TaskForm';

import EmptyState from '../components/ui/EmptyState';
import ErrorMessage from '../components/ui/ErrorMessages';
import Spinner from '../components/ui/Spinner';

import TaskEditComponent from '../components/TasksComponent/TaskEditComponent';
import TaskItemComponent from '../components/TasksComponent/TaskItemComponent';

import type { FormDataShape, Project, Task } from '../types/index';

export function ProjectDetailsPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const { projectId } = useParams();

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FormDataShape>({
    title: '',
    description: '',
    status: 'todo',
  });

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setError('');
        setLoading(true);
        const res = await apiClient.get(`/api/projects/${projectId}`);
        setProject(res.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) fetchProjectDetails();
  }, [projectId]);

  useEffect(() => {
    if (!projectId) return;

    const fetchTasks = async () => {
      try {
        setError('');
        setLoading(true);
        const res = await apiClient.get(`/api/projects/${projectId}/tasks`);
        setTasks(res.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId]);

  const handleDeleteTask = async (taskId: string) => {
    try {
      setError('');
      setLoading(true);
      await apiClient.delete(`/api/projects/${projectId}/tasks/${taskId}`);
      setTasks(prev => prev.filter(task => task._id !== taskId));
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (data: FormDataShape) => {
    try {
      setError('');
      setLoading(true);

      const res = await apiClient.post(
        `/api/projects/${projectId}/tasks`,
        data
      );

      setTasks(prev => [...prev, res.data]);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (task: Task) => {
    setEditingTaskId(task._id);
    setEditForm({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const cancelEditing = () => setEditingTaskId(null);

  const handleUpdateTask = async (taskId: string) => {
    try {
      setError('');
      setLoading(true);

      const res = await apiClient.put(
        `/api/projects/${projectId}/tasks/${taskId}`,
        editForm
      );

      setTasks(prev =>
        prev.map(task => (task._id === taskId ? res.data : task))
      );

      setEditingTaskId(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className='min-h-screen p-6 relative
        bg-[#0a0f0a] text-[#00ff88]
        font-mono'
    >
      <h1 className='text-4xl mb-6 font-bold tracking-widest flex items-center gap-2 drop-shadow-[0_0_6px_#00ff88]'>
        Project Details
      </h1>

      {error && <ErrorMessage message={error} />}
      {loading && <Spinner />}

      {project && (
        <div
          className='flex flex-col border border-[#00ff88] p-4 rounded mb-10
          shadow-[0_0_12px_#00ff88]
          space-y-3'
        >
          <div className='text-2xl mb-4 tracking-wide'>{project.name}</div>
          <div className='text-2xl mb-4 tracking-wide'>
            {project.description}
          </div>

          <TaskForm onSubmit={handleCreateTask} />
        </div>
      )}

      <h2 className='text-2xl mb-4 tracking-wide'>Tasks</h2>

      {tasks.length === 0 && <EmptyState text='No tasks found.' />}

      <ul>
        {tasks.map(task =>
          editingTaskId === task._id ? (
            <TaskEditComponent
              key={task._id}
              task={task}
              editForm={editForm}
              setEditForm={setEditForm}
              cancelEditing={cancelEditing}
              handleUpdateTask={handleUpdateTask}
            />
          ) : (
            <TaskItemComponent
              key={task._id}
              task={task}
              onEdit={() => startEditing(task)}
              onDelete={() => handleDeleteTask(task._id)}
            />
          )
        )}
      </ul>
    </div>
  );
}
