import { useEffect, useState } from "react";
import axios from "axios";
import useMod from "../hooks/useMod"; // pastikan path ke useMod benar
import AddNewsMod from "../mods/AddNewsMod";
import EditNewsMod from "../mods/EditNewsMod";
import ViewNewsMod from "../mods/ViewNewsMod";
import { API_FILEURL, API_URL } from "../utils/constant";

const NewssPage = () => {
  const { modals, selectedItem, handleOpenModal, handleCloseModal } = useMod();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk format tanggal
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

  const handleDelete = async (newsId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this news?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/newss/${newsId}`);
      setNews((prevNews) => prevNews.filter((news) => news.id !== newsId));
      alert("News deleted successfully!");
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("Failed to delete the news. Please try again.");
    }
  };

  const handleNewsAdded = (newNews) => {
    setNews((prevNews) => [...prevNews, newNews]);
  };

  const handleNewsUpdated = (updatedNews) => {
    setNews((prevNews) =>
      prevNews.map((news) => (news.id === updatedNews.id ? updatedNews : news))
    );
  };

  return (
    <div className="flex flex-col w-full h-full p-5">
      <div className="flex flex-row items-end justify-between w-full h-fit">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">Newss</p>
          <p className="text-gray-500 ">
            Dashboard / <span className="text-primary-500">Newss</span>
          </p>
        </div>
        <button
          className="px-6 py-2 text-white rounded-lg bg-primary-500 w-fit h-fit"
          onClick={() => handleOpenModal("newsAdd")}
        >
          Add News
        </button>
      </div>

      {/* Handle Loading, Error, and Kemitraan Display */}
      {loading ? (
        <p className="mt-10 text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="mt-10 text-center text-red-500">{error}</p>
      ) : news.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">No news available.</p>
      ) : (
        <div className="grid w-full h-full grid-cols-3 gap-5 mt-5">
          {/* Card */}
          {news.map((news) => (
            <div
              key={news.id}
              className="flex flex-col w-full h-full overflow-hidden bg-white border hover:shadow-lg hover:shadow-blue-100 rounded-3xl"
            >
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
                <p className="text-gray-600 line-clamp-3">{news.description}</p>
                <div className="flex justify-end w-full gap-2 h-fit">
                  <button
                    className="w-full px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-500 hover:bg-primary-600"
                    onClick={() => handleOpenModal("newsEdit", news)}
                  >
                    Edit
                  </button>
                  <button
                    className="w-full px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-500 hover:bg-primary-600"
                    onClick={() => handleOpenModal("newsView", news)}
                  >
                    View
                  </button>
                  <button
                    className="w-full px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-500 hover:bg-primary-600"
                    onClick={() => handleDelete(news.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tampilkan modal sesuai kondisi */}
      {modals.newsAdd && (
        <AddNewsMod
          onClose={() => handleCloseModal("newsAdd")}
          onNewsAdded={handleNewsAdded}
        />
      )}
      {modals.newsEdit && selectedItem && (
        <EditNewsMod
          news={selectedItem}
          onClose={() => handleCloseModal("newsEdit")}
          onNewsUpdated={handleNewsUpdated}
        />
      )}
      {modals.newsView && selectedItem && (
        <ViewNewsMod
          news={selectedItem}
          onClose={() => handleCloseModal("newsView")}
        />
      )}
    </div>
  );
};

export default NewssPage;
