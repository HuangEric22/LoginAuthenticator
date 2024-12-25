import FloatingShape from "./components/FloatingShape";
import { Route, Routes } from 'react-router-dom';
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";

function App() {
  return (
    <div className='min-h-screen bg-gradient-to-br 
    from-gray-950 via-sky-900 to-cyan-900 flex items-center justify-center relative overflow-hidden'>
      {/* <h1 className='text-yellow-500 text-5xl'>hello world</h1> */}
      <FloatingShape color ="bg-sky-600" size="w-64 h-64"  top="-5%" left="10%" delay={0}   />
      <FloatingShape color ="bg-cyan-500" size="w-48 h-48"  top="70%" left="80%" delay={5}   />
      <FloatingShape color ="bg-blue-300" size="w-32 h-32"  top="40%" left="-8%" delay={2}   />

      <Routes>
        <Route path='/' element={"Home"} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/verify-email' element={<EmailVerificationPage />} />
      </Routes>
    </div>
  )
}

export default App;