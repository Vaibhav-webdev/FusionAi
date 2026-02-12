"use client";

import { motion } from "framer-motion";
import { Edit3, Sparkles } from "lucide-react";
import TitleSection from "./TitleSection";
import { useState } from "react";
import Preview from "./Preview";
import { toast } from "sonner";
import { FiType } from "react-icons/fi";

export default function YoutubeGenerator({ updateUser, credits, refresh }) {
  const [style, setStyle] = useState("Catchy")
  const [titles, setTitles] = useState(null)
  const [topic, setTopic] = useState("")
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false);
  const [platform, setPlatform] = useState("YouTube")

  async function handleClick() {
    if (credits < 5) {
      toast.error("Don't have enough Credits")
      return
    }
    setLoading(true)
    setShow(false)
    const response = await fetch("/api/gemini/title", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: topic,
        style: style,
        platform: platform
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
      setTitles(parsedKeywords)
    }
    
    await fetch("/api/add2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        category: "TitleGen", // ⚠️ ArticleGen nahi — yahan TitleGen hona chahiye
        data: {
          topic,
          style,
          platform,
        }
      })
    });

    updateUser(5)
    main(data.text)
    setLoading(false)
    setShow(true)
    setTopic("")
    setStyle("Catchy")
    setPlatform("Youtube")
    refresh()
  }  
  return (
    <section className="w-full bg-slate-50 flex justify-center p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl w-full">
        {/* LEFT CARD */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <FiType className="text-pink-600" size={22} />
            <h2 className="text-lg font-semibold text-slate-800">
              Social Media Title Generator
            </h2>
          </div>

          {/* STEP 1: CONTENT IDEA */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-2">
              What is your content about?
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value)
              }}
              placeholder="e.g. How AI is changing content creation"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
      focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* STEP 2: TITLE STYLE */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-3">
              Choose title style
            </label>

            <div className="flex flex-wrap gap-3">
              {[
                "Catchy",
                "Professional",
                "Emotional",
                "Clickbait",
                "Funny",
                "Informative",
              ].map((data) => (
                <motion.button
                  key={data}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStyle(data)}
                  className={`px-4 py-2 rounded-full text-sm border transition-all
          ${style === data
                      ? "bg-pink-600 text-white border-pink-600 shadow-md"
                      : "bg-white text-slate-600 border-slate-300 hover:border-purple-400"
                    }`}
                >
                  {data}
                </motion.button>
              ))}
            </div>
          </div>

          {/* STEP 3: PLATFORM SELECTION */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-3">
              Select platform
            </label>

            <div className="flex flex-wrap gap-3">
              {[
                "YouTube",
                "Instagram",
                "Facebook",
                "X (Twitter)",
                "LinkedIn",
                "Snapchat",
              ].map((plat) => (
                <motion.button
                  key={plat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPlatform(plat)}
                  className={`px-4 py-2 rounded-full text-sm border transition-all
                    ${platform === plat
                      ? "bg-pink-600 text-white border-pink-600 shadow-md"
                      : "bg-white text-slate-600 border-slate-300 hover:border-purple-400"
                    }
                  `}
                >
                  {plat}
                </motion.button>
              ))}
            </div>
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleClick}
            className="w-full mt-10 flex items-center justify-center gap-3
    bg-gradient-to-r from-pink-700 to-pink-500
    text-white font-medium py-3 rounded-xl
    shadow-lg hover:shadow-xl transition-all"
          >
            {loading ? <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : <FiType size={23} />}
            <span>Generate Social Media Title</span>
          </motion.button>
        </div>
        {/* RIGHT CARD */}
        {show ? <div className="bg-white rounded-2xl h-full overflow-y-auto border border-slate-200 shadow-lg p-6">
                  {loading ? (
                    <p className="text-slate-400">Generating article...</p>
                  ) : titles ? (
                    <div>
                      <div className="text-center text-lg text-gray-700 border-b border-gray-200 pb-2">
                        <div className="font-semibold">Generated Titles</div>
                        <p className="text-sm">Click Titles to Copy</p>
                      </div>
        
                      <div className="space-y-8 mt-4">
                        <TitleSection data={titles.titles} />
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-400 text-center">
                      Article will appear here
                    </p>
                  )}
                </div> : <Preview first={"Enter a topic and click"} second={"Generate Social Media Title"} Third={FiType} />}
      </div>
    </section>
  );
}
