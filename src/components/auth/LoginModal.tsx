import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Star, Mail, Lock } from 'lucide-react';
import Stepper, { Step } from '../ui/Stepper';
import { supabase } from '../../lib/supabase';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [accountType, setAccountType] = useState<'fan' | 'creator' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleAuth = async () => {
    setError('');

    try {
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;
        setSuccess(true);
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    }
  };

  const handleClose = () => {
    setAccountType(null);
    setEmail('');
    setPassword('');
    setIsSignUp(false);
    setError('');
    setSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-dark-950/95 backdrop-blur-xl"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-dark-900 rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* Hero-style gradient background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-600/20 rounded-full blur-[100px] opacity-60" />
              <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-blue-600/20 rounded-full blur-[80px] opacity-60" />
            </div>

            <div className="relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-cyan-500 to-primary-500" />

              <div className="p-6 sm:p-8 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="text-sm sm:text-base text-dark-400">
                      {isSignUp ? 'Join Clippixx today' : 'Sign in to continue'}
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-dark-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {success ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                      <svg
                        className="w-10 h-10 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {isSignUp ? 'Account Created!' : 'Welcome Back!'}
                    </h3>
                    <p className="text-dark-400">
                      {isSignUp
                        ? 'Check your email to verify your account.'
                        : 'Redirecting you now...'}
                    </p>
                  </motion.div>
                ) : (
                  <Stepper
                    initialStep={1}
                    onFinalStepCompleted={handleAuth}
                    nextButtonText="Continue"
                    backButtonText="Back"
                    stepCircleContainerClassName="login-stepper"
                    contentClassName="login-stepper-content"
                  >
                    {/* Step 1: Choose Account Type */}
                    <Step>
                      <div className="py-6">
                        <h3 className="text-xl font-semibold text-white mb-6">
                          I want to...
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <button
                            onClick={() => setAccountType('fan')}
                            className={`group relative p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 ${
                              accountType === 'fan'
                                ? 'border-primary-500 bg-primary-500/10'
                                : 'border-white/10 bg-dark-800/50 hover:border-white/20'
                            }`}
                          >
                            <div className="flex flex-col items-center gap-3 sm:gap-4">
                              <div
                                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center transition-colors ${
                                  accountType === 'fan'
                                    ? 'bg-primary-500/20'
                                    : 'bg-white/5 group-hover:bg-white/10'
                                }`}
                              >
                                <User
                                  className={`w-7 h-7 sm:w-8 sm:h-8 ${
                                    accountType === 'fan'
                                      ? 'text-primary-400'
                                      : 'text-white/60'
                                  }`}
                                />
                              </div>
                              <div className="text-center">
                                <h4 className="text-base sm:text-lg font-semibold text-white mb-1">
                                  Book a Star
                                </h4>
                                <p className="text-xs sm:text-sm text-dark-400">
                                  Request personalized videos
                                </p>
                              </div>
                            </div>
                          </button>

                          <button
                            onClick={() => setAccountType('creator')}
                            className={`group relative p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 ${
                              accountType === 'creator'
                                ? 'border-primary-500 bg-primary-500/10'
                                : 'border-white/10 bg-dark-800/50 hover:border-white/20'
                            }`}
                          >
                            <div className="flex flex-col items-center gap-3 sm:gap-4">
                              <div
                                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center transition-colors ${
                                  accountType === 'creator'
                                    ? 'bg-primary-500/20'
                                    : 'bg-white/5 group-hover:bg-white/10'
                                }`}
                              >
                                <Star
                                  className={`w-7 h-7 sm:w-8 sm:h-8 ${
                                    accountType === 'creator'
                                      ? 'text-primary-400'
                                      : 'text-white/60'
                                  }`}
                                />
                              </div>
                              <div className="text-center">
                                <h4 className="text-base sm:text-lg font-semibold text-white mb-1">
                                  Earn as Creator
                                </h4>
                                <p className="text-xs sm:text-sm text-dark-400">
                                  Make money from fans
                                </p>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </Step>

                    {/* Step 2: Email */}
                    <Step>
                      <div className="py-4 sm:py-6">
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
                          Enter your email
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-dark-300 mb-2">
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full pl-12 pr-4 py-4 bg-dark-800 border border-white/10 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4">
                            <button
                              onClick={() => setIsSignUp(!isSignUp)}
                              className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
                            >
                              {isSignUp
                                ? 'Already have an account?'
                                : "Don't have an account?"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </Step>

                    {/* Step 3: Password */}
                    <Step>
                      <div className="py-4 sm:py-6">
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
                          {isSignUp ? 'Create password' : 'Enter password'}
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-dark-300 mb-2">
                              Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                              <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={
                                  isSignUp
                                    ? 'Create a strong password'
                                    : 'Enter your password'
                                }
                                className="w-full pl-12 pr-4 py-4 bg-dark-800 border border-white/10 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                              />
                            </div>
                            {isSignUp && (
                              <p className="text-xs text-dark-500 mt-2">
                                At least 6 characters
                              </p>
                            )}
                          </div>

                          {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                              <p className="text-sm text-red-400">{error}</p>
                            </div>
                          )}

                          {!isSignUp && (
                            <button className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
                              Forgot password?
                            </button>
                          )}
                        </div>
                      </div>
                    </Step>
                  </Stepper>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
