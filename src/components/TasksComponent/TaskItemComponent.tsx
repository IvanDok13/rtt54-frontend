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
          className='px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded'
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          className='px-3 py-1 bg-red-600 hover:bg-red-700 rounded'
        >
          Delete
        </button>
      </div>
    </li>
  );
}
