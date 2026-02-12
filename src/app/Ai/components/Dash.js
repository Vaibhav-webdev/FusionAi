"use client";

import React, { useState, useEffect } from "react";
import StatCard from "./Startcard";
import { FiZap, FiCreditCard } from "react-icons/fi";
import { BsGem } from "react-icons/bs";

const Dash = ({ plan, creations, credits }) => {
  const [articles, setArticles] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [titles, setTitles] = useState([]);
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/get");
        const { TotalCreation } = await response.json();

        setArticles(TotalCreation?.ArticleGen || []);
        setKeywords(TotalCreation?.KeywordGen || []);
        setTitles(TotalCreation?.TitleGen || []);
        setEmails(TotalCreation?.EmailWriter || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const noCreations =
    articles.length === 0 &&
    keywords.length === 0 &&
    titles.length === 0 &&
    emails.length === 0;

  return (
    <main className="flex-1 p-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Creations"
          value={creations}
          icon={<FiZap size={22} />}
          gradient="bg-gradient-to-r from-blue-500 to-cyan-400"
        />
        <StatCard
          title="Active Plan"
          value={plan}
          icon={<BsGem size={22} />}
          gradient="bg-gradient-to-r from-pink-500 to-purple-500"
        />
        <StatCard
          title="Your Credits"
          value={credits}
          icon={<FiCreditCard size={22} />}
          gradient="bg-gradient-to-r from-yellow-500 to-orange-500"
        />
      </div>

      {/* Recent Creations */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-6">Recent Creations</h2>

        {loading ? (
          <div className="bg-white rounded-xl h-40 flex items-center justify-center text-gray-400 text-sm">
            Loading...
          </div>
        ) : noCreations ? (
          <div className="bg-white rounded-xl h-40 flex items-center justify-center text-gray-400 text-sm">
            No creations yet
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Articles */}
            {articles.length > 0 && (
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <h3 className="font-semibold mb-4 text-blue-600">Articles</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {articles.map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-3 hover:bg-gray-50 transition"
                    >
                      <p className="font-medium">{item.topic}</p>
                      <p className="text-sm text-gray-500">
                        Length: {item.length}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Keywords */}
            {keywords.length > 0 && (
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <h3 className="font-semibold mb-4 text-green-600">Keywords</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {keywords.map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-3 hover:bg-gray-50 transition"
                    >
                      <p className="font-medium">{item.topic}</p>
                      <p className="text-sm text-gray-500">
                        Style: {item.style}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Titles */}
            {titles.length > 0 && (
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <h3 className="font-semibold mb-4 text-purple-600">Titles</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {titles.map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-3 hover:bg-gray-50 transition"
                    >
                      <p className="font-medium">{item.topic}</p>
                      <p className="text-sm text-gray-500">
                        Style: {item.style}
                      </p>
                      <p className="text-sm text-gray-500">
                        Platform: {item.platform}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Emails */}
            {emails.length > 0 && (
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <h3 className="font-semibold mb-4 text-red-600">Emails</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {emails.map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-3 hover:bg-gray-50 transition"
                    >
                      <p className="font-medium">{item.describe}</p>
                      <p className="text-sm text-gray-500">
                        Tone: {item.tone}
                      </p>
                      <p className="text-sm text-gray-400">
                        {item.additional}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </main>
  );
};

export default Dash;
