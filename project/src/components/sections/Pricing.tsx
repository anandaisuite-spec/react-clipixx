import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

const plans = [
  {
    name: 'Personal',
    price: 'From $29',
    description: 'Perfect for surprising friends and family with a special message.',
    features: [
      'Access to 5,000+ creators',
      'Standard 7-day delivery',
      'HD video quality',
      'Download & share anywhere',
      'Basic customer support',
    ],
    popular: false,
  },
  {
    name: 'Premium',
    price: 'From $99',
    description: 'Get access to top celebrities and premium features.',
    features: [
      'Access to all 10,000+ stars',
      'Priority 3-day delivery',
      '4K video quality',
      'Unlimited downloads',
      'Priority 24/7 support',
      'Rush delivery option',
    ],
    popular: true,
  },
  {
    name: 'Business',
    price: 'Custom',
    description: 'Enterprise solutions for brands and marketing teams.',
    features: [
      'Dedicated account manager',
      'Custom talent sourcing',
      'Commercial usage rights',
      'Bulk order discounts',
      'API access',
      'Analytics dashboard',
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section className="relative py-24 md:py-32 bg-dark-950">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-950/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wider uppercase text-primary-400 bg-primary-500/10 rounded-full mb-6">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Simple,{' '}
            <span className="font-serif italic font-normal">transparent</span>{' '}
            pricing
          </h2>
          <p className="text-lg text-dark-400 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include our
            money-back guarantee.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl ${
                plan.popular
                  ? 'bg-gradient-to-b from-primary-500/10 to-primary-600/5 border-2 border-primary-500/30'
                  : 'bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.05]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-primary-600 rounded-full">
                    <Sparkles className="w-3.5 h-3.5" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="text-3xl font-bold text-white mb-3">
                  {plan.price}
                </div>
                <p className="text-sm text-dark-400">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-dark-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? 'primary' : 'outline'}
                className="w-full"
              >
                {plan.name === 'Business' ? 'Contact Sales' : 'Get Started'}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
