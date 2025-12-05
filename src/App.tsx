import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ProjectDetailsPage } from './pages/ProjectDetailsPage';
import { ProjectPage } from './pages/ProjectPage';

function App() {
  return (
    <>
      <div className='p-5 bg-zinc-900 h-screen'>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/projects' element={<ProjectPage />} />
          <Route path='/projects/:projectId' element={<ProjectDetailsPage />} />

          <Route path='*' element={<div>404</div>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
