import { useState } from 'react';

import type { ProjectDataShape, ProjectFormDataShape } from '../../types/index';

export function ProjectForm({ onSubmit }: ProjectFormDataShape) {
  const [form, setForm] = useState<ProjectDataShape>({
    name: '',
    description: '',
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
      name: '',
      description: '',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='
          border border-[#00ff88] p-4 rounded mb-10
          shadow-[0_0_12px_#00ff88]
          space-y-3
        '
    >
      <label className='text-[#66ffbb] text-sm'>{'>'} PROJECT NAME</label>
      <input
        type='text'
        className='
            w-full bg-black/80 border border-[#00ff88] rounded p-2
            text-[#00ff88] focus:outline-none
            shadow-[0_0_8px_#00ff88]
          '
        onChange={handleChange}
        value={form.name}
      />

      <label className='text-[#66ffbb] text-sm'>
        {'>'} PROJECT DESCRIPTION
      </label>
      <textarea
        className='
            w-full bg-black/80 border border-[#00ff88] rounded p-2
            text-[#00ff88] focus:outline-none
            shadow-[0_0_8px_#00ff88]
          '
        onChange={handleChange}
        value={form.description}
      ></textarea>

      <button
        type='submit'
        className='
            bg-[#00ff88] text-black font-bold py-2 px-4 rounded
            hover:bg-[#00ffaa] transition shadow-[0_0_10px_#00ff88]
          '
      >
        CREATE PROJECT
      </button>
    </form>
  );
}
