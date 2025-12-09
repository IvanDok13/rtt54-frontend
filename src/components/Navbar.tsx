import { NavLink } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className='text-white flex justify-between items-center w-full h-10'>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/projects'>Projects</NavLink>
      <NavLink to='/login'>Signin/Signup</NavLink>
    </nav>
  );
}
