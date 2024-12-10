import { useEffect, useState } from "react";
import axios from "axios";
import useMod from "../hooks/useMod"; // pastikan path ke useMod benar
import AddTrashMod from "../mods/AddTrashMod";
import EditTrashMod from "../mods/EditTrashMod";
import { API_FILEURL, API_URL } from "../utils/constant";

const TrashsPage = () => {
  const { modals, selectedItem, handleOpenModal, handleCloseModal } = useMod();
  const [trashs, setTrashs] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trashs from API
  useEffect(() => {
    const fetchTrashs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_URL}/trashs`);
        setTrashs(response.data);
      } catch (error) {
        setError(error.message || "Failed to fetch trashs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrashs();
  }, []);

  const handleTrashAdded = (newTrash) => {
    setTrashs((prevTrashs) => [...prevTrashs, newTrash]);
  };

  const handleTrashUpdated = (updatedTrash) => {
    setTrashs((prevTrashs) =>
      prevTrashs.map((trash) =>
        trash.id === updatedTrash.id ? updatedTrash : trash
      )
    );
  };

  const handletrashDeleted = async (trashId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trash?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/trashs/${trashId}`);
      setTrashs((prevTrashs) =>
        prevTrashs.filter((trash) => trash.id !== trashId)
      );
    } catch (error) {
      setError(error.message || "Failed to delete trash");
    }
  };

  // Mengelompokkan data berdasarkan kategori
  const groupedTrashs = Object.values(
    trashs.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = {
          category: item.category,
          amount: 0,
        };
      }
      acc[item.category].amount += item.amount;
      return acc;
    }, {})
  );

  return (
    <div className="flex flex-col w-full h-full p-5">
      <div className="flex flex-row items-end justify-between w-full h-fit">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">Trashs</p>
          <p className="text-gray-500 ">
            Dashboard / <span className="text-primary-500">Trashs</span>
          </p>
        </div>
        <button
          className="px-6 py-2 text-white rounded-lg bg-primary-500 w-fit h-fit"
          onClick={() => handleOpenModal("trashAdd")}
        >
          Add Trash
        </button>
      </div>

      <div className="grid w-full h-full grid-cols-6 gap-5 mt-5">
        {/* Card category */}
        {groupedTrashs.map((trash) => (
          <div
            key={trash.category} // Gunakan category sebagai key
            className="flex flex-col items-center justify-center w-full h-40 text-white rounded-md bg-primary-500"
          >
            <p className="text-xl font-semibold">{trash.category}</p>
            <p className="text-lg font-light">{trash.amount}</p>
          </div>
        ))}
      </div>

      {/* Handle Loading, Error, and Trashs Display */}
      {loading ? (
        <p className="mt-10 text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="mt-10 text-center text-red-500">{error}</p>
      ) : trashs.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">No trashs found</p>
      ) : (
        <div className="grid w-full h-full grid-cols-3 gap-5 mt-5">
          {/* Card trash */}
          {trashs.map((trash) => (
            <div
              key={trash.id}
              className="flex flex-col w-full h-full p-5 transition-shadow duration-300 bg-white border-gray-200 rounded-lg shadow-lg hover:shadow-xl"
            >
              <div className="w-full h-40">
                <img
                  src={`${API_FILEURL}/${trash.image}`}
                  alt=""
                  className="object-cover w-full h-full bg-red-500 rounded-3xl"
                />
              </div>
              <div className="flex flex-row items-start justify-between w-full mt-4 h-fit">
                <div>
                  <p className="text-lg font-semibold">{trash.title}</p>
                  <p className="text-gray-500">{trash.category}</p>
                </div>
                <div className="px-6 py-2 bg-blue-500 rounded-full w-fit h-fit">
                  <p className="text-white">{trash.amount}</p>
                </div>
              </div>
              <div className="flex justify-end w-full gap-2 mt-4 h-fit">
                <button
                  className="w-full px-4 py-1 text-sm font-semibold text-white rounded-md bg-primary-500 hover:bg-primary-600"
                  onClick={() => handleOpenModal("trashEdit", trash)}
                >
                  Edit
                </button>
                <button
                  className="w-full px-4 py-1 text-sm font-semibold text-white rounded-md bg-primary-500 hover:bg-primary-600"
                  onClick={() => handletrashDeleted(trash.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tampilkan modal sesuai kondisi */}
      {modals.trashAdd && (
        <AddTrashMod
          onClose={() => handleCloseModal("trashAdd")}
          onTrashAdded={handleTrashAdded}
        />
      )}
      {modals.trashEdit && selectedItem && (
        <EditTrashMod
          trash={selectedItem}
          onClose={() => handleCloseModal("trashEdit")}
          onTrashUpdated={handleTrashUpdated}
        />
      )}
    </div>
  );
};

export default TrashsPage;
