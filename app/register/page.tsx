'use client'

declare global {
  interface Window {
    recaptchaVerifier?: any;
  }
}

import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Leaf, LeafyGreen } from 'lucide-react'
import { 
  createUserWithEmailAndPassword, 
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  Auth,
  ConfirmationResult
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [showVerification, setShowVerification] = useState(false)
  
  // Use useRef to store confirmationResult instead of useState for direct access
  const confirmationResultRef = useRef<ConfirmationResult | null>(null);

  // Initialize reCAPTCHA
  useEffect(() => {
    // Check if reCAPTCHA is already initialized to prevent re-initialization on hot reload
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container', // This needs to be an actual DOM element ID
        {
          size: 'invisible',
          callback: (response: any) => {
            // reCAPTCHA solved, you can log the response if needed
            console.log('reCAPTCHA solved');
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            setError('reCAPTCHA expired. Please try again.');
            setIsSubmitting(false); // Allow re-submission
          }
        }
      );
    }

    return () => {
      // Clean up reCAPTCHA when component unmounts
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        // Remove from window to prevent issues on re-mount in development
        delete window.recaptchaVerifier; 
      }
    }
  }, []) // Empty dependency array means this runs once on mount

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    // Basic client-side validation
    if (!email || !password || !name || !phone) {
      setError('All fields are required.');
      setIsSubmitting(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsSubmitting(false);
      return;
    }

    // Ensure recaptchaVerifier is ready
    if (!window.recaptchaVerifier) {
      setError('reCAPTCHA is not ready. Please try again.');
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Create user with email/password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // 2. Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: name
      });

      // 3. Format phone number (Firebase expects E.164 format: +[country code][number])
      // Example: +15551234567
      const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
      if (!/^\+\d{10,15}$/.test(formattedPhone)) { // Basic regex for E.164
        setError('Please enter a valid phone number with country code (e.g., +1234567890).');
        setIsSubmitting(false);
        return;
      }

      // 4. Send verification code
      const confirmationResult = await signInWithPhoneNumber(
        auth, 
        formattedPhone, 
        window.recaptchaVerifier
      );
      
      confirmationResultRef.current = confirmationResult; // Store for verification
      setShowVerification(true); // Show verification input
      setIsSubmitting(false); // No longer submitting the registration form, now waiting for verification
      
    } catch (err) {
      setError(getFirebaseErrorMessage(err));
      setIsSubmitting(false);
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Indicate that verification is in progress
    setError('');

    if (!confirmationResultRef.current) {
      setError('Something went wrong. Please try registering again.');
      setIsSubmitting(false);
      return;
    }

    try {
      await confirmationResultRef.current.confirm(verificationCode);
      router.push('/dashboard'); // Redirect after successful verification
    } catch (err) {
      setError('Invalid verification code. Please try again.');
      setIsSubmitting(false); // Allow user to try again
    }
  }

  function getFirebaseErrorMessage(error: unknown): string {
    if (typeof error !== 'object' || error === null) return 'An unknown error occurred';
    
    const firebaseError = error as { code?: string; message?: string };
    
    switch (firebaseError.code) {
      case 'auth/email-already-in-use': return 'This email address is already in use.';
      case 'auth/invalid-email': return 'The email address is not valid.';
      case 'auth/weak-password': return 'Password should be at least 6 characters.';
      case 'auth/invalid-phone-number': return 'The phone number format is invalid. Please include the country code (e.g., +1234567890).';
      case 'auth/missing-phone-number': return 'Please provide a phone number.';
      case 'auth/too-many-requests': return 'Too many attempts. Please try again later.';
      case 'auth/network-request-failed': return 'Network error. Please check your internet connection and try again.';
      case 'auth/code-expired': return 'The verification code has expired. Please resend the code.';
      case 'auth/invalid-verification-code': return 'The verification code is invalid. Please check and try again.';
      default: return firebaseError.message || 'Registration failed. Please try again.';
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
              {showVerification ? 'Verify Phone' : 'Join EcoManage'}
            </h2>
            <p className="text-green-100">
              {showVerification ? 'Enter the code sent to your phone' : 'Create your sustainable account'}
            </p>
          </div>

          {showVerification ? (
            <form onSubmit={handleVerifyCode} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="code" className="block text-sm font-medium text-green-800 mb-1">
                  Verification Code
                </label>
                <input
                  type="text"
                  id="code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="123456"
                  className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-green-800"
                  required
                />
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
                {isSubmitting ? 'Verifying...' : 'Verify Code'}
              </motion.button>
              {/* reCAPTCHA container is only needed on the registration form */}
            </form>
          ) : (
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

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-green-800 mb-1">
                  Phone Number (with country code)
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1234567890"
                  className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-green-800"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">We'll send a verification code via SMS (e.g., +1 for USA, +62 for Indonesia)</p>
              </div>

              {/* This div is crucial for reCAPTCHA to render. It must be present when the component mounts. */}
              <div id="recaptcha-container"></div> 

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
          )}

          {!showVerification && (
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
          )}
        </div>
      </motion.div>
    </div>
  )
}