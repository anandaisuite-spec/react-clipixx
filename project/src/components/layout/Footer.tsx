import { motion } from 'framer-motion';
import { Twitter, Instagram, Facebook } from 'lucide-react';

const footerLinks = {
  Product: ['Categories', 'Pricing', 'How It Works', 'For Business'],
  Company: ['About Us', 'Careers', 'Press', 'Blog'],
  Support: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'],
  Resources: ['Talent FAQ', 'Brand Guidelines', 'Partnerships', 'Affiliate Program'],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
];

export default function Footer() {
  return (
    <footer className="relative">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          <div className="col-span-2">
            <a href="#" className="text-2xl font-serif font-bold text-gray-900 dark:text-white italic">
              Clippixx.
            </a>
            <p className="mt-4 text-gray-600 dark:text-dark-400 text-sm leading-relaxed max-w-xs">
              Personalized video messages from your favorite celebrities.
              The impossible gift, made possible.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-dark-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 dark:text-dark-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
