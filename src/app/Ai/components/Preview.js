import React from 'react'
import {
  FiHome,
  FiEdit,
  FiHash,
  FiImage,
  FiScissors,
  FiLayers,
  FiMail,
  FiType,
} from "react-icons/fi";

const Preview = ({ first, second, Third }) => {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 flex items-center justify-center">
            <div className="text-center text-slate-400 max-w-xs">
                <Third size={44} className="mx-auto mb-4" />
                <p className="text-sm">
                    {first}{" "}
                    <span className="font-medium text-slate-600">
                        “{second}”
                    </span>{" "}
                    to get started
                </p>
            </div>
        </div>
    );
};


export default Preview