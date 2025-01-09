import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import Layout
 from "../layout/Layout";
const DashboardPage = () => {
  const { user, logout, error } = useAuthStore();
  const handleLogout = () => {
    try {
      logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // <Layout>
		<motion.div
		initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ duration: 0.5 }}
				className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'>

		<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text'>
					Dashboard
				</h2>

		<div className="space-y-6">
			<motion.div
				className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
			<h3 className='text-xl font-semibold text-yellow-500 mb-3'>Profile Information</h3>
			<p className='text-gray-300'>Name: {user.name}</p>
			<p className='text-gray-300'>Email: {user.email}</p>
			</motion.div>
					
			<motion.div
						className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
					>
						<h3 className='text-xl font-semibold text-yellow-500 mb-3'>Account Activity</h3>
						<p className='text-gray-300'>
							<span className='font-bold'>Joined: </span>
							{new Date(user.createdAt).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</p>
						<p className='text-gray-300'>
							<span className='font-bold'>Last Login: </span>
							{formatDate(user.lastLogin)}
						</p>
					</motion.div>
		</div>
		
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}
					className='mt-4'
				>
					{error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}
			<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={handleLogout}
						className='w-full py-3 px-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white 
					font-bold rounded-lg shadow-lg hover:from-yellow-600 hover:to-yellow-700
					focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900'
					>
						Logout
					</motion.button>
				</motion.div>

		</motion.div>
	// </Layout>	
  )
}

export default DashboardPage