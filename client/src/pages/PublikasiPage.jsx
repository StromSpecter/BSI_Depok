import { useEffect, useState } from "react";
import axios from "axios";
import { API_FILEURL, API_URL } from "../utils/constant";

const PublikasiPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  // Format tanggal
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("id-ID", options).format(
      new Date(dateString)
    );
  };

  // Fetch data menggunakan Axios
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/newss`);
        setNews(response.data);
      } catch (error) {
        setError(error.message || "Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Ambil kategori unik dari data news
  const categories = ["All", ...new Set(news.map((item) => item.category))];

  // Filter data berdasarkan kategori aktif
  const filteredNews =
    activeCategory === "All"
      ? news
      : news.filter((item) => item.category === activeCategory);

  return (
    <div className="flex flex-col w-full h-full gap-20">
      {loading ? (
        <p className="mt-10 text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="mt-10 text-center text-red-500">{error}</p>
      ) : news.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">No news available.</p>
      ) : (
        <section className="w-full h-full px-5 pt-20">
          <div className="container flex flex-col items-center w-full h-full gap-10 mx-auto">
            {/* Render kategori sebagai section */}
            <div className="flex flex-row items-center justify-center w-full h-full gap-5">
              {categories.map((category) => (
                <div
                  key={category}
                  className={`h-full px-4 py-2 border-2 rounded-full cursor-pointer ${
                    activeCategory === category
                      ? "bg-blue-200 border-blue-500"
                      : "bg-transparent border-transparent"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  <p
                    className={`text-center font-bold ${
                      activeCategory === category
                        ? "text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    {category}
                  </p>
                </div>
              ))}
            </div>

            {/* Render berita berdasarkan kategori yang aktif */}
            <div className="grid w-full h-full grid-cols-1 gap-10 md:grid-cols-3">
              {filteredNews.map((news) => (
                <a key={news.id} href={`/publikasi/${news.path}`}>
                  <div className="flex flex-col w-full h-full overflow-hidden bg-white border hover:shadow-lg hover:shadow-blue-100 rounded-3xl">
                    {/* Image */}
                    <div
                      className="w-full bg-red-500 bg-center bg-cover h-60"
                      style={{
                        backgroundImage: `url(${API_FILEURL}/${news.image})`,
                      }}
                    ></div>

                    {/* Content */}
                    <div className="flex flex-col gap-3 p-5">
                      {/* Category and Date */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="font-semibold text-blue-500">
                          {news.category}
                        </span>
                        <span>{formatDate(news.createdAt)}</span>
                      </div>
                      <h3 className="text-lg font-semibold">{news.title}</h3>
                      <p className="text-gray-600 line-clamp-3">
                        {news.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PublikasiPage;
