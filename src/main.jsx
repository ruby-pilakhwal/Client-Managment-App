import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

// Initialize localStorage
import { setLocalStorage } from './utils/localStorage.jsx'
setLocalStorage();

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </StrictMode>
)
