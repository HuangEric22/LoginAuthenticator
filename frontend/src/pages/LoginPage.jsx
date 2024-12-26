import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { login, isLoading, error } = useAuthStore();

    const handleLogin = async (e) => {
        e.preventDefault();
        await login(email, password);
    }
  
    return (
    <motion.div
        initial={{ opacity: 0, y:20 }}
        animate={{ opacity: 1, y:0 }}
        transition={{ duration: 0.5 }}
        className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'    
    >
        <div className='p-8'>
            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text'>
                Welcome Back!
            </h2>

            <form onSubmit={handleLogin}>
                <Input 
                    icon={Mail} 
                    type='email' 
                    placeholder='Email Address' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                    icon={Lock} 
                    type='password' 
                    placeholder='Password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="flex items-center mb-6">
                    <Link to='/forgot-password' className='text-sm text-sky-500 hover:underline'>
                        Forgot Password?
                    </Link>
                </div>
                {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}
                <motion.button 
                    className='w-full py-3 px-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white
                    font-bold rounded-lg shadow-lg hover:from-yellow-600 hover:to-yellow-700 focus:outline-none 
                    focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Sign In"}
                </motion.button>
            </form>
        </div>
        <div className='bg-gray-900 bg-opacity-50 py-4 px-8 flex justify-center'>
            <p className='text-sm text-gray-400'>
                Don't have an account?{" "}
                <Link to='/signup' className='text-sky-500 hover:underline'>
                Sign Up
                </Link>
            </p>
        </div>
    </motion.div>
  )
}

export default LoginPage