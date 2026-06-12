import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppRouter from './router/AppRouter.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { Provider } from 'react-redux'
import { store } from '@store/store'
import { SocketContextProvider } from './contexts/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Context d'authentification: disponible dans toute l'app  */}
    <AuthContextProvider>
      {/* Store redux: gère l'atat global*/}
      <Provider store={store}>
        <SocketContextProvider>
          {/* Router: Gère la navigation entre les pages*/}
          <AppRouter />
        </SocketContextProvider>
      </Provider>
    </AuthContextProvider>
  </StrictMode>,
)
