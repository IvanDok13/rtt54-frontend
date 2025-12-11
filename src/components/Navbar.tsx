import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

export function Navbar() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('AuthContext not found');
  const { logOut } = auth;

  return (
    <nav className='text-white flex justify-between items-center w-full h-10'>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/projects'>Projects</NavLink>
      <NavLink to='/login'>Signin/Signup</NavLink>

      <button
        onClick={logOut}
        className='px-3 py-1 bg-red-600 hover:bg-red-700 rounded'
      >
        Logout
      </button>
    </nav>
  );
}
