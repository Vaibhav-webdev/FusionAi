"use client";

import { motion } from "framer-motion";
import { FiImage } from "react-icons/fi";
import Preview from "./Preview";
import { Edit3, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ImageGenerator({ updateUser, credits, refresh }) {
  const [style, setStyle] = useState("Realistic");
  const [prompt, setPrompt] = useState("");
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generateImage() {
    if (credits < 5) {
      toast.error("Don't have enough Credits")
      return
    }
    setLoading(true);
    setImage(null);
    setShow(false)

    const res = await fetch("/api/gemini/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, style }),
    });

    const data = await res.json();

    if (data.imageBase64) {
      setImage(`data:image/png;base64,${data.imageBase64}`);
    }
    updateUser(10)
    setShow(true)
    setLoading(false);
    refresh()
  }
  return (
    <section className="w-full bg-slate-50 flex justify-center p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl w-full">

        {/* LEFT CARD */}
        <div
          className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <FiImage className="text-green-600" size={22} />
            <h2 className="text-lg font-semibold text-slate-800">
              Ai Image Generator
            </h2>
          </div>

          {/* INPUT */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Describe Your Image
            </label>
            <textarea
              type="text"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value)
              }}
              placeholder="Describe what you want to see in the image..."
              className="w-full rounded-xl h-30 resize-none border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* LENGTH SELECTOR */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-3">
              Style
            </label>

            <div className="flex flex-wrap gap-3">
              {[
                { id: "Realistic", label: "Realistic" },
                { id: "Ghibli style", label: "Ghibli style" },
                { id: "Anime style", label: "Anime style" },
                { id: "Cartoon style", label: "Cartoon style" },
                { id: "Fantasy style", label: "Fantasy style" },
                { id: "Realistic style", label: "Realistic style" },
                { id: "3D style", label: "3D style" },
                { id: "Portrait style", label: "Portrait style" },
              ].map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStyle(item.id)}
                  className={`px-4 py-2 rounded-full text-sm border transition-all
                    ${style === item.id
                      ? "bg-green-600 text-white border-green-600 shadow-md"
                      : "bg-white text-slate-600 border-slate-300 hover:border-green-400"
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
            onClick={generateImage}
            className="w-full flex mt-10 items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all">
            {loading ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FiImage size={22} />
            )}
            <span>Generate Image</span>
          </motion.button>
        </div>

        {/* RIGHT CARD */}
        {show ? (
          <div className="bg-white rounded-2xl h-full border border-slate-200 shadow-lg p-6">
            {loading ? (
              <p className="text-slate-400">Processing image...</p>
            ) : image ? (
              <>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-4">
                  <div className="flex items-center gap-2 font-semibold text-slate-700">
                    <FiScissors className="text-orange-500" />
                    Generated Image
                  </div>

                  <a
                    href={image}
                    download="bg-removed.png"
                    className="bg-orange-200 hover:bg-orange-300 text-sm px-3 py-2 rounded-md transition font-medium"
                  >
                    Download
                  </a>
                </div>

                {/* Image Preview */}
                <div className="relative w-full h-[360px] rounded-xl overflow-hidden border bg-slate-50">
                  <Image
                    src={image}
                    alt="Generated image"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
              </>
            ) : (
              <p className="text-slate-400 text-center">
                Image will appear here
              </p>
            )}
          </div>
        ) : (
          <Preview
            first="Describe Your Image And Click"
            second="Generate Image"
            Third={FiImage}
          />
        )}
      </div>
    </section>
  );
}
