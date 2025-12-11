import type { TaskItemProps } from '../../types/index';

export default function TaskItemComponent({
  task,
  onEdit,
  onDelete,
}: TaskItemProps) {
  return (
    <li className='border border-gray-600 p-3 mt-2 rounded'>
      <div className='font-bold'>{task.title}</div>
      <div className='text-gray-300'>{task.description}</div>
      <div>Status: {task.status}</div>

      <div className='flex gap-2 mt-2'>
        <button
          onClick={onEdit}
          className='bg-blue-600 text-black font-bold py-2 px-4 rounded
            hover:bg-blue-300 transition'
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          className='bg-red-700 text-black font-bold py-2 px-4 rounded
            hover:bg-red-400 transition'
        >
          Delete
        </button>
      </div>
    </li>
  );
}
