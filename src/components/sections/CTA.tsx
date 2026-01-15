import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  'Access to 10,000+ celebrities',
  '7-day average turnaround',
  'Money-back guarantee',
  '24/7 customer support',
];

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [email, setEmail] = useState('');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <section
      ref={sectionRef}
      id="talent"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950/50 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary-600/10 rounded-full blur-[200px]" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 text-xs font-medium tracking-wider uppercase text-primary-400 bg-primary-500/10 rounded-full mb-6"
        >
          Get Started Today
        </motion.span>

        <h2
          ref={headlineRef}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Ready to create
          <br />
          <span className="font-serif italic font-normal">unforgettable</span>{' '}
          moments?
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-dark-300 max-w-2xl mx-auto mb-10"
        >
          Join millions of fans who have surprised their loved ones with
          personalized celebrity video messages.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-12"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/10 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 transition-colors"
            required
          />
          <Button type="submit" className="flex items-center justify-center gap-2">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-4"
        >
          {benefits.map((benefit) => (
            <div key={benefit} className="flex items-center gap-2 text-sm text-dark-300">
              <Check className="w-4 h-4 text-primary-400" />
              <span>{benefit}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
