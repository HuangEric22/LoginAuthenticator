import { motion } from 'framer-motion';
import Input from '../components/Input';
import { Mail, User, Lock, Loader } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordChecker from '../components/PasswordChecker';
import { useAuthStore } from '../store/authStore';

const SignUpPage = () => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup, error, isLoading } = useAuthStore();
    const navigate = useNavigate();
    
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await signup(email, password, name);
            navigate("verify-email");
        } catch (error) {
            console.log(error);
        }
    }

    return (
    <motion.div
        initial={{ opacity: 0, y:20 }}
        animate={{ opacity: 1, y:0 }}
        transition={{ duration: 0.5 }}
        className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filer backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
    
    <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text'>
            Create an Account
        </h2>

        <form onSubmit={handleSignUp}>
            <Input 
            icon={User} 
            type='text' 
            placeholder='Full Name' 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            />
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
            {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
            <PasswordChecker password={password} />

            <motion.button 
                className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white
                font-bold rounded-lg shadow-log hover:from-yellow-600 hover:to-yellow-700 focus:outline-none 
                focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type='submit'
                disabled={isLoading}
                
            >{isLoading ? <Loader className=" animate-spin mx-auto" size={24} /> : "Sign Up" }</motion.button>
        </form>
    </div>
    <div className='bg-gray-900 bg-opacity-50 py-4 px-8 flex justify-center'>
        <p className='text-sm text-gray-400'>
            Already have an account?{" "}
            <Link to='/login' className='text-sky-500 hover:underline'>
            Sign In
            </Link>
        </p>
    </div>
    </motion.div>
  );
};

export default SignUpPage