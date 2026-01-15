import { motion } from 'framer-motion';
import MagicBento from './MagicBento';
import ScrollFloat from '../ui/ScrollFloat';

export default function Features() {
  return (
    <section id="categories" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-950/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wider uppercase text-primary-400 bg-primary-500/10 rounded-full mb-6">
            Why Choose Us
          </span>
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            containerClassName="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            The ultimate celebrity experience
          </ScrollFloat>
          <p className="text-lg text-dark-400 max-w-2xl mx-auto">
            Discover what makes Clippixx the premier platform for personalized
            celebrity video messages.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <MagicBento
            enableStars={false}
            enableTilt
            enableSpotlight={true}
            enableBorderGlow={true}
            clickEffect={true}
            enableMagnetism={false}
          />
        </motion.div>
      </div>
    </section>
  );
}
