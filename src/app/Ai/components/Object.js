"use client";

import { motion } from "framer-motion";
import { toast } from "sonner";
import { Upload, ImageOff } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Preview from "./Preview";

export default function ObjectRemoval({ updateUser, credits, setRender }) {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (credits < 5) {
      toast.error("Don't have enough Credits")
    }
    if (!file || !prompt.trim()) {
      alert("Image aur prompt dono chahiye");
      return;
    }

    setLoading(true);
    setResultImage(null);

    const formData = new FormData();
    formData.append("image", file);     // ✅ real File object
    formData.append("prompt", prompt);

    const res = await fetch("/api/gemini/edit-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.imageBase64) {
      setResultImage(`data:image/png;base64,${data.imageBase64}`);
    }
    updateUser(10)
    setLoading(false);
    setRender(false)
    setRender(true)
  }

  return (
    <section className="w-full bg-slate-50 flex justify-center p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl w-full">

        {/* LEFT CARD */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-lg bg-indigo-100">
              <ImageOff className="text-indigo-500" size={20} />
            </div>
            <h2 className="text-lg font-semibold text-slate-800">
              Object Removal
            </h2>
          </div>

          {/* Upload */}
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Upload image
          </label>

          <div className="flex items-center gap-3 border border-slate-300 rounded-xl px-4 py-3">
            <Upload size={18} className="text-slate-400" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="upload"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label
              htmlFor="upload"
              className="text-sm text-slate-500 cursor-pointer truncate"
            >
              {file ? file.name : "No file chosen"}
            </label>
          </div>

          {/* Prompt */}
          <div className="rounded-xl mt-6">
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Describe object to remove
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: Spoon, Watch, Ball..."
              className="w-full rounded-xl h-32 resize-none border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <p className="text-xs text-slate-400 mt-2 mb-6">
            Supports JPG, PNG, and other image formats
          </p>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={submit}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
            bg-gradient-to-r from-purple-400 to-blue-500 text-white font-medium
            shadow-md hover:shadow-lg transition-all"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <ImageOff size={22} />
            )}
            <span>Remove Object</span>
          </motion.button>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white rounded-2xl h-full border border-slate-200 shadow-lg p-6">
          {loading ? (
            <p className="text-slate-400">Processing image...</p>
          ) : resultImage ? (
            <>
              <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-4">
                <div className="flex items-center gap-2 font-semibold text-slate-700">
                  <ImageOff className="text-orange-500" />
                  Updated Image
                </div>

                <a
                  href={resultImage}
                  download="updated-image.png"
                  className="bg-orange-200 hover:bg-orange-300 text-sm px-3 py-2 rounded-md transition font-medium"
                >
                  Download
                </a>
              </div>

              <div className="relative w-full h-[360px] rounded-xl overflow-hidden border bg-slate-50">
                <Image
                  src={resultImage}
                  alt="Generated image"
                  fill
                  className="object-contain"
                />
              </div>
            </>
          ) : (
            <Preview
              first="Describe what you want to remove and click"
              second="Remove Object"
              Third={ImageOff}
            />
          )}
        </div>
      </div>
    </section>
  );
}
