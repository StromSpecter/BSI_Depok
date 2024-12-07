import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import axios from "axios";

const AddPartnerMod = ({ onClose, onPartnerAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
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
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.image) {
      newErrors.image = "Image is required";
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
      data.append("name", formData.name);
      data.append("image", formData.image);

      try {
        const response = await axios.post(
          "http://localhost:5001/api/partners",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Response:", response.data);
        onPartnerAdded(response.data);
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
          <h2 className="text-lg font-semibold">Add Partner</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <RiCloseFill size={24} />
          </button>
        </div>
        <div onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
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
            {errors.image && (
              <p className="mt-1 text-sm text-red-500">{errors.image}</p>
            )}
          </div>
          {errors.api && (
            <p className="mt-2 text-sm text-red-500">{errors.api}</p>
          )}
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full px-4 py-2 text-white rounded-md bg-primary-500 hover:bg-primary-600"
            >
              Submit
            </button>
          </div>
        </div>
        {showNotification && (
          <div className="absolute top-0 left-0 w-full p-4 mt-4 text-white bg-green-500 rounded-md shadow-lg">
            Partner added successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPartnerMod;
