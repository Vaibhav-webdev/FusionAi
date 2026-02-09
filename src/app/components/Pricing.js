'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const pricingData = [
    {
      name: 'Basic',
      price: isAnnual ? 100 : 10,
      description: 'For startups and small teams.',
      features: [
        'Generate Professional Email (Limited)',
        'Remove objects from Image (Limited)',
        'Remove Background of a Image (Limited)',
        'Genrate Articles (Limited)',
      ],
    },
    {
      name: 'Pro',
      mostPopular: true,
      price: isAnnual ? 300 : 30,
      description: 'Perfect for growing businesses.',
      features: [
        'Genrate Titles for Social Media',
        'Use Catchy Keywords To Grow',
        'Remove Objects from Image',
        'Remove Background from an Image',
      ],
    },
    {
      name: 'Enterprise',
      price: isAnnual ? 500 : 50,
      description: 'For scaling brands and teams.',
      features: [
        'Generate Unlimited Articles',
        'Generate Unlimited Keywords and Titles',
        'Generate Unlimited Email In Any Tone',
        'Remove Objects from an Image (Unlimited)',
      ],
    },
  ];

  return (
    <section id='pricing' className="py-20 px-4 flex flex-col items-center">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-medium text-4xl md:text-[52px] text-slate-800 text-center"
      >
        Flexible Pricing Plans
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="text-base text-zinc-500 max-w-sm text-center mt-4"
      >
        Choose a plan that supports your business growth and digital goals.
      </motion.p>

      {/* Toggle */}
      <div className="mt-6 flex bg-zinc-100 p-1.5 rounded-full">
        <button
          onClick={() => setIsAnnual(false)}
          className={`px-4 py-2 rounded-full text-xs transition ${
            !isAnnual
              ? 'bg-zinc-800 text-white'
              : 'text-gray-600'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setIsAnnual(true)}
          className={`px-4 py-2 rounded-full text-xs transition ${
            isAnnual
              ? 'bg-zinc-800 text-white'
              : 'text-gray-600'
          }`}
        >
          Annually
        </button>
      </div>

      {/* Cards */}
      <motion.div
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.15 },
          },
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {pricingData.map((item, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{
              y: -8,
              boxShadow: '0px 20px 40px rgba(0,0,0,0.08)',
            }}
            transition={{ type: 'spring', stiffness: 260 }}
            className={`border border-zinc-200 rounded-2xl p-6 max-w-md flex flex-col ${
              item.mostPopular ? 'bg-gray-100' : 'bg-white'
            }`}
          >
            {item.mostPopular && (
              <span className="text-xs font-medium text-zinc-700 mb-3">
                Most Popular
              </span>
            )}

            <h3 className="font-medium text-3xl text-slate-800">
              {item.name}
            </h3>

            <p className="text-sm text-zinc-500 mt-2">
              {item.description}
            </p>

            <h4 className="font-medium text-5xl text-slate-800 mt-6">
              ${item.price}
            </h4>

            <button
              className={`w-full px-4 py-3 rounded-full text-sm mt-8 transition ${
                item.mostPopular
                  ? 'bg-gray-800 hover:bg-gray-900 text-white'
                  : 'border border-zinc-300 bg-zinc-100 hover:bg-zinc-200'
              }`}
            >
              Get Started
            </button>

            <div className="mt-8 space-y-2.5">
              {item.features.map((feature, i) => (
                <p
                  key={i}
                  className="flex items-center gap-3 text-sm text-zinc-500"
                >
                  <span className="size-3 rounded-full bg-zinc-300 flex items-center justify-center shrink-0">
                    <span className="size-1.5 rounded-full bg-zinc-800" />
                  </span>
                  {feature}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
