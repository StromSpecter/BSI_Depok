import { useState } from "react";
import axios from "axios";
import { RiCloseFill } from "react-icons/ri";

const AddKemitraanMod = ({ onClose, onKemitraanAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    icon: null,
    jumlah: 0,
  });
  const [errors, setErrors] = useState({});
  const [showNotification, setShowNotification] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Reset error saat ada perubahan
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.icon) newErrors.icon = "Icon is required";
    if (!formData.jumlah || formData.jumlah <= 0)
      newErrors.jumlah = "Jumlah must be greater than 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("icon", formData.icon);
      formDataToSend.append("jumlah", formData.jumlah);

      const response = await axios.post(
        "http://localhost:5001/api/kemitraans",
        formDataToSend
      );
      console.log("Success:", response.data);
      onKemitraanAdded(response.data); // Callback setelah data berhasil ditambahkan
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between pb-3 mb-4 border-b">
          <h2 className="text-lg font-semibold">Add Kemitraan</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <RiCloseFill className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Icon
            </label>
            <input
              type="file"
              name="icon"
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {formData.icon && (
              <p className="mt-2 text-sm text-gray-600">
                File uploaded: {formData.icon.name}
              </p>
            )}
            {errors.icon && (
              <p className="text-sm text-red-500">{errors.icon}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Jumlah
            </label>
            <input
              type="number"
              name="jumlah"
              value={formData.jumlah}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {errors.jumlah && (
              <p className="text-sm text-red-500">{errors.jumlah}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white rounded-md bg-primary-500 hover:bg-primary-600"
            >
              Submit
            </button>
          </div>
        </form>

        {showNotification && (
          <div className="absolute top-0 left-0 w-full p-4 mt-4 text-white bg-green-500 rounded-md shadow-lg">
            <p className="text-center">Kemitraan successfully added!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddKemitraanMod;
