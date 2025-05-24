'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Leaf, Lock, Mail } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate auth check with delay
    setTimeout(() => {
      console.log('Logged in with', { email, password })
      router.push('/dashboard')
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100">
          <div className="bg-green-600 p-6 text-center relative">
            <motion.div
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4,
                ease: "easeInOut"
              }}
              className="absolute top-4 left-4"
            >
              <Leaf className="w-8 h-8 text-green-200" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
            <p className="text-green-100 mt-1">Sign in to your EcoManage account</p>
          </div>

          <form onSubmit={handleLogin} className="p-6 space-y-5">
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-green-800">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-green-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-9 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-green-800"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-green-800">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-green-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-9 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-green-800"
                  required
                />
              </div>
              {/* <div className="flex justify-end mt-1">
                <button 
                  type="button" 
                  onClick={() => router.push('/forgot-password')}
                  className="text-xs text-green-600 hover:text-green-800"
                >
                  Forgot password?
                </button>
              </div> */}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                isLoading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block mr-2"
                  >
                    <Leaf className="w-4 h-4" />
                  </motion.span>
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </motion.button>

            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-green-200"></div>
              <span className="flex-shrink mx-4 text-sm text-green-600">or</span>
              <div className="flex-grow border-t border-green-200"></div>
            </div>

            <button
              type="button"
              onClick={() => router.push('/register')}
              className="w-full py-2.5 px-4 rounded-lg font-medium text-green-700 border border-green-300 hover:bg-green-50 transition-colors"
            >
              Create new account
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}