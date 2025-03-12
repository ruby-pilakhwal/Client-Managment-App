import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import AuthContext from './context/AuthContext.jsx'
// import TaskContext from './context/TaskContext.jsx'
import Authprovider from './context/AuthProvider.jsx'
import { setLocalStorage } from './utils/localStorage.jsx'
setLocalStorage();
createRoot(document.getElementById('root')).render(
   
    // <App />
    <Authprovider>
        
            <App/>
     
    </Authprovider>
    
 
)
