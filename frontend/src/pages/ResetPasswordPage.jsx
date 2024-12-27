import { useState } from "react";
import { motion } from "framer-motion"
import { useAuthStore } from "../store/authStore";
import { useParams, useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import Input from "../components/Input";
import toast from "react-hot-toast";
import { getStrength } from "../components/PasswordChecker";
import PasswordChecker from "../components/PasswordChecker";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState("");

    const { resetPassword, isLoading, error, message } = useAuthStore();
    const {token} = useParams();
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (getStrength(password) < 4) {
            setStatus("Please choose a stronger password.");
            return;
        }
        if (password != confirmPassword) {
          setStatus("Passwords do not match.");
          return;
        }
        setStatus("");
        try {
            await resetPassword(token, password);

            toast.success("Password reset successfully, redirecting to login page...");

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Error resetting password");
        }
    };

    return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
		>
			<div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text'>
					Reset Password
				</h2>

				<form onSubmit={handleSubmit}>
					<Input
						icon={Lock}
						type='password'
						placeholder='New Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<Input
						icon={Lock}
						type='password'
						placeholder='Confirm New Password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
                    {status && <p className='text-red-500 text-sm mb-4'>{status}</p>}				
                    {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
                    {message && <p className='text-green-500 text-sm mb-4'>{message}</p>}
                    
                    <PasswordChecker password={password} />					
                    
                    <motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white
                        font-bold rounded-lg shadow-log hover:from-yellow-600 hover:to-yellow-700 focus:outline-none 
                        focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? "Resetting..." : "Set New Password"}
					</motion.button>
                    
				</form>
			</div>
		</motion.div>
  );
}

export default ResetPasswordPage