'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    date: 'Jun 10, 2026',
    text: '“PrebuiltUI has completely changed the way I write code. The components are clean, modern and production-ready.”',
    name: 'James Bond',
    role: 'Amazon.com, Inc.',
    img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
  },
  {
    id: 2,
    date: 'Jun 10, 2026',
    text: '“The components are beautifully designed and incredibly. PrebuiltUI fits perfectly into my React workflow.”',
    name: 'Emily Rodriguez',
    role: 'The Walt Disney Company',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200',
  },
  {
    id: 3,
    date: 'Jun 10, 2026',
    text: '“PrebuiltUI is like having a professional design ready. It’s become an essential part of my coding journey.”',
    name: 'Jack',
    role: 'Facebook, Inc.',
    img: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
  },
  {
    id: 4,
    date: 'Jul 12, 2026',
    text: '“PrebuiltUI makes building polished interfaces effortless. The components feel thoughtfully designed.”',
    name: 'Sarah Williams',
    role: 'Spotify',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200',
  },
  {
    id: 5,
    date: 'Jul 12, 2026',
    text: '“Perfect balance between design and development. UI stays consistent and fast.”',
    name: 'Michael Chen',
    role: 'Google LLC',
    img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const visibleCount = isMobile ? 1 : 3;

  const next = () => {
    setCurrentIndex((prev) =>
      prev + visibleCount >= testimonials.length ? 0 : prev + visibleCount
    );
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev - visibleCount < 0
        ? testimonials.length - visibleCount
        : prev - visibleCount
    );
  };

  useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [isMobile]);

  return (
    <section id='reviews' className="py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-medium text-neutral-900"
        >
          Loved by 10k+ People
        </motion.h2>

        <p className="mt-4 max-w-md text-neutral-600">
          Every single testimonial is a testament to the impact we create.
        </p>

        {/* Desktop Controls */}
        <div className="hidden md:flex justify-end gap-2 mt-6">
          <button
            onClick={prev}
            className="h-10 w-10 flex items-center justify-center rounded-lg border bg-neutral-100 hover:bg-neutral-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={next}
            className="h-10 w-10 flex items-center justify-center rounded-lg border bg-neutral-100 hover:bg-neutral-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {testimonials
            .slice(currentIndex, currentIndex + visibleCount)
            .map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6"
              >
                <div className="flex justify-between">
                  <div className="text-[#FF8F20]">★★★★★</div>
                  <span className="text-xs text-neutral-500">{item.date}</span>
                </div>

                <p className="mt-4 text-sm text-neutral-600">
                  {item.text}
                </p>

                <div className="flex items-center gap-4 mt-6">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-neutral-500">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Mobile Dots */}
        <div className="flex md:hidden justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <span
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                i === currentIndex ? 'bg-neutral-800' : 'bg-neutral-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
