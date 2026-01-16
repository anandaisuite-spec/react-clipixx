import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, MessageSquare } from 'lucide-react';
import Button from '../ui/Button';

type JoinSectionProps = {
  onSuggestStar?: () => void;
  onFeedback?: () => void;
};

export default function JoinSection({ onSuggestStar, onFeedback }: JoinSectionProps) {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">


      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block px-5 py-2 text-xs font-semibold tracking-widest uppercase text-primary-300 bg-gradient-to-r from-primary-500/10 to-cyan-500/10 rounded-full mb-8 border border-primary-500/20"
          >
            Join Our Community
          </motion.span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8">
            Help us{' '}
            <span className="font-serif italic font-normal bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent">grow</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-dark-300 max-w-3xl mx-auto leading-relaxed">
            Want to see your favorite celebrity on our platform or share your thoughts?<br className="hidden sm:block" />
            Let us know and help us grow our community.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-[28px] opacity-20 group-hover:opacity-40 blur-sm transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-transparent rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-10 md:p-12 bg-gradient-to-br from-dark-800/90 to-dark-900/90 backdrop-blur-xl rounded-[26px] border border-dark-700/50 group-hover:border-primary-500/30 transition-all duration-500 h-full">
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-transparent rounded-2xl blur-md" />
                <Sparkles className="relative w-8 h-8 text-primary-300" />
              </div>

              <h3 className="text-3xl font-bold text-white mb-5 group-hover:text-primary-200 transition-colors duration-300">
                Suggest a Star
              </h3>

              <p className="text-dark-300 mb-8 leading-relaxed text-lg">
                Is there a celebrity you'd love to see on our platform? Let us know! We're always looking to bring new talent to connect with their fans through personalized videos.
              </p>

              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-4 text-base text-dark-200 group/item hover:text-primary-300 transition-colors duration-300">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-400 to-primary-500 group-hover/item:scale-150 transition-transform duration-300" />
                  Get notified when they join
                </li>
                <li className="flex items-center gap-4 text-base text-dark-200 group/item hover:text-primary-300 transition-colors duration-300">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-400 to-primary-500 group-hover/item:scale-150 transition-transform duration-300" />
                  Help grow the community
                </li>
                <li className="flex items-center gap-4 text-base text-dark-200 group/item hover:text-primary-300 transition-colors duration-300">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-400 to-primary-500 group-hover/item:scale-150 transition-transform duration-300" />
                  Takes less than 2 minutes
                </li>
              </ul>

              <Button
                variant="primary"
                onClick={onSuggestStar}
                className="shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  Suggest a Star
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-[28px] opacity-20 group-hover:opacity-40 blur-sm transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-10 md:p-12 bg-gradient-to-br from-dark-800/90 to-dark-900/90 backdrop-blur-xl rounded-[26px] border border-dark-700/50 group-hover:border-cyan-500/30 transition-all duration-500 h-full">
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-transparent rounded-2xl blur-md" />
                <MessageSquare className="relative w-8 h-8 text-cyan-300" />
              </div>

              <h3 className="text-3xl font-bold text-white mb-5 group-hover:text-cyan-200 transition-colors duration-300">
                Share Feedback
              </h3>

              <p className="text-dark-300 mb-8 leading-relaxed text-lg">
                Have ideas to improve our platform? Found a bug or have a feature request? We'd love to hear from you and make our platform better together.
              </p>

              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-4 text-base text-dark-200 group/item hover:text-cyan-300 transition-colors duration-300">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 group-hover/item:scale-150 transition-transform duration-300" />
                  Shape the platform's future
                </li>
                <li className="flex items-center gap-4 text-base text-dark-200 group/item hover:text-cyan-300 transition-colors duration-300">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 group-hover/item:scale-150 transition-transform duration-300" />
                  Quick and easy to submit
                </li>
                <li className="flex items-center gap-4 text-base text-dark-200 group/item hover:text-cyan-300 transition-colors duration-300">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 group-hover/item:scale-150 transition-transform duration-300" />
                  Your voice matters
                </li>
              </ul>

              <Button
                variant="primary"
                onClick={onFeedback}
                className="shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  Send Feedback
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
