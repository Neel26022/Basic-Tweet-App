import "../app.css";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Navbar */}
      <Navbar />

      {/* Main Section */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Welcome to <span className="text-blue-600">Tweet App 🚀</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Connect with your friends, share your thoughts, and explore trending tweets around the world.
          </p>
        </section>

        {/* Features Section */}
        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">📝 Create Tweets</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Share your ideas, moments, or opinions with your followers instantly.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">🌍 Explore Posts</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Discover trending posts, hashtags, and topics happening worldwide.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">💬 Engage</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Like, comment, and interact with tweets from your friends and the community.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center">
          <a
            href="/tweet/create"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            Create Your First Tweet
          </a>
        </section>
      </main>
    </div>
  );
};

export default Home;
