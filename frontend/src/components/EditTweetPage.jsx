import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const EditTweetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch tweet data
  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("/api/tweet", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const tweet = data.tweets.find((t) => t.id === Number(id));
        if (!tweet) return navigate("/tweets");

        setTitle(tweet.title);
        setDescription(tweet.content);
        setImage(tweet.imageUrl ? `http://localhost:3000${tweet.imageUrl}` : null);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    fetchTweet();
  }, [id, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (fileInputRef.current?.files[0]) {
        formData.append("image", fileInputRef.current.files[0]);
      }

      const token = localStorage.getItem("token");
      await axios.put(`/api/tweet/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/tweets");
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Edit Tweet
        </h1>

        <form
          onSubmit={handleUpdate}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full mb-4 p-2 border rounded-lg"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full mb-4 p-2 border rounded-lg"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="mb-2"
          />
          {image && (
            <img
              src={image}
              alt="preview"
              className="max-h-60 mb-4 rounded-lg w-full object-cover"
            />
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white rounded-lg"
          >
            {loading ? "Updating..." : "Update Tweet"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default EditTweetPage;
