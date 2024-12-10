import { useState, useEffect } from "react";
import axios from "axios";
import { RiCloseFill } from "react-icons/ri";
import { API_URL } from "../utils/constant";

const AddProgramMod = ({ onClose, onProgramAdded }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    path: "",
    icon: null,
    author: "",
    date: "",
    image1: null,
    image2: null,
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("name");
    setFormData((prevData) => ({
      ...prevData,
      author: name || "",
    }));
  }, []);

  const generatePath = (title) => {
    return title.trim().toLowerCase().replace(/\s+/g, "-");
  };

  const handleChange = (e) => {
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

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.icon) newErrors.icon = "Icon is required";
    if (!formData.date) newErrors.date = "Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.image1) newErrors.image1 = "Image 1 is required";
    if (!formData.image2) newErrors.image2 = "Image 2 is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => setStep(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep2()) {
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] instanceof File) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(
        `${API_URL}/programs`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Success:", response.data);
      onProgramAdded(response.data); // Panggil callback dengan data program baru
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting program:", error);

      if (error.response && error.response.data) {
        const backendErrors = error.response.data.errors || {};
        setErrors(backendErrors);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between pb-3 mb-4 border-b">
          <h2 className="text-lg font-semibold">Add Program</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <RiCloseFill className="w-6 h-6" />
          </button>
        </div>

        {step === 1 && (
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
                Path
              </label>
              <input
                type="text"
                name="path"
                value={formData.path}
                readOnly
                disabled
                className="w-full p-2 mt-1 text-gray-500 bg-gray-100 border border-gray-300 rounded-md"
              />
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
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                readOnly
                disabled
                className="w-full p-2 mt-1 text-gray-500 bg-gray-100 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.date && (
                <p className="text-sm text-red-500">{errors.date}</p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="w-full px-4 py-2 text-white rounded-md bg-primary-500 hover:bg-primary-600"
              >
                Next
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image 1
              </label>
              <input
                type="file"
                name="image1"
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {formData.image1 && (
                <p className="mt-2 text-sm text-gray-600">
                  File uploaded: {formData.image1.name}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image 2
              </label>
              <input
                type="file"
                name="image2"
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {formData.image2 && (
                <p className="mt-2 text-sm text-gray-600">
                  File uploaded: {formData.image2.name}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows="4"
              ></textarea>
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>
            <div className="flex flex-row justify-between gap-5">
              <button
                type="button"
                onClick={handleBack}
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full px-4 py-2 text-white rounded-md bg-primary-500 hover:bg-primary-600"
              >
                Submit
              </button>
            </div>
          </form>
        )}

        {showNotification && (
          <div className="absolute top-0 left-0 w-full p-4 mt-4 text-white bg-green-500 rounded-md shadow-lg">
            <p className="text-center">Program successfully added!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProgramMod;
