import FloatingShape from "./components/FloatingShape";
import { Route, Routes, Navigate } from 'react-router-dom';

import DashboardPage from "./pages/DashboardPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import LoadingSpinner from "./components/LoadingSpinner";

import { Toaster } from 'react-hot-toast';
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

// protect routes that require autehntication
const ProtectedRoute = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (!user.isVerified) {
    return <Navigate to='/verify-email' replace />;
  }

  return children;
};

// redirect authenticated users to homepage
const RedirectAuthenticatedUser = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();
  if (isAuthenticated && user.isVerified) {
    return <Navigate to='/' replace />;
  }
  return children;
};

function App() {
  const {isCheckingAuth, checkAuth, isAuthenticated, user} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }
  console.log(isCheckingAuth, isAuthenticated, user);

  return (
    <div className='min-h-screen bg-gradient-to-br 
    from-gray-950 via-sky-900 to-cyan-900 flex items-center justify-center relative overflow-hidden'>
      {/* <h1 className='text-yellow-500 text-5xl'>hello world</h1> */}
      <FloatingShape color ="bg-sky-600" size="w-64 h-64"  top="-5%" left="10%" delay={0}   />
      <FloatingShape color ="bg-cyan-500" size="w-48 h-48"  top="70%" left="80%" delay={5}   />
      <FloatingShape color ="bg-blue-300" size="w-32 h-32"  top="40%" left="-8%" delay={2}   />

      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
          } />
        <Route path='/signup' 
        element={
          <RedirectAuthenticatedUser>
              <SignUpPage />
          </RedirectAuthenticatedUser>
        } />
        <Route path='/login' 
        element={
          <RedirectAuthenticatedUser>
            <LoginPage />
          </RedirectAuthenticatedUser>
        } />
        <Route path='/verify-email' element={<EmailVerificationPage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App;