import { createBrowserRouter } from 'react-router-dom';
import Login from '@/screens/OfflineScreens/Login';
import Register from '@/screens/OfflineScreens/Register';
import App from '../App';
import ErrorPage from '@screens/ErrorScreens/ErrorPage';
import Home from '@screens/OfflineScreens/Home';
import Profil from '@screens/OnlineScreens/Profil';
import ProductDetail from '@screens/OfflineScreens/ProductDetail';
import MessageView from '@screens/OnlineScreens/MessageView';
import ResellView from '@screens/OfflineScreens/ResellView';
import GuideView from '@screens/OfflineScreens/GuideView';
import CatalogueView from '@screens/OfflineScreens/CatalogueView';
import OrderView from '@screens/OnlineScreens/OrderView';
import OrderDetail from '@screens/OnlineScreens/OrderDetail';
import WalletView from '@screens/OnlineScreens/WalletView';
import FavoriteView from '@screens/OnlineScreens/FavoriteView';

const OfflineRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'profil', element: <Profil /> },
      { path: 'product/:id', element: <ProductDetail /> },
      { path: 'resell', element: <ResellView /> },
      { path: 'guide', element: <GuideView /> },
      { path: 'catalogue', element: <CatalogueView /> },
      { path: 'order', element: <OrderView /> },
      { path: 'order/:id', element: <OrderDetail /> },
      { path: 'wallet', element: <WalletView /> },
      { path: 'favorite', element: <FavoriteView /> },
      {
        path: "messages",
        element: < MessageView />,
      }
    ],
  },
]);

export default OfflineRouter;