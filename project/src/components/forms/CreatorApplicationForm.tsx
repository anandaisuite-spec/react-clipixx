import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2, UserPlus } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Button from '../ui/Button';

const categories = ['Actor', 'Athlete', 'Creator', 'Musician', 'Comedian', 'Reality TV', 'Influencer', 'Other'];
const followerRanges = [
  '10K - 50K',
  '50K - 100K',
  '100K - 500K',
  '500K - 1M',
  '1M - 5M',
  '5M+',
];

type CreatorApplicationFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreatorApplicationForm({ isOpen, onClose }: CreatorApplicationFormProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    category: '',
    social_links: '',
    followers_count: '',
    bio: '',
    why_join: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: submitError } = await supabase
      .from('creator_applications')
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
      full_name: '',
      email: '',
      category: '',
      social_links: '',
      followers_count: '',
      bio: '',
      why_join: '',
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-dark-950/90 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-dark-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden my-8"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-primary-500 to-cyan-500" />

            <div className="p-6 md:p-8 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Become a Creator</h2>
                    <p className="text-sm text-dark-400">Join our talent network</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-dark-400 hover:text-white hover:bg-white/10 transition-colors"
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
                  <h3 className="text-xl font-bold text-white mb-2">Application Submitted!</h3>
                  <p className="text-dark-400 mb-6">
                    Thanks for applying! Our team will review your application and get back to you within 5-7 business days.
                  </p>
                  <Button onClick={handleClose} variant="outline">
                    Close
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">
                        Category *
                      </label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary-500 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">
                        Followers
                      </label>
                      <select
                        value={formData.followers_count}
                        onChange={(e) => setFormData({ ...formData, followers_count: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary-500 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Select range</option>
                        {followerRanges.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">
                      Social Media Links *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.social_links}
                      onChange={(e) => setFormData({ ...formData, social_links: e.target.value })}
                      placeholder="Instagram, TikTok, YouTube, etc."
                      className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">
                      Tell us about yourself *
                    </label>
                    <textarea
                      required
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Share your background, achievements, and what makes you unique"
                      rows={3}
                      className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">
                      Why do you want to join? *
                    </label>
                    <textarea
                      required
                      value={formData.why_join}
                      onChange={(e) => setFormData({ ...formData, why_join: e.target.value })}
                      placeholder="Tell us why you'd like to create personalized videos for fans"
                      rows={3}
                      className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-400">{error}</p>
                  )}

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit Application
                        </>
                      )}
                    </Button>
                  </div>

                  <p className="text-xs text-dark-500 text-center">
                    By submitting, you agree to our terms and conditions.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
