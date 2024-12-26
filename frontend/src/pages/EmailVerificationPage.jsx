import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const EmailVerificationPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const { error, isLoading, verifyEmail } = useAuthStore();

    const isNumeric = (number) => {
        // if is a number returns true        
        if (+number === +number) {
            return true;
        }
        return false;
      }

    const handlePaste = (e) => { 
        e.preventDefault();

        // Access clipboard data from the paste event
        const pastedData = e.clipboardData.getData('text');
        // console.log('Pasted content:', pastedData);
        
        // Create a copy of the current state
        const updatedCode = [...code];
        const length = pastedData.length > 6 ? 6 : pastedData.length;
        
        // Check if there are any non-numeric characters in the pasted data
        for (let i = 0; i < length; i++) {
            if (!isNumeric(pastedData[i])) {
                return;
            }
        }
        // Insert the pasted characters starting at the current index
        for (let i = 0; i < length; i++) {
            updatedCode[i] = pastedData[i] || "";
        }
    
        setCode(updatedCode); // Update the state
        const lastIndex = updatedCode.findLastIndex((digit) => digit !== "");
        const focusIndex = lastIndex < 5 ? lastIndex + 1 : 5;
        inputRefs.current[focusIndex]?.focus(); 
    }

    const handleChange = (index, value) => {
        // allow only numbers for input
        if (!isNumeric(value.slice(0, 1))) {
            return;
        }
        const newCode = [...code];
        if (index <= 5) {   
            newCode[index] = value.slice(0, 1);
            setCode(newCode);
        }
        if (value && index < 5) {
            inputRefs.current[ index + 1]?.focus();
        }
    };
    
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
        if ((e.key === "ArrowLeft" || e.key === "ArrowDown") && index > 0) {
            // sets the caret to the right of a character when going backwards
            e.preventDefault();
            inputRefs.current[index - 1].focus();
        }
        if ((e.key === "ArrowRight" || e.key === "ArrowUp") && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verfCode = code.join("");
        console.log(`Verification code submitted: ${verfCode}`);
        try {
            await verifyEmail(verfCode);
            navigate("/");
            toast.success("Email verified successfully!");
        } catch (error) {
            console.log(error);
        }
    };
    // automatically submits form when all numbers are filled
    useEffect(() => {
        if (code.every(digit => digit !== "")) {
            handleSubmit(new Event('submit'));
        }
    }, [code]);

    return (
		<div className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
            <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md'
            >
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text'>
                    Verify Your Email
                </h2>
                <p className='text-center text-gray-300 mb-6'>Enter the 6-digit code sent to your email address.</p>
            
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='flex justify-between'>
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type='text'
                                maxLength='6'
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onPaste={(e) => handlePaste(e)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none'
                            />
                        ))}                    
                    </div>
                    {error && <p className='text-red-500 font-semibold text-center'>{error}</p>}
                    <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type='submit'
                            disabled={isLoading || code.some((digit) => !digit)}
                            className='w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-yellow-600 hover:to-yellow-700 
                            focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 disabled:opacity-50'
                        >
                            {isLoading ? "Verifying..." : "Verify Email"}
                    </motion.button>            
                </form>
            </motion.div>
    </div>
  )
}

export default EmailVerificationPage