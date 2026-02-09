"use client"

import React from 'react'
import { toast } from 'sonner'

const KeywordSection = ({ title, data }) => {
    return (
        <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
                {title}
            </h3>

            <div className="flex flex-wrap gap-3">
                {data.map((item, index) => (
                    <span
                        onClick={() => {
                            navigator.clipboard.writeText(item)
                            toast.success("Copied Successfully!")
                        }}
                        key={index}
                        className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default KeywordSection