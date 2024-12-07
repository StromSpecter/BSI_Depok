import { useState, useEffect } from "react";
import axios from "axios";
import { RiCloseFill } from "react-icons/ri";

const EditKemitraanMod = ({ onClose, kemitraan, onKemitraanUpdated }) => {
  const [formData, setFormData] = useState({
    title: "",
    icon: null,
    jumlah: 0,
  });
  const [errors, setErrors] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load data dari `kemitraan` ke state `formData` setiap kali `kemitraan` berubah
  useEffect(() => {
    if (kemitraan) {
      setFormData({
        title: kemitraan.title || "",
        icon: null, // Reset karena icon harus diupload ulang
        jumlah: kemitraan.jumlah || 0,
      });
    }
  }, [kemitraan]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.jumlah || formData.jumlah < 1)
      newErrors.jumlah = "Jumlah must be greater than 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      try {
        setLoading(true);
        const response = await axios.put(
          `http://localhost:5001/api/kemitraans/${kemitraan.id}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Response:", response.data);
        onKemitraanUpdated(response.data); // Panggil callback dengan data kemitraan baru
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
          onClose();
        }, 2000);
      } catch (error) {
        console.error(
          "Error updating kemitraan:",
          error.response || error.message
        );
        setErrors({ general: "Failed to update kemitraan. Please try again." });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between pb-3 mb-4 border-b">
          <h2 className="text-lg font-semibold">Edit Kemitraan</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <RiCloseFill className="w-6 h-6" />
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
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
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {formData.icon && (
              <p className="mt-2 text-sm text-gray-600">
                File uploaded: {formData.icon.name}
              </p>
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
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {errors.jumlah && (
              <p className="text-sm text-red-500">{errors.jumlah}</p>
            )}
          </div>

          <div className="flex flex-row justify-end gap-5">
            <button
              type="button"
              onClick={onClose}
              className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
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

        {showNotification && (
          <div className="absolute top-0 left-0 w-full p-4 mt-4 text-white bg-green-500 rounded-md shadow-lg">
            <p className="text-center">Kemitraan successfully updated!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditKemitraanMod;
