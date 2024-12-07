import { useEffect, useState } from "react";
import { RiStarFill } from "react-icons/ri";
import axios from "axios";
import useMod from "../hooks/useMod";
import AddTestimoniMod from "../mods/AddTestimoniMod";
import EditTestimoniMod from "../mods/EditTestimoniMod";

const TestimonialsPage = () => {
  const { modals, selectedItem, handleOpenModal, handleCloseModal } = useMod();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5001/api/testimonials"
        );
        setTestimonials(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch testimonials");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleTestimonialAdded = (newTestimonial) => {
    // Tambahkan testimonial baru ke state testimonials
    setTestimonials((prevTestimonials) => [
      ...prevTestimonials,
      newTestimonial,
    ]);
  };

  const handleDeleteTestimonial = async (testimonialId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this testimonial?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5001/api/testimonials/${testimonialId}`
      );
      setTestimonials((prevTestimonials) =>
        prevTestimonials.filter(
          (testimonial) => testimonial.id !== testimonialId
        )
      );
    } catch (err) {
      setError(err.message || "Failed to delete testimonial");
    }
  };

  const handleTestimonialUpdated = (updatedTestimonial) => {
    setTestimonials((prevTestimonials) =>
      prevTestimonials.map((testimonial) =>
        testimonial.id === updatedTestimonial.id
          ? updatedTestimonial
          : testimonial
      )
    );
  };

  return (
    <div className="flex flex-col w-full h-full p-5">
      <div className="flex flex-row items-end justify-between w-full h-fit">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">Testimonials</p>
          <p className="text-gray-500 ">
            Dashboard / <span className="text-primary-500">Testimonials</span>
          </p>
        </div>
        <button
          className="px-6 py-2 text-white rounded-lg bg-primary-500 w-fit h-fit"
          onClick={() => handleOpenModal("testimonialAdd")}
        >
          Add Testimonial
        </button>
      </div>

      {/* Handle Loading, Error, and Testimonials Display */}
      {loading ? (
        <p className="mt-10 text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="mt-10 text-center text-red-500">{error}</p>
      ) : testimonials.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">
          No testimonials available.
        </p>
      ) : (
        <div className="grid w-full h-full grid-cols-3 gap-5 mt-5">
          {/* card */}
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="w-full h-full p-5 transition-transform bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-row items-start justify-between w-full h-fit">
                  <div>
                    <p className="text-lg font-semibold">{testimonial.name}</p>
                    <p className="font-medium">{testimonial.instansi}</p>
                  </div>
                  <div className="flex">
                    {Array.from({ length: testimonial.star }).map(
                      (_, index) => (
                        <RiStarFill key={index} className="text-yellow-500" />
                      )
                    )}
                  </div>
                </div>
                <p className="text-gray-500">{testimonial.description}</p>
                <div className="flex justify-end w-full h-full gap-2 mt-4">
                  <button
                    className="w-full px-4 py-2 text-white rounded-lg bg-primary-500"
                    onClick={() =>
                      handleOpenModal("testimonialEdit", testimonial)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="w-full px-4 py-2 text-white rounded-lg bg-primary-500"
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {modals.testimonialAdd && (
        <AddTestimoniMod
          onClose={() => handleCloseModal("testimonialAdd")}
          onTestimonialAdded={handleTestimonialAdded}
        />
      )}
      {modals.testimonialEdit && selectedItem && (
        <EditTestimoniMod
          testimonial={selectedItem}
          onClose={() => handleCloseModal("testimonialEdit")}
          onTestimonialUpdated={handleTestimonialUpdated}
        />
      )}
    </div>
  );
};

export default TestimonialsPage;
