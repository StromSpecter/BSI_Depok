import { useState, useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";

const EditTrashMod = ({ trash, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    icon: null,
    amount: 0,
  });
  const [errors, setErrors] = useState({});
  const [showNotification, setShowNotification] = useState(false);

  // Mengisi form dengan data trash yang dipilih saat modal dibuka
  useEffect(() => {
    if (trash) {
      setFormData({
        title: trash.title || "",
        category: trash.category || "",
        icon: null, // Tidak memuat gambar lama, pengguna harus mengunggah ulang
        amount: trash.amount || 0,
      });
    }
  }, [trash]);

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
    if (formData.amount <= 0) {
      newErrors.amount = "Amount must be a positive number";
    }
    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log("Data submitted:", formData);
      setShowNotification(true); // Tampilkan notifikasi sukses
      setTimeout(() => {
        setShowNotification(false); // Sembunyikan notifikasi
        onClose(); // Tutup modal
      }, 2000); // Setelah 2 detik
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between pb-3 mb-4 border-b">
          <h2 className="text-lg font-semibold">Edit Trash</h2>
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
              className="w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
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

          <div>
            <label
              htmlFor="icon"
              className="block text-sm font-medium text-gray-700"
            >
              Icon
            </label>
            <input
              type="file"
              id="icon"
              name="icon"
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
            {formData.icon && (
              <p className="mt-2 text-sm text-gray-500">
                Selected file: {formData.icon.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
            {errors.amount && <p className="text-red-500">{errors.amount}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full px-4 py-2 text-white rounded-md bg-primary-500 hover:bg-primary-600"
            >
              Save
            </button>
          </div>
        </form>

        {/* Notifikasi Popup */}
        {showNotification && (
          <div className="absolute top-0 left-0 w-full p-4 mt-4 text-white bg-green-500 rounded-md shadow-lg">
            <p className="text-center">Data successfully updated!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditTrashMod;
