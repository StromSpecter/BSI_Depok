import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import axios from "axios";

const AddTrashMod = ({ onClose, onTrashAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: null,
    amount: 0,
  });
  const [errors, setErrors] = useState({});
  const [showNotification, setShowNotification] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.category.trim()) {
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
      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("image", formData.image);
      data.append("amount", formData.amount);

      try {
        const response = await axios.post(
          "http://localhost:5001/api/trashs",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Response:", response.data);
        onTrashAdded(response.data);
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
          onClose();
        }, 2000);
      } catch (error) {
        console.error("Error submitting data:", error);
        setErrors({ api: "Failed to submit data. Please try again." });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between pb-3 mb-4 border-b">
          <h2 className="text-lg font-semibold">Add Trash</h2>
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
            <label className="text-gray-700">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select Category</option>
              <option value="Organik">Organik</option>
              <option value="Minyak">Minyak</option>
              <option value="Plastik">Plastik</option>
              <option value="Kertas">Kertas</option>
              <option value="Logam">Logam</option>
              <option value="Kaca">Kaca</option>
            </select>
            {errors.category && (
              <p className="text-red-500">{errors.category}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">image</label>
            <input
              type="file"
              name="image"
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, amount: e.target.value }))
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              className="w-full px-4 py-2 text-white rounded-md bg-primary-500 hover:bg-primary-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
        {/* Notifikasi Popup */}
        {showNotification && (
          <div className="absolute top-0 left-0 w-full p-4 mt-4 text-white bg-green-500 rounded-md shadow-lg">
            <p className="text-center">Trash berhasil ditambahkan!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTrashMod;
