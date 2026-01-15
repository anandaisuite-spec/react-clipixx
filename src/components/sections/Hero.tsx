import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import Button from '../ui/Button';

type HeroProps = {
  onGetStarted?: () => void;
};

export default function Hero({ onGetStarted }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current], {
        opacity: 0,
        y: 60,
      });

      tl.to(orbsRef.current?.children || [], {
        opacity: 0.6,
        scale: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power2.out',
      })
        .to(
          headlineRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          '-=1'
        )
        .to(
          subheadlineRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=0.6'
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=0.4'
        );

      gsap.to(orbsRef.current?.children || [], {
        y: 'random(-30, 30)',
        x: 'random(-20, 20)',
        duration: 'random(4, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.5,
          from: 'random',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0533]/30 via-transparent to-[#0c1929]/30" />

      <div
        ref={orbsRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-[100px] opacity-0 scale-50" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-[80px] opacity-0 scale-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-900/30 rounded-full blur-[120px] opacity-0 scale-50" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 lg:pt-40">
        <div className="max-w-4xl">
          <h1
            ref={headlineRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[90px] font-bold leading-[1.05] tracking-tight text-white"
          >
            Get paid to connect
            <br />
            with{' '}
            <span className="font-serif italic font-normal text-white/90">
              your fans.
            </span>
          </h1>

          <p
            ref={subheadlineRef}
            className="mt-8 text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed font-light"
          >
            Turn your influence into income. Book personalized video shoutouts in minutes.
          </p>

          <div ref={ctaRef} className="mt-12">
            <Button size="lg" onClick={onGetStarted} className="text-base px-12 py-5">
              Start Earning
            </Button>
          </div>
        </div>
      </div>


    </section>
  );
}
