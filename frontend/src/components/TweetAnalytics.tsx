import React, { useState } from "react";
import Navbar from "./Navbar";
import { Heart, MessageCircle, Share2 } from "lucide-react";

const TweetAnalytics = () => {
  // Sample tweets data (you can replace with API later)
  const [tweets] = useState([
    {
      id: 1,
      text: "Just launched my new project 🚀",
      image: "https://via.placeholder.com/400x200.png?text=Project+Launch",
      likes: 120,
      comments: 45,
      shares: 30,
    }]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          📊 Tweet Analytics
        </h1>

        <div className="space-y-6">
          {tweets.map((tweet) => (
            <div
              key={tweet.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
            >
              {/* Tweet text */}
              <p className="text-lg text-gray-800 dark:text-gray-200 mb-3">
                {tweet.text}
              </p>

              {/* Tweet image if available */}
              {tweet.image && (
                <img
                  src={tweet.image}
                  alt="Tweet visual"
                  className="rounded-lg w-full max-h-60 object-cover mb-3"
                />
              )}

              {/* Analytics row */}
              <div className="flex items-center justify-around border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Heart size={18} className="text-red-500" />
                  <span>{tweet.likes} Likes</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <MessageCircle size={18} className="text-blue-500" />
                  <span>{tweet.comments} Comments</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Share2 size={18} className="text-green-500" />
                  <span>{tweet.shares} Shares</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TweetAnalytics;
