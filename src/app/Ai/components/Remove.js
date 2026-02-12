"use client";

import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { useState } from "react";
import { FiScissors } from "react-icons/fi";
import Image from "next/image";
import Preview from "./Preview";
import { toast } from "sonner";

export default function BackgroundRemoval({ updateUser, credits, refresh }) {
  const [fileName, setFileName] = useState("No file chosen");
  const [file, setFile] = useState(null);
  const [show, setShow] = useState(false);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setFileName(selected.name);
    setImage(URL.createObjectURL(selected)); // temp preview
    setShow(true);
  };
const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleRemoveBg = async () => {
    if (credits < 5) {
      toast.error("Don't have enough Credits")
      return
    }
    if (!file) return alert("Please select an image");

    setLoading(true);
    const base64 = await fileToBase64(file);

    const res = await fetch("/api/remove-bg", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64 }),
    });

    const data = await res.json();
    updateUser(10)
    setImage(data.url);
    setLoading(false);
    refresh()
  };
  return (
    <section className="w-full bg-slate-50 flex justify-center p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl w-full">

        {/* LEFT CARD */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-lg bg-orange-100">
              <FiScissors className="text-orange-500" size={20} />
            </div>
            <h2 className="text-lg font-semibold text-slate-800">
              Background Removal
            </h2>
          </div>

          {/* Upload */}
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Upload image
          </label>

          <div className="flex items-center gap-3 border border-slate-300 rounded-xl px-4 py-3 mb-2">
            <Upload size={18} className="text-slate-400" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="upload"
              onChange={handleFileChange}
            />
            <label
              htmlFor="upload"
              className="text-sm text-slate-500 cursor-pointer truncate"
            >
              {fileName}
            </label>
          </div>

          <p className="text-xs text-slate-400 mb-6">
            Supports JPG, PNG, and other image formats
          </p>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleRemoveBg}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
            bg-gradient-to-r from-orange-400 to-red-500 text-white font-medium
            shadow-md hover:shadow-lg transition-all"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FiScissors size={22} />
            )}
            <span>Remove Background</span>
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
            first="Upload Your Image And Click"
            second="Remove Background"
            Third={FiScissors}
          />
        )}
      </div>
    </section>
  );
}
