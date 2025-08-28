import React, { useState, useRef } from "react";
import { Image as ImageIcon, X } from "lucide-react";
import Navbar from "./Navbar";
import axios from "axios";

const CreateTweet = () => {
  const [title, setTitle] = useState("");          // ✅ Title field
  const [tweet, setTweet] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const maxChars = 280;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() && !tweet.trim() && !image) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", tweet);
      if (fileInputRef.current.files[0]) {
        formData.append("image", fileInputRef.current.files[0]);
      }

      const token = localStorage.getItem("token"); // JWT token if used

      const { data } = await axios.post("/api/tweet", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Tweet created:", data);
      setTitle("");
      setTweet("");
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Failed to create tweet:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          ✍️ Create a Tweet
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          {/* Title Input */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Tweet Textarea */}
          <textarea
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            maxLength={maxChars}
            placeholder="What's happening?"
            className="w-full h-32 resize-none p-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Image Preview */}
          {image && (
            <div className="relative mt-4">
              <img src={image} alt="preview" className="rounded-lg max-h-60 w-full object-cover" />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {/* Bottom actions */}
          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center gap-2 text-blue-600 dark:text-blue-400 cursor-pointer hover:text-blue-700 dark:hover:text-blue-300">
              <ImageIcon size={20} />
              <span className="hidden sm:inline">Add Image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </label>

            <div className="flex items-center gap-4">
              <p className={`text-sm ${tweet.length >= maxChars - 20 ? "text-red-500" : "text-gray-500 dark:text-gray-400"}`}>
                {tweet.length}/{maxChars}
              </p>
              <button
                type="submit"
                disabled={!title.trim() && !tweet.trim() && !image || loading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 disabled:opacity-50"
              >
                {loading ? "Posting..." : "Tweet"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateTweet;
