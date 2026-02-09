"use client";

import { motion } from "framer-motion";
import { Edit3, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import Preview from "./Preview";
import { toast } from "sonner";
import { FiEdit } from "react-icons/fi";

export default function ArticleGenerator({ updateUser, credits, refresh }) {
  const [length, setLength] = useState("short");
  const [show, setShow] = useState(false)
  const [topic, setTopic] = useState("")
  const [article, setArticle] = useState("");
  const [loading, setLoading] = useState(false);

  const renderArticle = (text) => {
    const lines = text.split("\n");
    const elements = [];
    lines.forEach((line, index) => {
        // H3
        if (line.startsWith("### ")) {
            elements.push(
                <h3 key={index} className="text-xl font-semibold mb-3">
                    {line.slice(4)}
                </h3>
            );
            return;
        }

        // H2
        if (line.startsWith("## ")) {
            elements.push(
                <h2 key={index} className="text-2xl font-bold mb-3">
                    {line.slice(3)}
                </h2>
            );
            return;
        }

        // H1
        if (line.startsWith("# ")) {
            elements.push(
                <h1 key={index} className="text-xl font-bold mb-4">
                    {line.slice(2)}
                </h1>
            );
            return;
        }

        // LIST
        if (line.startsWith("- ")) {
            elements.push(
                <li key={index} className="ml-6 list-disc mb-1">
                    {line.slice(2)}
                </li>
            );
            return;
        }

        // EMPTY
        if (!line.trim()) {
    return;
}

        // PARAGRAPH with inline formatting
        elements.push(
            <p key={index} className="text-slate-700 leading-relaxed mb-4">
                {parseInlineStyles(line)}
            </p>
        );
    });

    return elements;
};


const parseInlineStyles = (text) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);

    return parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
        }

        if (part.startsWith("*") && part.endsWith("*")) {
            return <em key={index}>{part.slice(1, -1)}</em>;
        }

        return part;
    });
};

const normalizeArticle = (text) => {
    return text
        .replace(/###\s*/g, "\n### ")
        .replace(/##\s*/g, "\n## ")
        .replace(/#\s*/g, "\n# ")
        .trim();
};

  async function handleClick() {
    if (credits < 5) {
      toast.error("Don't have enough Credits!")
      return
    }
    setLoading(true)
    setShow(false)
    setArticle("")
    const response = await fetch("/api/gemini/article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: topic,
        length: length
      })
    })
    const data = await response.json()
    updateUser(5)
    setLoading(false)
    setArticle(data.text)
    setTopic("")
    setLength("short")
    setShow(true)
    refresh()
  }
  return (
    <section className="w-full bg-slate-50 h-screen flex justify-center p-6 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl w-full h-full">
        {/* LEFT CARD */}
        <div
          className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <FiEdit className="text-blue-600" size={22} />
            <h2 className="text-lg font-semibold text-slate-800">
              Article Configuration
            </h2>
          </div>

          {/* INPUT */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Article Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value)
              }}
              placeholder="The future of artificial intelligence is..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* LENGTH SELECTOR */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-3">
              Article Length
            </label>

            <div className="flex flex-wrap gap-3">
              {[
                { id: "short", label: "Short (500–800 words)" },
                { id: "medium", label: "Medium (800–1200 words)" },
                { id: "long", label: "Long (1200+ words)" },
              ].map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLength(item.id)}
                  className={`px-4 py-2 rounded-full text-sm border transition-all
                    ${length === item.id
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : "bg-white text-slate-600 border-slate-300 hover:border-blue-400"
                    }
                  `}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleClick}
            className="w-full mt-10 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            {loading ? <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : <FiEdit size={23} />}
            <span>Generate Article</span>
          </motion.button>
        </div>

        {/* RIGHT CARD */}
        {show ? <div className="bg-white rounded-2xl h-full overflow-y-auto border border-slate-200 shadow-lg p-6">
          {loading ? (
            <p className="text-slate-400">Generating article...</p>
          ) : article ? (
            <div>
              <div className="text-center text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">Your Generated Article</div>
              <div className="pt-4">
              {renderArticle(normalizeArticle(`${article}`))}
            </div>
        </div>
          ) : (
            <p className="text-slate-400 text-center">
              Article will appear here
            </p>
          )}
        </div> : <Preview first={"Enter a topic and click"} second={"Generate Article"} Third={FiEdit} />}
      </div>
    </section>
  );
}
