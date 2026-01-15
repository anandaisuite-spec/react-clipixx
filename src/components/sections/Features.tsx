import { motion } from 'framer-motion';
import { DollarSign, Calendar, Zap, Shield } from 'lucide-react';

const features = [
  {
    icon: DollarSign,
    title: "Set Your Own Rates",
    description: "You decide what your time is worth. No commissions. No hidden fees.",
    gradient: "from-emerald-500/10 to-transparent"
  },
  {
    icon: Calendar,
    title: "Control Your Schedule",
    description: "Accept bookings on your terms. Pause anytime. Work when you want.",
    gradient: "from-primary-500/10 to-transparent"
  },
  {
    icon: Zap,
    title: "Instant Payments",
    description: "Get paid immediately. Secure, fast, and hassle-free transactions.",
    gradient: "from-cyan-500/10 to-transparent"
  },
  {
    icon: Shield,
    title: "Complete Protection",
    description: "Your privacy matters. We handle all fan communications securely.",
    gradient: "from-violet-500/10 to-transparent"
  }
];

export default function Features() {
  return (
    <section id="categories" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Built for{' '}
            <span className="font-serif italic font-normal text-white/80">creators</span>
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            Everything you need to monetize your influence without the complexity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative bg-dark-900/50 border border-white/5 group-hover:border-white/10 rounded-3xl p-10 h-full transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <feature.icon className="w-7 h-7 text-white/70" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/50 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
