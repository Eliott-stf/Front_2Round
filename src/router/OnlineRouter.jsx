import { createBrowserRouter } from 'react-router-dom';
import Home from '@screens/OfflineScreens/Home';
import ErrorPage from '@screens/ErrorScreens/ErrorPage';
import App from '../App';
import Profil from '@screens/OnlineScreens/Profil';
import MessageView from '@screens/OnlineScreens/MessageView';
import AdminLayout from '@components/Admin/AdminLayout';
import AdminDashboard from '@screens/AdminScreens/AdminDashboard';
import AdminUsers from '@screens/AdminScreens/AdminUsers';
import AdminProducts from '@screens/AdminScreens/AdminProducts';
import AdminOrders from '@screens/AdminScreens/AdminOrders';
import AdminReports from '@screens/AdminScreens/AdminReports';



const OnlineRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "profil/:id",
        element: <Profil />,
      },
      // {
      //   path: "message",
      //   element: < MessageView/>,
      // }
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'users', element: <AdminUsers /> },
      { path: 'products', element: <AdminProducts /> },
      { path: 'orders', element: <AdminOrders /> },
      { path: 'reports', element: <AdminReports /> },
    ],
  },
]);

export default OnlineRouter;