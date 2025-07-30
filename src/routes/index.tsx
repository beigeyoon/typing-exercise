import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from './pages/Home';
import Practice from './pages/Practice';
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
        path: '/korean',
        element: <Practice />,
      },
      {
        path: '/english',
        element: <Practice />,
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
