import { motion } from 'framer-motion';
import { ArrowRight, Clock, Sparkles, TrendingUp } from 'lucide-react';

export default function Transformation() {
  return (
    <section className="relative py-32 md:py-40">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            From scattered DMs to{' '}
            <span className="font-serif italic font-normal text-white/80">streamlined income</span>
          </h2>
          <p className="text-xl text-white/50 max-w-3xl mx-auto">
            Stop leaving money on the table. Your fans want to connect.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-3xl blur-xl" />
            <div className="relative bg-dark-900/50 border border-white/5 rounded-3xl p-8 h-full">
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Before</h3>
              <p className="text-white/50 leading-relaxed mb-6">
                Managing requests through DMs, losing track of opportunities, inconsistent pricing, fans going elsewhere.
              </p>
              <ul className="space-y-3 text-white/40">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">×</span>
                  <span>Chaotic inbox</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">×</span>
                  <span>Missed revenue</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">×</span>
                  <span>No payment system</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-cyan-500 flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-cyan-500/10 rounded-3xl blur-xl" />
            <div className="relative bg-gradient-to-br from-dark-900/90 to-dark-800/50 border border-primary-500/20 rounded-3xl p-8 h-full">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-cyan-500/20 flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-primary-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">After</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                One link. Automated bookings. Secure payments. Complete control over your time and pricing.
              </p>
              <ul className="space-y-3 text-white/60">
                <li className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-primary-400 mt-1 flex-shrink-0" />
                  <span>Automated workflow</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-primary-400 mt-1 flex-shrink-0" />
                  <span>Instant payments</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-primary-400 mt-1 flex-shrink-0" />
                  <span>Your schedule, your rates</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
