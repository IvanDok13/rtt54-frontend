import type { ErrorMessageProps } from '../../types';

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className='text-red-600 text-center p-5'>
      <p>{message || 'Something went wrong. Please try again.'}</p>
    </div>
  );
}
