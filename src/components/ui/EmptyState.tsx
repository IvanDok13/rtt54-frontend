import type { EmptyStateProps } from '../../types';

export default function EmptyState({ text }: EmptyStateProps) {
  return (
    <div className='p-6 text-center opacity-70'>
      <p>{text || 'No data available.'}</p>
    </div>
  );
}
