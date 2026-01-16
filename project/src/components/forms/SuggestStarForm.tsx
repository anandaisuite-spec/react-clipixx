import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Sparkles, User, Link, Mail } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Button from '../ui/Button';
import Stepper, { Step } from '../ui/Stepper';

const categories = ['Actor', 'Athlete', 'Creator', 'Musician', 'Comedian', 'Reality TV', 'Other'];

type SuggestStarFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SuggestStarForm({ isOpen, onClose }: SuggestStarFormProps) {
  const [formData, setFormData] = useState({
    celebrity_name: '',
    category: '',
    social_links: '',
    reason: '',
    submitter_email: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    const { error: submitError } = await supabase
      .from('star_suggestions')
      .insert([formData]);

    if (submitError) {
      setError('Failed to submit. Please try again.');
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  const handleClose = () => {
    setFormData({
      celebrity_name: '',
      category: '',
      social_links: '',
      reason: '',
      submitter_email: '',
    });
    setSuccess(false);
    setError('');
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
            className="absolute inset-0 bg-gray-100/90 dark:bg-dark-950/90 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white dark:bg-dark-900 rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-cyan-500 to-primary-500" />

            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Suggest a Star</h2>
                    <p className="text-sm text-gray-500 dark:text-dark-400">Help us grow our community</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-dark-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h3>
                  <p className="text-gray-500 dark:text-dark-400 mb-6">
                    Your suggestion has been submitted. We'll review it and reach out if we add them!
                  </p>
                  <Button onClick={handleClose} variant="outline">
                    Close
                  </Button>
                </motion.div>
              ) : (
                <Stepper
                  initialStep={1}
                  onFinalStepCompleted={handleSubmit}
                  backButtonText="Back"
                  nextButtonText="Next"
                >
                  {/* Step 1: Celebrity Name */}
                  <Step>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <User className="w-5 h-5 text-primary-400" />
                        <span className="text-sm font-medium text-gray-500 dark:text-dark-400">Step 1 of 3</span>
                      </div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                        Celebrity Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.celebrity_name}
                        onChange={(e) => setFormData({ ...formData, celebrity_name: e.target.value })}
                        placeholder="Who would you like to see?"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                      />
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2 mt-4">
                        Category *
                      </label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-primary-500 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </Step>

                  {/* Step 2: Additional Details */}
                  <Step>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Link className="w-5 h-5 text-primary-400" />
                        <span className="text-sm font-medium text-gray-500 dark:text-dark-400">Step 2 of 3</span>
                      </div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                        Social Media Links
                      </label>
                      <input
                        type="text"
                        value={formData.social_links}
                        onChange={(e) => setFormData({ ...formData, social_links: e.target.value })}
                        placeholder="Instagram, Twitter, or website URL"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                      />
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2 mt-4">
                        Why should they join?
                      </label>
                      <textarea
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        placeholder="Tell us why fans would love personalized videos from them"
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                      />
                    </div>
                  </Step>

                  {/* Step 3: Your Email */}
                  <Step>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Mail className="w-5 h-5 text-primary-400" />
                        <span className="text-sm font-medium text-gray-500 dark:text-dark-400">Step 3 of 3</span>
                      </div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.submitter_email}
                        onChange={(e) => setFormData({ ...formData, submitter_email: e.target.value })}
                        placeholder="We'll notify you if they join"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                      />
                      {error && (
                        <p className="text-sm text-red-400">{error}</p>
                      )}
                    </div>
                  </Step>
                </Stepper>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
