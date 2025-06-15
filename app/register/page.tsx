'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Leaf, LeafyGreen } from 'lucide-react'
import { 
  createUserWithEmailAndPassword, 
  updateProfile,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    // Basic validation
    if (!email || !password || !name) {
      setError('All fields are required.')
      setIsSubmitting(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      setIsSubmitting(false)
      return
    }

    try {
      // Create user with email/password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: name
      })

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (err) {
      setError(getFirebaseErrorMessage(err))
      setIsSubmitting(false)
    }
  }

  function getFirebaseErrorMessage(error: unknown): string {
    if (typeof error !== 'object' || error === null || !('code' in error)) {
      return 'An unknown error occurred'
    }
    
    const firebaseError = error as { code?: string; message?: string }
    
    switch (firebaseError.code) {
      case 'auth/email-already-in-use': return 'This email address is already in use.'
      case 'auth/invalid-email': return 'The email address is not valid.'
      case 'auth/weak-password': return 'Password should be at least 6 characters.'
      case 'auth/network-request-failed': return 'Network error. Please check your internet connection and try again.'
      case 'auth/user-disabled': return 'This account has been disabled.'
      default: return firebaseError.message || 'Registration failed. Please try again.'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100">
          <div className="bg-green-600 p-6 text-center">
            <motion.div
              animate={{ rotate: -10, y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="inline-block"
            >
              <LeafyGreen className="w-12 h-12 text-white mx-auto" strokeWidth={1.5} />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mt-4">
              Join EcoManage
            </h2>
            <p className="text-green-100">
              Create your sustainable account
            </p>
          </div>

          <form onSubmit={handleRegister} className="p-6 space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-green-800 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-green-800"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-green-800 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-green-800"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-green-800 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-green-800"
                required
                minLength={6}
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                isSubmitting ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block mr-2"
                  >
                    <Leaf className="w-4 h-4" />
                  </motion.span>
                  Creating Account...
                </span>
              ) : (
                'Register Now'
              )}
            </motion.button>
          </form>

          <div className="px-6 pb-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => router.push('/login')}
                className="text-green-600 hover:text-green-800 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}