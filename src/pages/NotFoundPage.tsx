import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center'>
      <h1 className='text-4xl font-bold text-gray-800 mb-6'>
        404 - Page Not Found
      </h1>
      <p className='text-lg text-gray-600 mb-8 max-w-md'>
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        to='/'
        className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-md'
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
