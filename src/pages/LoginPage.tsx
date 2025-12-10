import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../clients/api';
import ErrorMessage from '../components/ui/ErrorMessages';
import Spinner from '../components/ui/Spinner';

export function LoginPage() {
  const [showRegister, setShowRegister] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      // api call here
      const res = await apiClient.post('/api/users/login', {
        email,
        password,
      });
      console.log('Login successful:', res.data);

      localStorage.setItem('token', JSON.stringify(res.data.token));
      localStorage.setItem('user', JSON.stringify(res.data.user));

      navigate('/projects');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setError('');
      setLoading(true);
      // api call here
      const res = await apiClient.post('/api/users/register', {
        username,
        email,
        password,
      });
      console.log('Registration successful:', res.data);

      localStorage.setItem('token', JSON.stringify(res.data.token));
      localStorage.setItem('user', JSON.stringify(res.data.user));

      navigate('/projects');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='text-white flex flex-col items-center justify-center'>
      <h1 className='text-3xl font-bold mt-10 text-center'>
        Start managing your projects.
      </h1>

      {error && <ErrorMessage message={error} />}

      {showRegister ? (
        <form
          onSubmit={handleRegister}
          className='border mt-10 p-2 h-60 w-150 flex flex-col justify-around items-center rounded'
        >
          <div className='text-xl font-bold'>Register</div>

          <label htmlFor='username'>
            Username:
            <input
              type='text'
              name='username'
              id=''
              value={username}
              onChange={e => setUsername(e.target.value)}
              className='ml-2 border rounded'
            />
          </label>
          <label htmlFor='email'>
            Email:
            <input
              type='text'
              name='email'
              id=''
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='ml-10 border rounded'
            />
          </label>
          <label htmlFor='password'>
            Password:
            <input
              type='password'
              name='password'
              id=''
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='ml-3 border rounded'
            />
          </label>

          <input
            type='submit'
            value='Register'
            className='border py-2 px-4 rounded'
          />

          {loading && <Spinner />}
        </form>
      ) : (
        <form
          onSubmit={handleLogin}
          className='border mt-10 p-2 h-60 w-150 flex flex-col justify-around items-center rounded'
        >
          <div className='text-xl font-bold'>Login</div>
          <label htmlFor='email'>
            Email:
            <input
              type='text'
              name='email'
              id=''
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='ml-10 border rounded'
            />
          </label>
          <label htmlFor='password'>
            Password:
            <input
              type='password'
              name='password'
              id=''
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='ml-3 border rounded'
            />
          </label>
          <input
            type='submit'
            value='Register'
            className='border py-2 px-4 rounded'
          />

          {loading && <Spinner />}
        </form>
      )}

      {/* TOGGLE FORM  */}
      {showRegister ? (
        <div>
          Already have an account?{' '}
          <span
            className='text-blue-500 hover:cursor-pointer'
            onClick={() => setShowRegister(false)}
          >
            Sign in
          </span>{' '}
        </div>
      ) : (
        <div>
          Don't have an account?{' '}
          <span
            className='text-blue-500 hover:cursor-pointer'
            onClick={() => setShowRegister(true)}
          >
            Sign up
          </span>{' '}
        </div>
      )}
    </div>
  );
}
