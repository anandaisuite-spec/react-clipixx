import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, MessageSquare } from 'lucide-react';
import Button from '../ui/Button';

type JoinSectionProps = {
  onSuggestStar?: () => void;
  onFeedback?: () => void;
};

export default function JoinSection({ onSuggestStar, onFeedback }: JoinSectionProps) {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-950/20 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wider uppercase text-primary-400 bg-primary-500/10 rounded-full mb-6">
            Join Our Community
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Help us{' '}
            <span className="font-serif italic font-normal">grow</span>
          </h2>
          <p className="text-lg text-dark-400 max-w-2xl mx-auto">
            Want to see your favorite celebrity on our platform or share your thoughts? Let us know and help us grow our community.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-8 md:p-10 bg-dark-800/50 rounded-3xl transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-primary-500/10 flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-primary-400" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                Suggest a Star
              </h3>

              <p className="text-dark-400 mb-6 leading-relaxed">
                Is there a celebrity you'd love to see on our platform? Let us know! We're always looking to bring new talent to connect with their fans through personalized videos.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-dark-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                  Get notified when they join
                </li>
                <li className="flex items-center gap-3 text-sm text-dark-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                  Help grow the community
                </li>
                <li className="flex items-center gap-3 text-sm text-dark-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                  Takes less than 2 minutes
                </li>
              </ul>

              <Button variant="outline" onClick={onSuggestStar}>
                <span className="flex items-center gap-2">
                  Suggest a Star
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-8 md:p-10 bg-dark-800/50 rounded-3xl transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6">
                <MessageSquare className="w-7 h-7 text-cyan-400" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                Share Feedback
              </h3>

              <p className="text-dark-400 mb-6 leading-relaxed">
                Have ideas to improve our platform? Found a bug or have a feature request? We'd love to hear from you and make our platform better together.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-dark-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Shape the platform's future
                </li>
                <li className="flex items-center gap-3 text-sm text-dark-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Quick and easy to submit
                </li>
                <li className="flex items-center gap-3 text-sm text-dark-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Your voice matters
                </li>
              </ul>

              <Button variant="outline" onClick={onFeedback}>
                <span className="flex items-center gap-2">
                  Send Feedback
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
