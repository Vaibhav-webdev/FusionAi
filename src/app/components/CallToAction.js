'use client';

import { motion } from 'framer-motion';

export default function Cta() {
  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto bg-gray-100 rounded-2xl p-12 md:p-14 text-white"
      >
        {/* Top Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex items-center"
        >
          {/* Avatars */}
          <div className="flex -space-x-3 pr-3">
            {[
              'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
              'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200',
            ].map((img, i) => (
              <motion.img
                key={i}
                src={img}
                alt="user"
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="size-8 rounded-full border border-white/20"
              />
            ))}
          </div>

          {/* Rating */}
          <div>
            <div className="flex items-center gap-px">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  width="13"
                  height="12"
                  viewBox="0 0 13 12"
                  fill="none"
                >
                  <path
                    d="M5.85536 0.463527C6.00504 0.00287118 6.65674 0.00287028 6.80642 0.463526L7.82681 3.60397C7.89375 3.80998 8.08572 3.94946 8.30234 3.94946H11.6044C12.0888 3.94946 12.2901 4.56926 11.8983 4.85397L9.22687 6.79486C9.05162 6.92219 8.97829 7.14787 9.04523 7.35388L10.0656 10.4943C10.2153 10.955 9.68806 11.338 9.2962 11.0533L6.62478 9.11244C6.44954 8.98512 6.21224 8.98512 6.037 9.11244L3.36558 11.0533C2.97372 11.338 2.44648 10.955 2.59616 10.4943L3.61655 7.35388C3.68349 7.14787 3.61016 6.92219 3.43491 6.79486L0.763497 4.85397C0.37164 4.56927 0.573027 3.94946 1.05739 3.94946H4.35944C4.57606 3.94946 4.76803 3.80998 4.83497 3.60397L5.85536 0.463527Z"
                    fill="#FF8F20"
                  />
                </svg>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              Used by 12k+ developers
            </p>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-4xl md:text-[46px] md:leading-[60px] font-semibold max-w-xl bg-black/80 text-transparent bg-clip-text"
        >
          Build faster with beautiful components
        </motion.h2>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="mt-8 px-12 py-2.5 rounded-full text-sm border border-purple-600 bg-purple-700/60 hover:bg-purple-800"
        >
          Get Started
        </motion.button>
      </motion.div>
    </section>
  );
}
