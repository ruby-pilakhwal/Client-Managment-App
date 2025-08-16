import { useEffect, useContext } from "react";
import { AuthContext } from './context/AuthProvider';
import Login from './components/Auth/Login';
import EmployDashboard from './components/Dashboard/EmployDashboard';
import AdminDashboard from "./components/Dashboard/AdminDashboard";

function App() {
  const { authState, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const handleLogin = (email, password) => {
    // This will be handled by the AuthProvider
    // The actual login logic should be moved to AuthProvider
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!authState.isAuthenticated ? (
        <Login handleLogin={handleLogin} />
      ) : authState.role === 'admin' ? (
        <AdminDashboard />
      ) : (
        <EmployDashboard data={authState.user} />
      )}
    </div>
  );
}

export default App;
