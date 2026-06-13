//==================================
// ROUTER PRINCIPAL DE L'APPLICATION
//==================================
//ce router determine quel router afficher selon l'etat de connexion 
//utilisateur connecté -> OnlineRouter (application complete)
//utilisateur pas connecté -> OfflineRouter (acces a login / register / home)

import { createContext, useContext, useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import OnlineRouter from './OnlineRouter';
import OfflineRouter from './OfflineRouter';
import PageLoader from '../components/Loader/PageLoader';
import { useAuthContext } from '@contexts/AuthContext';

//====================
// CONTEXTE DE SESSION
//====================
//Mini contexte pour partager l'état de connexion dans l'app
const SessionContext = createContext({ inSession: false });

//Hook personnalisé pour acceder au context de session
export const useSessionContext = () => useContext(SessionContext);

const AppRouter = () => {
  const { userId } = useAuthContext();
  const [inSession, setInSession] = useState(() => !!userId);

  //===================================
  // VERIFICATION DE SESSION AU MONTAGE
  //===================================
  useEffect(() => {
    setInSession(!!userId);
  }, [userId]);

  return (
    <SessionContext.Provider value={{ inSession, setInSession }}>
      <RouterProvider router={inSession ? OnlineRouter : OfflineRouter} />
    </SessionContext.Provider>
  );
};

export default AppRouter;