import { createBrowserRouter } from 'react-router-dom';
import Login from '@/screens/OfflineScreens/Login';
import Register from '@/screens/OfflineScreens/Register';
import App from '../App';
import ErrorPage from '@screens/ErrorScreens/ErrorPage';
import Home from '@screens/OfflineScreens/Home';

const OfflineRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement : <ErrorPage/>,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
]);

export default OfflineRouter;