import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppRouter from './router/AppRouter.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/** TODO: AuthContext / Store / Router  */}
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  </StrictMode>,
)
