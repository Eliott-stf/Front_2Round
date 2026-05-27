import { createBrowserRouter } from 'react-router-dom';
import Login from '@/screens/OfflineScreens/Login';
import Register from '@/screens/OfflineScreens/Register';
import App from '../App';
import ErrorPage from '@screens/ErrorScreens/ErrorPage';
import Home from '@screens/OfflineScreens/Home';
import Profil from '@screens/OnlineScreens/Profil';

const OfflineRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement : <ErrorPage/>,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'profil', element: <Profil /> },
    ],
  },
]);

export default OfflineRouter;