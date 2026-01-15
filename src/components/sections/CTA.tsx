import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

type CTAProps = {
  onGetStarted?: () => void;
};

export default function CTA({ onGetStarted }: CTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

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

  return (
    <section
      ref={sectionRef}
      id="talent"
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-primary-950/5 to-dark-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-600/5 rounded-full blur-[150px]" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <h2
          ref={headlineRef}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.1]"
        >
          Your audience is{' '}
          <span className="font-serif italic font-normal text-white/80">waiting.</span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-white/50 max-w-2xl mx-auto mb-12"
        >
          Join the platform built for creators who value their time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Button size="lg" onClick={onGetStarted} className="text-base px-12 py-5">
            Start Earning
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
