import { createBrowserRouter } from 'react-router-dom';
import Home from '@screens/OfflineScreens/Home';
import ErrorPage from '@screens/ErrorScreens/ErrorPage';
import App from '../App';
import Profil from '@screens/OnlineScreens/Profil';


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
      }
    ],
  },
]);

export default OnlineRouter;