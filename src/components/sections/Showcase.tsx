import { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Star, TrendingUp, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

const celebrities = [
  {
    name: 'Alex Sterling',
    category: 'Actor',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.9,
    reviews: 2840,
    price: 199,
  },
  {
    name: 'Jordan Blake',
    category: 'Athlete',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 5.0,
    reviews: 1256,
    price: 299,
  },
  {
    name: 'Mia Chen',
    category: 'Creator',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.8,
    reviews: 4521,
    price: 99,
  },
  {
    name: 'David Park',
    category: 'Musician',
    image: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.9,
    reviews: 892,
    price: 249,
  },
];

const stats = [
  { value: '10K+', label: 'Stars Available' },
  { value: '2M+', label: 'Videos Delivered' },
  { value: '4.9', label: 'Average Rating' },
  { value: '98%', label: 'Satisfaction Rate' },
];

type ShowcaseProps = {
  onViewAll?: () => void;
};

export default function Showcase({ onViewAll }: ShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stat-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.stats-container',
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
      id="business"
      className="relative py-24 md:py-32 bg-dark-950"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/5 via-transparent to-primary-950/5" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wider uppercase text-primary-400 bg-primary-500/10 rounded-full mb-6">
            Featured Stars
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Meet our{' '}
            <span className="font-serif italic font-normal">trending</span>{' '}
            celebrities
          </h2>
          <p className="text-lg text-dark-400 max-w-2xl mx-auto mb-8">
            Discover the most requested stars on our platform and book your
            personalized video today.
          </p>
          {onViewAll && (
            <Button onClick={onViewAll} variant="outline">
              <span className="flex items-center gap-2">
                View All Stars
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          )}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {celebrities.map((celebrity, index) => (
            <motion.div
              key={celebrity.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -12 }}
              className="group relative"
            >
              <div className="relative rounded-2xl overflow-hidden bg-dark-900">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={celebrity.image}
                    alt={celebrity.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />
                </div>

                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-dark-900/80 backdrop-blur-sm">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-medium text-white">
                      {celebrity.rating}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Play className="w-6 h-6 text-white fill-white ml-1" />
                </motion.button>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-xs font-medium text-primary-400 uppercase tracking-wider">
                    {celebrity.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-2">
                    {celebrity.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-dark-400">
                      {celebrity.reviews.toLocaleString()} reviews
                    </span>
                    <span className="text-lg font-bold text-white">
                      ${celebrity.price}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="stats-container grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-item text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary-400" />
                <span className="text-3xl md:text-4xl font-bold text-white">
                  {stat.value}
                </span>
              </div>
              <span className="text-sm text-dark-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
