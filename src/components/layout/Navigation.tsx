import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';

const navLinks = [
  { name: 'Categories', href: '#categories' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'For Business', href: '#business' },
  { name: 'Join as Talent', href: '#talent', isCreatorLink: true },
];

type NavigationProps = {
  onBrowseClick?: () => void;
  onCreatorClick?: () => void;
  onLoginClick?: () => void;
  onSignupClick?: () => void;
};

export default function Navigation({ onBrowseClick, onCreatorClick, onLoginClick, onSignupClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'py-3'
        : 'py-4'
        }`}>
        <div className="mx-4 lg:mx-6">
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`transition-all duration-500 ${isScrolled
              ? 'bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full px-6 py-3 shadow-xl shadow-black/30'
              : 'px-6 py-3'
              }`}
          >
            <div className="flex items-center justify-between">
              <motion.a
                href="#"
                className="text-2xl font-serif font-bold text-white italic"
                whileHover={{ scale: 1.02 }}
              >
                Clippixx.
              </motion.a>

              <div className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      if ('isCreatorLink' in link && link.isCreatorLink) {
                        e.preventDefault();
                        onCreatorClick?.();
                      }
                    }}
                    className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <div className="hidden lg:flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={onLoginClick}>
                  Log In
                </Button>
                <Button size="sm" onClick={onSignupClick}>
                  Sign Up
                </Button>
              </div>

              <button
                className="lg:hidden text-white"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </motion.nav>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-dark-950/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-dark-900 p-8"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-2xl font-serif font-bold text-white italic">
                  Clippixx.
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-lg text-white/80 hover:text-white transition-colors"
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      if ('isCreatorLink' in link && link.isCreatorLink) {
                        e.preventDefault();
                        onCreatorClick?.();
                      }
                    }}
                  >
                    {link.name}
                  </motion.a>
                ))}
                <div className="pt-6 border-t border-white/10 space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onLoginClick?.();
                    }}
                  >
                    Log In
                  </Button>
                  <Button
                    className="w-full"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onSignupClick?.();
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
