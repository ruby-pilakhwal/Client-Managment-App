import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Login({handlelogin}) {
  // console.log(handlelogin);
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    handlelogin(email,password);
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("done");
    setLoading(false);
    setemail('');
    setpassword('');
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg p-12 rounded-2xl shadow-xl w-[450px] border border-white/10 hover:border-white/20 transition-all duration-300"
      >
        <motion.h2 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-4xl font-bold text-white mb-8 text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
        >
          Welcome Back
        </motion.h2>

        <form onSubmit={(e)=>submitHandler(e)} className="space-y-6">
          {/* Email Input */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            <FaEnvelope className="absolute left-4 top-4 text-gray-400 text-xl group-hover:text-blue-400 transition-colors duration-300" />
            <input
              value={email}
              type="email"
              placeholder="Email"
              required
              onChange={(e)=>setemail(e.target.value)}
              className="w-full pl-12 py-4 bg-white/5 border border-gray-500 rounded-lg text-white outline-none focus:border-blue-500 focus:bg-white/10 text-lg transition-all duration-300"
            />
          </motion.div>

          {/* Password Input */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative group"
          >
            <FaLock className="absolute left-4 top-4 text-gray-400 text-xl group-hover:text-blue-400 transition-colors duration-300" />
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full pl-12 pr-12 py-4 bg-white/5 border border-gray-500 rounded-lg text-white outline-none focus:border-blue-500 focus:bg-white/10 text-lg transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-gray-400 text-xl hover:text-blue-400 transition-all duration-300 cursor-pointer"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </motion.div>

          {/* Remember Me & Forgot Password */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-between text-sm text-gray-300"
          >
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
              Forgot Password?
            </a>
          </motion.div>

          {/* Login Button */}
          <motion.button 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            type="submit" 
            disabled={loading}
            className="relative w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : "Log In"}
          </motion.button>

          {/* Social Login */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 space-y-4"
          >
            <div className="relative">
              <div>
                <div className="w-full border-t border-gray-600"></div>
              </div>
              
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-400 bg-[#0000] backdrop-blur-lg">Or continue with</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button 
                type="button"
                className="flex-1 flex items-center justify-center space-x-2 py-3 border border-gray-600 rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                <FaGoogle className="text-red-500" />
                <span className="text-white">Google</span>
              </button>
              <button 
                type="button"
                className="flex-1 flex items-center justify-center space-x-2 py-3 border border-gray-600 rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                <FaGithub className="text-white" />
                <span className="text-white">GitHub</span>
              </button>
            </div>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
