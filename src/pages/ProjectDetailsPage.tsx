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
    <div className='text-white p-5 w-full h-full background-gradient'>
      <h1 className='text-4xl'>Project Details</h1>

      {error && <ErrorMessage message={error} />}
      {loading && <Spinner />}

      {project && (
        <div className='text-white flex flex-col border border-red-500 p-2 text-center rounded'>
          <div className='font-bold'>{project.name}</div>
          <div>{project.description}</div>

          <TaskForm onSubmit={handleCreateTask} />
        </div>
      )}

      <h2 className='text-2xl mt-6'>Tasks</h2>

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
