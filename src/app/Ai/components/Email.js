"use client";

import { motion } from "framer-motion";
import { Edit3, Sparkles } from "lucide-react";
import { useState } from "react";
import { FiMail } from "react-icons/fi";
import { toast } from "sonner";
import Preview from "./Preview";
import { FiHash } from "react-icons/fi";

export default function EmailGenerator({ updateUser, credits, refresh }) {
    const [topic, setTopic] = useState("")
    const [email, setEmail] = useState(null)
    const [tone, setTone] = useState("Professional");
    const [addi, setAddi] = useState("")
    const [show, setShow] = useState(false)
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
            toast.error("Don't have enough Credits")
            return
        }
        setLoading(true)
        setShow(false)
        const response = await fetch("/api/gemini/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: topic,
                tone: tone,
                addi: addi
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
            setEmail(parsedKeywords)
        }

        await fetch("/api/add2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        category: "EmailWriter", // ⚠️ ArticleGen nahi — yahan TitleGen hona chahiye
        data: {
          describe: topic,
          tone,
          additional,
        }
      })
    });
        main(data.text)
        updateUser(5)
        setLoading(false)
        setShow(true)
        setTopic("")
        setTone("Professional")
        setAddi("")
        refresh()
    }
    return (
        <section className="w-full bg-slate-50 flex justify-center p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl w-full">

                {/* LEFT CARD */}
                {/* LEFT CARD */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-6">
                        <FiMail className="text-blue-600" size={22} />
                        <h2 className="text-lg font-semibold text-slate-800">
                            AI Email Writer
                        </h2>
                    </div>

                    {/* STEP 1: EMAIL PURPOSE */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-600 mb-2">
                            Describe Your Email
                        </label>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => {
                                setTopic(e.target.value)
                            }}
                            placeholder="e.g. Asking for a job opportunity, client follow-up, meeting request"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
      focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* STEP 2: EMAIL STYLE */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-600 mb-3">
                            Choose email tone
                        </label>

                        <div className="flex flex-wrap gap-3">
                            {[
                                "Professional",
                                "Friendly",
                                "Formal",
                                "Emotional",
                                "Persuasive",
                                "Catchy",
                            ].map((tones) => (
                                <motion.button
                                    key={tones}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setTone(tones)
                                    }}
                                    className={`px-4 py-2 rounded-full text-sm border transition-all
                    ${tone === tones
                                            ? "bg-blue-600 text-white border-blue-600 shadow-md"
                                            : "bg-white text-slate-600 border-slate-300 hover:border-blue-400"
                                        }
                  `}
                                >
                                    {tones}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* STEP 3: EXTRA INSTRUCTIONS */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-600 mb-2">
                            Additional instructions (optional)
                        </label>
                        <textarea
                            value={addi}
                            onChange={(e) => {
                                setAddi(e.target.value)
                            }}
                            placeholder="e.g. Keep it short, polite, and include a call to action"
                            className="w-full h-24 resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm
      focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* BUTTON */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={handleClick}
                        className="w-full mt-10 flex items-center justify-center gap-3
    bg-gradient-to-r from-blue-600 to-blue-700
    text-white font-medium py-3 rounded-xl
    shadow-lg hover:shadow-xl transition-all"
                    >
                        {loading ? <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : <FiMail size={23} />}
                        <span>Generate Email</span>
                    </motion.button>
                </div>
                {show ? <div className="bg-white rounded-2xl h-full overflow-y-auto border border-slate-200 shadow-lg p-6">
                    {loading ? (
                        <p className="text-slate-400">Generating article...</p>
                    ) : email ? (
                        <div>
                            <div className="flex items-center justify-between text-lg text-gray-700 border-b border-gray-200 pb-2 px-3">
                                <div className="flex items-center gap-2 hover:font-semibold">
                                    <FiMail size={23} className="text-blue-600" />
                                    <div className="font-semibold">Generated Email</div>
                                </div>
                                <div>
                                    <motion.button whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.96 }}
                                        onClick={() => {
                                            const subject = encodeURIComponent(email.subject);
                                            const body = encodeURIComponent(email.body);
                                            window.location.href = `mailto:?subject=${subject}&body=${body}`;
                                        }}
                                        className="bg-blue-200 hover:bg-blue-300 cursor-pointer transition duration-150 ease-in-out text-sm px-3 gap-1 flex items-center py-2 rounded-sm hover:font-semibold hover:text-gray-700"><FiMail size={18} />Open Gmail</motion.button>
                                </div>
                            </div>
                            <div className="space-y-8 mt-4">
                                <div><span className="font-bold">Subject: </span>{email.subject}</div>
                                <div><span className="font-bold">Body: </span>{renderArticle(normalizeArticle(`${email.body}`))}</div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-slate-400 text-center">
                            Article will appear here
                        </p>
                    )}
                </div> : <Preview first={"Enter a topic and click"} second={"Generate Social Media Title"} Third={FiMail} />}
            </div>
        </section>
    );
}
