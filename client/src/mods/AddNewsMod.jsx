import { useState } from "react";
import axios from "axios";
import { RiCloseFill } from "react-icons/ri";
import { API_URL } from "../utils/constant";

const AddNewsMod = ({ onClose, onNewsAdded }) => {
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
    if (!formData.image) {
      newErrors.image = "Image is required";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setLoading(true);
      const data = new FormData();
      data.append("title", formData.title);
      data.append("image", formData.image);
      data.append("description", formData.description);
      data.append("path", formData.path);
      data.append("category", formData.category);

      try {
        const response = await axios.post(
          `${API_URL}/newss`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Response:", response.data);
        onNewsAdded(response.data);
        setShowNotification(true); // Tampilkan notifikasi sukses
        setTimeout(() => {
          setShowNotification(false); // Sembunyikan notifikasi
          onClose(); // Tutup modal
        }, 2000); // Setelah 2 detik
      } catch (error) {
        setErrors({
          submit: error.response?.data?.message || "Failed to add news",
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
          <h2 className="text-lg font-semibold">Add News</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <RiCloseFill className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">Path</label>
            <input
              type="text"
              name="path"
              value={formData.path}
              onChange={handleInputChange}
              readOnly
              disabled
              className="w-full px-4 py-2 text-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="News">News</option>
              <option value="Activity">Activity</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">{errors.category}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-500">{errors.image}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              className={`w-full px-4 py-2 text-white rounded-md ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary-500 hover:bg-primary-600"
              }`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
        {errors.submit && (
          <p className="mt-4 text-sm text-center text-red-500">
            {errors.submit}
          </p>
        )}
        {/* Notifikasi Popup */}
        {showNotification && (
          <div className="absolute top-0 left-0 w-full p-4 mt-4 text-white bg-green-500 rounded-md shadow-lg">
            <p className="text-center">News berhasil ditambahkan!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNewsMod;
