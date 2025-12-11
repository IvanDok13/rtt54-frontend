/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ui/ErrorMessages';
import Spinner from '../components/ui/Spinner';
import { AuthContext } from '../context/AuthProvider';

export function LoginPage() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('AuthContext not found');

  const { logIn, register } = auth;

  const [showRegister, setShowRegister] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);

      await logIn(email, password);
      navigate('/projects');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);

      await register(username, email, password);
      navigate('/projects');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className='min-h-screen p-6 relative
        bg-[#0a0f0a] text-[#00ff88]
        font-mono flex flex-col items-center gap-4'
    >
      <h1 className='text-4xl mb-6 font-bold tracking-widest flex items-center gap-2 drop-shadow-[0_0_6px_#00ff88]'>
        Start managing your projects
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
              id='username'
              value={username}
              onChange={e => setUsername(e.target.value)}
              className='ml-2 border rounded'
              required
            />
          </label>
          <label htmlFor='email'>
            Email:
            <input
              type='text'
              name='email'
              id='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='ml-10 border rounded'
              required
            />
          </label>
          <label htmlFor='password'>
            Password:
            <input
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='ml-3 border rounded'
              required
            />
          </label>

          <button
            type='submit'
            value='Register'
            className='border py-2 px-4 rounded'
          >
            Register
          </button>

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
              id='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='ml-10 border rounded'
              required
            />
          </label>
          <label htmlFor='password'>
            Password:
            <input
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='ml-3 border rounded'
              required
            />
          </label>
          <button
            type='submit'
            value='Register'
            className='border py-2 px-4 rounded'
          >
            Login
          </button>

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
