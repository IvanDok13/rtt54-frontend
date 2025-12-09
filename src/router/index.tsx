import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ProjectDetailsPage } from '../pages/ProjectDetailsPage';
import { ProjectPage } from '../pages/ProjectPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },

      { path: 'projects', element: <ProjectPage /> },

      { path: 'projects/:projectId', element: <ProjectDetailsPage /> },

      { path: 'users/login', element: <LoginPage /> },

      // { path: 'users/register', element: <RegisterPage /> },

      // { path: 'users/profile', element: <ProfilePage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
