import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from './pages/Home';
import Short from './pages/Short';
import Profile from './pages/Profile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/short',
        element: <Short />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '*',
        element: <h1>Not Found</h1>,
      },
    ],
  },
]);
