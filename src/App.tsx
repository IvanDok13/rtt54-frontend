import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <>
      <div className='p-5 bg-zinc-900 h-screen'>
        <Navbar />

        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
