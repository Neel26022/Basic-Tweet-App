import React, { useState, useEffect } from "react";
import axios from "axios";
import { X, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const ShowTweets = () => {
  const [tweets, setTweets] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  const fetchTweets = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/api/tweet", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTweets(data.tweets);
      setCurrentUserId(data.currentUserId);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/tweet/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTweets();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/tweet/edit/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Tweets
        </h1>

        {tweets.length === 0 ? (
          <p className="text-center text-gray-500">No tweets yet.</p>
        ) : (
          tweets.map((tweet) => (
            <div
              key={tweet.id}
              className="bg-white dark:bg-gray-800 p-6 mb-4 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                {tweet.title}
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                {tweet.content}
              </p>
              {tweet.imageUrl && (
                <img
                  src={`http://localhost:3000${tweet.imageUrl}`}
                  alt="tweet"
                  className="max-h-60 mt-2 rounded-lg w-full object-cover"
                />
              )}

              {/* Show author name */}
              <p className="text-sm text-gray-500 mt-2">
                by {tweet.user?.name || "Unknown"}
              </p>

              {/* Only show edit/delete for current user’s tweets */}
              {tweet.userId === currentUserId && (
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleEdit(tweet.id)}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tweet.id)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    <X size={16} /> Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default ShowTweets;
