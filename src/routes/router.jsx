import { createBrowserRouter } from 'react-router-dom';
import Root from '../layouts/Root';
import ErrorPage from '../pages/ErrorPage';
import AllTasks from '../pages/AllTasks';
import Completed from '../pages/Completed';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import PrivateRoute from './PrivateRoute';
import EditTask from '../pages/EditTask';
import Incomplete from '../pages/Incomplete';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <AllTasks />
          </PrivateRoute>
        ),
      },
      {
        path: '/completed',
        element: (
          <PrivateRoute>
            <Completed />
          </PrivateRoute>
        ),
      },
      {
        path: '/incomplete',
        element: (
          <PrivateRoute>
            <Incomplete />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/edit-task/:id',
    element: <EditTask />,
  },
]);

export default router;
