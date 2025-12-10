import type { TaskEditProps, TaskStatus } from '../../types/index';

export default function TaskEditComponent({
  task,
  editForm,
  setEditForm,
  cancelEditing,
  handleUpdateTask,
}: TaskEditProps) {
  return (
    <li className='border border-gray-600 p-3 mt-2 rounded space-y-2'>
      <input
        className='w-full px-2 py-1 text-white rounded'
        value={editForm.title}
        onChange={e => setEditForm({ ...editForm, title: e.target.value })}
      />

      <textarea
        className='w-full px-2 py-1 text-white rounded'
        value={editForm.description}
        onChange={e =>
          setEditForm({ ...editForm, description: e.target.value })
        }
      />

      <select
        className='px-2 py-1 text-white rounded'
        value={editForm.status}
        onChange={e =>
          setEditForm({
            ...editForm,
            status: e.target.value as TaskStatus,
          })
        }
      >
        <option value='todo'>Todo</option>
        <option value='in-progress'>In Progress</option>
        <option value='done'>Done</option>
      </select>

      <div className='flex gap-2 mt-2'>
        <button
          onClick={() => handleUpdateTask(task._id)}
          className='px-3 py-1 bg-green-600 hover:bg-green-700 rounded'
        >
          Save
        </button>

        <button
          onClick={cancelEditing}
          className='px-3 py-1 bg-gray-500 hover:bg-gray-600 rounded'
        >
          Cancel
        </button>
      </div>
    </li>
  );
}
