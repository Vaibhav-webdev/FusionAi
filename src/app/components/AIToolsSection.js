"use client";

import { motion } from "framer-motion";
import {
  Pencil,
  Hash,
  Image as ImageIcon,
  Eraser,
  Scissors,
  FileText,
} from "lucide-react";

const tools = [
  {
    title: "AI Article Writer",
    description:
      "Generate high-quality, engaging articles on any topic with our AI writing technology.",
    icon: Pencil,
    color: "bg-sky-500",
  },
  {
    title: "Blog Title Generator",
    description:
      "Find the perfect, catchy title for your blog posts with our AI-powered generator.",
    icon: Hash,
    color: "bg-pink-500",
  },
  {
    title: "AI Image Generation",
    description:
      "Create stunning visuals with our AI image generation tool. Experience the power of AI.",
    icon: ImageIcon,
    color: "bg-emerald-500",
  },
  {
    title: "Background Removal",
    description:
      "Effortlessly remove backgrounds from your images with our AI-driven tool.",
    icon: Eraser,
    color: "bg-orange-500",
  },
  {
    title: "Object Removal",
    description:
      "Remove unwanted objects from your images seamlessly with our AI object removal tool.",
    icon: Scissors,
    color: "bg-indigo-500",
  },
  {
    title: "Resume Reviewer",
    description:
      "Get your resume reviewed by AI to improve your chances of landing your dream job.",
    icon: FileText,
    color: "bg-teal-500",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function AIToolsSection() {
  return (
    <section id="products" className="py-24 px-4 md:px-16 lg:px-24 bg-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">
          Powerful AI Tools
        </h2>
        <p className="mt-3 text-slate-600 text-sm md:text-base">
          Everything you need to create, enhance, and optimize your content with
          cutting-edge AI technology.
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {tools.map((tool, index) => {
          const Icon = tool.icon;

          return (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-lg transition-shadow"
            >
              <div
                className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center text-white`}
              >
                <Icon size={22} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {tool.title}
              </h3>

              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {tool.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
