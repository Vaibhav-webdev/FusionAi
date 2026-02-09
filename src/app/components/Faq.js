'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'What AI tools does this platform provide?',
    answer:
      'Our platform offers multiple AI-powered tools including blog writing, image generation, background removal, content summarization, and various AI APIs that you can integrate directly into your products.',
  },
  {
    question: 'Can I use multiple AI features in one project?',
    answer:
      'Yes. You can combine multiple AI tools such as blog writing with image generation or background removal within the same project using a single dashboard.',
  },
  {
    question: 'Do you provide API access for developers?',
    answer:
      'Absolutely. We provide secure and scalable APIs for all AI features, allowing developers to integrate AI capabilities into web or mobile applications easily.',
  },
  {
    question: 'Is this platform suitable for startups and enterprises?',
    answer:
      'Yes. Our infrastructure is built to scale from small startups to enterprise-level applications with high performance, security, and reliability.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 px-4">
      <div className="max-w-xl mx-auto text-center">
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-indigo-600 text-xl font-medium"
        >
          FAQs
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl font-semibold mt-1"
        >
          Looking for answers?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm text-slate-500 mt-3 mb-10"
        >
          Build powerful AI-driven products using our modular tools and APIs —
          fast, scalable, and developer-friendly.
        </motion.p>

        {/* FAQ List */}
        <div className="text-left">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-slate-200 py-4"
            >
              {/* Question */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between text-left"
              >
                <span className="text-lg font-medium text-slate-800">
                  {faq.question}
                </span>

                <motion.svg
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                    stroke="#1D293D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </motion.button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35 }}
                    className="text-sm text-slate-500 mt-4 overflow-hidden"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
