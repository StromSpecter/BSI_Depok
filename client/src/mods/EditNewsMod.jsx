import { useState, useEffect } from "react";
import axios from "axios";
import { RiCloseFill } from "react-icons/ri";
import { API_URL } from "../utils/constant";

const EditNewsMod = ({ news, onClose, onNewsUpdated }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
    path: "",
    category: "",
  });
  const [errors, setErrors] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mengisi form dengan data `news` yang dipilih saat modal dibuka
  useEffect(() => {
    if (news) {
      setFormData({
        title: news.title || "",
        image: null, // Gambar baru harus diunggah ulang
        description: news.description || "",
        path: news.path || "",
        category: news.category || "",
      });
    }
  }, [news]);

  const generatePath = (title) => {
    return title.trim().toLowerCase().replace(/\s+/g, "-");
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: files ? files[0] : value,
      };
      if (name === "title") {
        updatedData.path = generatePath(value);
      }
      return updatedData;
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    if (validate()) {
      const fromDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        fromDataToSend.append(key, formData[key]);
      });

      try {
        setLoading(true);
        const response = await axios.put(
          `${API_URL}/newss/${news.id}`,
          fromDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Response:", response.data);
        onNewsUpdated(response.data); // Panggil callback dengan data news baru
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
          onClose();
        }, 2000);
      } catch (error) {
        console.error("Failed updating news:", error.response || error.message);
        setErrors({
          general: "Failed to update news. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between pb-3 mb-4 border-b">
          <h2 className="text-lg font-semibold">Edit News</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <RiCloseFill className="w-6 h-6" />
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
          </div>

          <div>
            <label
              htmlFor="path"
              className="block text-sm font-medium text-gray-700"
            >
              Path
            </label>
            <input
              type="text"
              id="path"
              name="path"
              value={formData.path}
              onChange={handleInputChange}
              disabled
              className="w-full px-4 py-2 text-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            />
            {errors.path && <p className="text-red-500">{errors.path}</p>}
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="news">News</option>
              <option value="activity">Activity</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">{errors.category}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
            {formData.image && (
              <p className="mt-2 text-sm text-gray-500">
                Selected file: {formData.image.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full px-4 py-2 text-white rounded-md bg-primary-500 hover:bg-primary-600"
              disabled={loading}
            >
              {loading ? "Saving..." : "Submit"}
            </button>
          </div>
        </form>

        {/* Notifikasi Popup */}
        {showNotification && (
          <div className="absolute top-0 left-0 w-full p-2 mt-2 text-center text-white bg-green-500 rounded">
            Data successfully updated!
          </div>
        )}
      </div>
    </div>
  );
};

export default EditNewsMod;
