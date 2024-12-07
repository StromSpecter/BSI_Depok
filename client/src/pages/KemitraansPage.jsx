import { useState, useEffect } from "react";
import axios from "axios";
import useMod from "../hooks/useMod"; // Pastikan path ke useMod benar
import AddKemitraanMod from "../mods/AddKemitraanMod";
import EditKemitraanMod from "../mods/EditKemitraanMod";

const KemitraansPage = () => {
  const { modals, selectedItem, handleOpenModal, handleCloseModal } = useMod();
  const [kemitraans, setKemitraans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data menggunakan Axios
  useEffect(() => {
    const fetchKemitraans = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5001/api/kemitraans"
        );
        setKemitraans(response.data);
      } catch (error) {
        setError(error.message || "Failed to fetch kemitraans");
      } finally {
        setLoading(false);
      }
    };

    fetchKemitraans();
  }, []);

  const handleDelete = async (kemitraanId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this kemitraan?"
    );
    if (!confirmDelete) return;

    try {
      // Panggil API untuk menghapus kemitraan
      await axios.delete(`http://localhost:5001/api/kemitraans/${kemitraanId}`);

      // Perbarui state kemitraans setelah kemitraan dihapus
      setKemitraans((prevKemitraans) =>
        prevKemitraans.filter((kemitraan) => kemitraan.id !== kemitraanId)
      );
      alert("Kemitraan deleted successfully!");
    } catch (error) {
      console.error("Error deleting kemitraan:", error);
      alert("Failed to delete the kemitraan. Please try again.");
    }
  };

  const handleKemitraanAdded = (newKemitraan) => {
    setKemitraans((prevKemitraans) => [newKemitraan, ...prevKemitraans]);
  };

  const handleKemitraanUpdated = (updatedKemitraan) => {
    setKemitraans((prevKemitraans) =>
      prevKemitraans.map((kemitraan) =>
        kemitraan.id === updatedKemitraan.id ? updatedKemitraan : kemitraan
      )
    );
  };

  return (
    <div className="flex flex-col w-full h-full p-5">
      <div className="flex flex-row items-end justify-between w-full mb-5 h-fit">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">Kemitraans</p>
          <p className="text-gray-500">
            Dashboard / <span className="text-primary-500">Kemitraans</span>
          </p>
        </div>
        <button
          className="px-6 py-2 text-white rounded-lg bg-primary-500 w-fit h-fit"
          onClick={() => handleOpenModal("kemitraanAdd")}
        >
          Add Kemitraans
        </button>
      </div>

      {/* Handle Loading, Error, and Kemitraans Display */}
      {loading ? (
        <p className="mt-10 text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="mt-10 text-center text-red-500">{error}</p>
      ) : kemitraans.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">
          No kemitraans available.
        </p>
      ) : (
        <div className="grid w-full h-full grid-cols-3 gap-5 mt-5">
          {/* card */}
          {kemitraans.map((kemitraan) => (
            <div
              key={kemitraan.id}
              className="relative w-full h-full p-5 transition-transform bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              <div className="flex flex-col items-center justify-center gap-5">
                {/* Icon */}
                <div className="flex items-center justify-center w-20 h-20 text-2xl text-white rounded-full bg-primary-500">
                  <img
                    src={`http://localhost:5001/uploads/${kemitraan.icon}`}
                    alt="Icon"
                    className="w-full h-full p-4"
                  />
                </div>
                {/* Info */}
                <div className="flex flex-col items-center justify-center gap-2.5">
                  <p className="text-3xl font-semibold">{kemitraan.title}</p>
                  <p className="text-xl font-medium text-gray-500">
                    {kemitraan.jumlah}
                  </p>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex justify-between w-full gap-5 px-5 mt-4">
                <button
                  className="w-full px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-500 hover:bg-primary-600"
                  onClick={() => handleOpenModal("kemitraanEdit", kemitraan)}
                >
                  Edit
                </button>
                <button
                  className="w-full px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-500 hover:bg-primary-600"
                  onClick={() => handleDelete(kemitraan.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {modals.kemitraanAdd && (
        <AddKemitraanMod
          onClose={() => handleCloseModal("kemitraanAdd")}
          onKemitraanAdded={handleKemitraanAdded}
        />
      )}
      {modals.kemitraanEdit && (
        <EditKemitraanMod
          onClose={() => handleCloseModal("kemitraanEdit")}
          kemitraan={selectedItem}
          onKemitraanUpdated={handleKemitraanUpdated}
        />
      )}
    </div>
  );
};

export default KemitraansPage;
