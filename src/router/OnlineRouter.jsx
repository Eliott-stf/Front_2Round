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
import AdminCategories from '@screens/AdminScreens/AdminCategories';
import AdminAttributes from '@screens/AdminScreens/AdminAttributes';
import CatalogueView from '@screens/OfflineScreens/CatalogueView';
import ProductDetail from '@screens/OfflineScreens/ProductDetail';
import ResellView from '@screens/OfflineScreens/ResellView';
import GuideView from '@screens/OfflineScreens/GuideView';
import OrderView from '@screens/OnlineScreens/OrderView';
import OrderDetail from '@screens/OnlineScreens/OrderDetail';
import WalletView from '@screens/OnlineScreens/WalletView';
import FavoriteView from '@screens/OnlineScreens/FavoriteView';
import ProductCreateView from '@screens/OnlineScreens/ProductCreateView';
import DiscoverView from '@screens/OnlineScreens/DiscoverView';



const OnlineRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'profil', element: <Profil /> },
      {
        path: "profil/:id",
        element: <Profil />,
      },
      { path: 'catalogue', element: <CatalogueView /> },
      { path: 'catalogue/:categorySlug', element: <CatalogueView /> },
      { path: 'product/:slugAndId', element: <ProductDetail /> },
      { path: 'resell', element: <ResellView /> },
      { path: 'vendre/new', element: <ProductCreateView /> },
      { path: 'guide', element: <GuideView /> },
      { path: 'order', element: <OrderView /> },
      { path: 'order/:id', element: <OrderDetail /> },
      { path: 'wallet', element: <WalletView /> },
      { path: 'favorite', element: <FavoriteView /> },
      { path: 'discover', element: <DiscoverView /> },
      { path: 'messages', element: <MessageView /> }
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
      { path: 'categories', element: <AdminCategories /> },
      { path: 'attributes', element: <AdminAttributes /> },
      { path: 'orders', element: <AdminOrders /> },
      { path: 'reports', element: <AdminReports /> },
    ],
  },
]);

export default OnlineRouter;