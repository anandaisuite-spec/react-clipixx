import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2, MessageSquare } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Button from '../ui/Button';

const feedbackTypes = ['Bug Report', 'Feature Request', 'General Feedback', 'Improvement', 'Other'];

type FeedbackFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function FeedbackForm({ isOpen, onClose }: FeedbackFormProps) {
  const [formData, setFormData] = useState({
    type: '',
    subject: '',
    message: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: submitError } = await supabase
      .from('feedback')
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
      type: '',
      subject: '',
      message: '',
      email: '',
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
            className="absolute inset-0 bg-dark-950/90 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-dark-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-primary-500 to-cyan-500" />

            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Share Feedback</h2>
                    <p className="text-sm text-dark-400">Help us improve</p>
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
                  <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
                  <p className="text-dark-400 mb-6">
                    Your feedback has been submitted. We appreciate you helping us improve!
                  </p>
                  <Button onClick={handleClose} variant="outline">
                    Close
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">
                      Feedback Type *
                    </label>
                    <select
                      required
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select feedback type</option>
                      {feedbackTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Brief summary of your feedback"
                      className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your thoughts, ideas, or report issues..."
                      rows={5}
                      className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Optional - for follow-up responses"
                      className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-cyan-500 transition-colors"
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
                          Submit Feedback
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
