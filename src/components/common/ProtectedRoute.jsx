import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function ProtectedRoute({ children }) {
  const { token, loading } = useContext(AuthContext);

  // Agar context abhi bhi token check kar raha hai, toh kuch na dikhayein
  if (loading) {
    return <div>Loading...</div>; // Ya ek loading spinner dikha sakte hain
  }
  
  // Agar token nahi hai, toh login page par bhej dein
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;