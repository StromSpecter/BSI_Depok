import { useState, useEffect } from "react";
import axios from "axios";
import { RiCloseFill } from "react-icons/ri";
import { API_URL } from "../utils/constant";

const EditPartnerMod = ({ partner, onClose, onPartnerUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mengisi form dengan data partner yang dipilih saat modal dibuka
  useEffect(() => {
    if (partner) {
      setFormData({
        name: partner.name || "",
        image: null, // Tidak memuat gambar lama, pengguna harus mengunggah ulang
      });
    }
  }, [partner]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    return newErrors;
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
          `${API_URL}/partners/${partner.id}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Response:", response.data);
        onPartnerUpdated(response.data); // Panggil callback dengan data partner baru
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
          onClose();
        }, 2000);
      } catch (error) {
        console.error(
          "Failed updating partner:",
          error.response || error.message
        );
        setErrors({
          general: "Failed to update partner. Please try again.",
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
          <h2 className="text-lg font-semibold">Edit Partner</h2>
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
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex flex-row justify-between gap-5">
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
          <div className="absolute top-0 left-0 w-full p-4 mt-4 text-white bg-green-500 rounded-md shadow-lg">
            <p className="text-center">Partner berhasil diperbarui!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPartnerMod;
