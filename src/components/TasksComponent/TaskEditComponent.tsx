import type { TaskEditProps, TaskStatus } from '../../types/index';

export default function TaskEditComponent({
  task,
  editForm,
  setEditForm,
  cancelEditing,
  handleUpdateTask,
}: TaskEditProps) {
  return (
    <li
      className='border border-[#00ff88] p-4 rounded mb-10
          shadow-[0_0_12px_#00ff88]
          space-y-3'
    >
      <input
        className='w-full bg-black/80 border border-[#00ff88] rounded p-2
            text-[#81e2b5] focus:outline-none
            shadow-[0_0_8px_#00ff88]'
        value={editForm.title}
        onChange={e => setEditForm({ ...editForm, title: e.target.value })}
      />

      <textarea
        className='w-full bg-black/80 border border-[#00ff88] rounded p-2
            text-[#81e2b5] focus:outline-none
            shadow-[0_0_8px_#00ff88]'
        value={editForm.description}
        onChange={e =>
          setEditForm({ ...editForm, description: e.target.value })
        }
      />

      <select
        className='w-full bg-black/80 border border-[#00ff88] rounded p-2
            text-[#81e2b5] focus:outline-none
            shadow-[0_0_8px_#00ff88]'
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
          className='bg-green-600 text-black font-bold py-2 px-4 rounded
            hover:bg-green-300 transition shadow-[0_0_10px_#00ff88]'
        >
          Save
        </button>

        <button
          onClick={cancelEditing}
          className='bg-gray-500 text-black font-bold py-2 px-4 rounded
            hover:bg-gray-300 transition shadow-[0_0_10px_#00ff88]'
        >
          Cancel
        </button>
      </div>
    </li>
  );
}
