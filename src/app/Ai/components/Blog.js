"use client";

import { motion } from "framer-motion";
import { Edit3, Sparkles } from "lucide-react";
import KeywordSection from "./KeywordSection";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FiHash } from "react-icons/fi";
import Preview from "./Preview";

export default function BlogGenerator({ updateUser, credits, refresh }) {
  const [category, setCategory] = useState("General");
  const [topic, setTopic] = useState("")
  const [keywords, setKeywords] = useState(null)
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false);
  
  async function handleClick() {
    if (credits < 5) {
      toast.error("Don't have enough Credits")
    }
    setLoading(true)
    setShow(false)
    const response = await fetch("/api/gemini/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: topic,
        category: category
      })
    })
    const data = await response.json()
    function main(aiText) {
      let parsedKeywords;
      try {
        parsedKeywords = JSON.parse(aiText);
      } catch (err) {
        console.error("Invalid JSON from AI:", aiText);
      }
      setKeywords(parsedKeywords)
    }
    updateUser(5)
    main(data.text)
    setLoading(false)
    setShow(true)
    setTopic("")
    setCategory("General")
    refresh()
  }

  return (
    <section className="w-full bg-slate-50 flex justify-center p-6 h-screen overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl w-full h-full">

        {/* LEFT CARD */}
        <div
          className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <FiHash className="text-purple-600" size={22} />
            <h2 className="text-lg font-semibold text-slate-800">
              Ai Keyword Generator
            </h2>
          </div>

          {/* INPUT */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value)
              }}
              placeholder="The future of artificial intelligence is..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* LENGTH SELECTOR */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-3">
              Category
            </label>

            <div className="flex flex-wrap gap-3">
              {[
                { id: "General", label: "General" },
                { id: "Technology", label: "Technology" },
                { id: "Business", label: "Business" },
                { id: "Health", label: "Health" },
                { id: "LifeStyle", label: "LifeStyle" },
                { id: "Education", label: "Education" },
                { id: "Travel", label: "Travel" },
                { id: "Food", label: "Food" },
              ].map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCategory(item.id)}
                  className={`px-4 py-2 rounded-full text-sm border transition-all
                    ${category === item.id
                      ? "bg-purple-600 text-white border-purple-600 shadow-md"
                      : "bg-white text-slate-600 border-slate-300 hover:border-purple-400"
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
            className="w-full mt-10 flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            {loading ? <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : <FiHash size={23} />}
            <span>Generate Keyword</span>
          </motion.button>
        </div>

        {/* RIGHT CARD */}
        {show ? <div className="bg-white rounded-2xl h-full overflow-y-auto border border-slate-200 shadow-lg p-6">
          {loading ? (
            <p className="text-slate-400">Generating article...</p>
          ) : keywords ? (
            <div>
              <div className="text-center text-lg text-gray-700 border-b border-gray-200 pb-2">
                <div className="font-semibold">Generated Keywords</div>
                <p className="text-sm">Click Keywords to Copy</p>
              </div>

              <div className="space-y-8 mt-4">
                <KeywordSection title="Primary Keywords" data={keywords.primary_keywords} />
                <KeywordSection title="Secondary Keywords" data={keywords.secondary_keywords} />
                <KeywordSection title="Questions" data={keywords.questions} />
              </div>
            </div>
          ) : (
            <p className="text-slate-400 text-center">
              Article will appear here
            </p>
          )}
        </div> : <Preview first={"Enter a topic and click"} second={"Generate Article"} Third={FiHash} />}
      </div>
    </section>
  );
}
