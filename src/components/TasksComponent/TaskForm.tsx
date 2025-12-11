import { useState } from 'react';
import type { FormDataShape, TaskFormProps } from '../../types';

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [form, setForm] = useState<FormDataShape>({
    title: '',
    description: '',
    status: 'todo',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      title: '',
      description: '',
      status: 'todo',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='border border-[#00ff88] p-4 rounded mb-10
          shadow-[0_0_12px_#00ff88]
          space-y-3'
    >
      <div>
        <label htmlFor='title' className='text-[#66ffbb] text-sm capitalize'>
          {'>'} TITLE
        </label>
        <input
          id='title'
          name='title'
          value={form.title}
          onChange={handleChange}
          placeholder='Task title'
          required
          className='w-full bg-black/80 border border-[#00ff88] rounded p-2
            text-[#00ff88] focus:outline-none
            shadow-[0_0_8px_#00ff88]'
        />
      </div>

      <div>
        <label className='text-[#66ffbb] text-sm'>{'>'} DESCRIPTION</label>
        <textarea
          id='description'
          name='description'
          value={form.description}
          onChange={handleChange}
          placeholder='Description'
          className='w-full bg-black/80 border border-[#00ff88] rounded p-2
            text-[#00ff88] focus:outline-none
            shadow-[0_0_8px_#00ff88]'
        />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
        <div>
          <label className='text-[#66ffbb] text-sm mr-2'>{'>'} STATUS</label>
          <select
            className='w-full bg-black/80 border border-[#00ff88] rounded p-2'
            id='status'
            name='status'
            value={form.status}
            onChange={handleChange}
          >
            <option value='todo'>Todo</option>
            <option value='in-progress'>In Progress</option>
            <option value='done'>Done</option>
          </select>
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <button
          className='bg-[#fdf90a] text-black font-bold py-2 px-4 rounded
            hover:bg-[#ffb700] transition shadow-[0_0_10px_#00ff88]'
          type='submit'
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
