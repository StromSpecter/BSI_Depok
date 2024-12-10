import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import axios from "axios";
import { API_URL } from "../utils/constant";

const AddTestimoniMod = ({ onClose, onTestimonialAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    instansi: "",
    description: "",
    star: 1,
  });
  const [errors, setErrors] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "star") {
      const starValue = Math.max(1, Math.min(5, Number(value))); // Batasi nilai star antara 1 dan 5
      setFormData((prev) => ({
        ...prev,
        [name]: starValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.instansi.trim()) {
      newErrors.instansi = "Instansi is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setLoading(true); // Aktifkan loading
      try {
        // Kirim data ke endpoint
        const response = await axios.post(
          `${API_URL}/testimonials`,
          formData
        );
        console.log("Testimonial submitted:", response.data);
        onTestimonialAdded(response.data);
        setShowNotification(true); // Tampilkan notifikasi
        setTimeout(() => {
          setShowNotification(false); // Sembunyikan notifikasi
          onClose(); // Tutup modal
        }, 2000); // Setelah 2 detik
      } catch (err) {
        console.error("Error submitting testimonial:", err.message);
        alert("Failed to submit testimonial. Please try again.");
      } finally {
        setLoading(false); // Nonaktifkan loading
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between pb-3 mb-4 border-b">
          <h2 className="text-lg font-semibold">Add Testimoni</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <RiCloseFill className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">Instansi</label>
            <input
              type="text"
              name="instansi"
              value={formData.instansi}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {errors.instansi && (
              <p className="text-red-500">{errors.instansi}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">Star (1-5)</label>
            <input
              type="number"
              name="star"
              value={formData.star}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className={`w-full px-4 py-2 text-white rounded-lg ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-primary-500 hover:bg-primary-600"
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
        {/* Notifikasi Popup */}
        {showNotification && (
          <div className="absolute top-0 left-0 w-full p-4 mt-4 text-white bg-green-500 rounded-md shadow-lg">
            <p className="text-center">Testimoni berhasil ditambahkan!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTestimoniMod;
