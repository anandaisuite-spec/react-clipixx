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
            className="relative w-full max-w-md bg-dark-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* Hero-style gradient background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-48 h-48 bg-primary-600/20 rounded-full blur-[80px] opacity-50" />
              <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-blue-600/20 rounded-full blur-[60px] opacity-50" />
            </div>

            <div className="relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-cyan-500 to-primary-500" />

              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="text-sm text-dark-400">
                      {isSignUp ? 'Join Clippixx today' : 'Sign in to continue'}
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-dark-400 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {success ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-green-500"
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
                    <h3 className="text-xl font-bold text-white mb-2">
                      {isSignUp ? 'Account Created!' : 'Welcome Back!'}
                    </h3>
                    <p className="text-sm text-dark-400">
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
                    footerClassName="login-stepper-footer"
                  >
                    {/* Step 1: Choose Account Type */}
                    <Step>
                      <div className="py-4">
                        <h3 className="text-lg font-semibold text-white mb-4">
                          I want to...
                        </h3>
                        <div className="space-y-3">
                          <button
                            onClick={() => setAccountType('fan')}
                            className={`group relative w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                              accountType === 'fan'
                                ? 'border-primary-500 bg-primary-500/10'
                                : 'border-white/10 bg-dark-800/50 hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${
                                  accountType === 'fan'
                                    ? 'bg-primary-500/20'
                                    : 'bg-white/5 group-hover:bg-white/10'
                                }`}
                              >
                                <User
                                  className={`w-6 h-6 ${
                                    accountType === 'fan'
                                      ? 'text-primary-400'
                                      : 'text-white/60'
                                  }`}
                                />
                              </div>
                              <div className="text-left">
                                <h4 className="text-base font-semibold text-white mb-0.5">
                                  Book a Star
                                </h4>
                                <p className="text-xs text-dark-400">
                                  Request personalized videos
                                </p>
                              </div>
                            </div>
                          </button>

                          <button
                            onClick={() => setAccountType('creator')}
                            className={`group relative w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                              accountType === 'creator'
                                ? 'border-primary-500 bg-primary-500/10'
                                : 'border-white/10 bg-dark-800/50 hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${
                                  accountType === 'creator'
                                    ? 'bg-primary-500/20'
                                    : 'bg-white/5 group-hover:bg-white/10'
                                }`}
                              >
                                <Star
                                  className={`w-6 h-6 ${
                                    accountType === 'creator'
                                      ? 'text-primary-400'
                                      : 'text-white/60'
                                  }`}
                                />
                              </div>
                              <div className="text-left">
                                <h4 className="text-base font-semibold text-white mb-0.5">
                                  Earn as Creator
                                </h4>
                                <p className="text-xs text-dark-400">
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
                      <div className="py-4">
                        <h3 className="text-lg font-semibold text-white mb-4">
                          Enter your email
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-dark-300 mb-2">
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full pl-11 pr-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                              />
                            </div>
                          </div>

                          <div className="pt-2">
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
                      <div className="py-4">
                        <h3 className="text-lg font-semibold text-white mb-4">
                          {isSignUp ? 'Create password' : 'Enter password'}
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-dark-300 mb-2">
                              Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                              <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={
                                  isSignUp
                                    ? 'Create a strong password'
                                    : 'Enter your password'
                                }
                                className="w-full pl-11 pr-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                              />
                            </div>
                            {isSignUp && (
                              <p className="text-xs text-dark-500 mt-1.5">
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
