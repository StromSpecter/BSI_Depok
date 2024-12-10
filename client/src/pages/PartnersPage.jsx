import { useEffect, useState } from "react";
import axios from "axios";
import useMod from "../hooks/useMod"; // pastikan path ke useMod benar
import AddPartnerMod from "../mods/AddPartnerMod";
import EditPartnerMod from "../mods/EditPartnerMod";
import { API_FILEURL, API_URL } from "../utils/constant";

const PartnersPage = () => {
  const { modals, selectedItem, handleOpenModal, handleCloseModal } = useMod();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data menggunakan Axios
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/partners`);
        setPartners(response.data);
      } catch (error) {
        setError(error.message || "Failed to fetch partners");
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const handlePartnerAdded = (newPartner) => {
    // Tambahkan partner baru ke state partners
    setPartners((prevPartners) => [...prevPartners, newPartner]);
  };

  const handlePartnerUpdated = (updatedPartner) => {
    // Update partner di state partners
    setPartners((prevPartners) =>
      prevPartners.map((partner) =>
        partner.id === updatedPartner.id ? updatedPartner : partner
      )
    );
  };

  const handleDeletePartner = async (partnerId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this partner?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/partners/${partnerId}`);
        setPartners((prevPartners) =>
          prevPartners.filter((partner) => partner.id !== partnerId)
        );
      } catch (error) {
        setError(error.message || "Failed to delete partner");
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-5">
      <div className="flex flex-row items-end justify-between w-full h-fit">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">Partners</p>
          <p className="text-gray-500 ">
            Dashboard / <span className="text-primary-500">Partners</span>
          </p>
        </div>
        <button
          className="px-6 py-2 text-white rounded-lg bg-primary-500 w-fit h-fit"
          onClick={() => handleOpenModal("partnerAdd")}
        >
          Add Partner
        </button>
      </div>

      {/* Handle Loading, Error, and Partners Display */}
      {loading ? (
        <p className="mt-10 text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="mt-10 text-center text-red-500">{error}</p>
      ) : partners.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">No partners found</p>
      ) : (
        <div className="grid w-full h-full grid-cols-3 gap-5 mt-5">
          {/* Card */}
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="w-full h-full p-5 transition-shadow duration-300 bg-white border-gray-200 rounded-lg shadow-lg hover:shadow-xl"
            >
              <div className="flex flex-col gap-4">
                <p className="text-lg font-semibold">{partner.name}</p>
                <div className="flex flex-row items-center justify-center w-full h-40">
                  <img
                    src={`${API_FILEURL}/${partner.image}`}
                    alt={partner.name}
                    className="object-contain w-40 h-40"
                  />
                </div>
                <div className="flex justify-end w-full h-full gap-2">
                  <button
                    onClick={() => handleOpenModal("partnerEdit", partner)}
                    className="w-full px-4 py-2 text-white rounded-md bg-primary-500 hover:bg-primary-600"
                  >
                    Edit
                  </button>
                  <button
                    className="w-full px-4 py-2 text-white rounded-md bg-primary-500 hover:bg-primary-600"
                    onClick={() => handleDeletePartner(partner.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tampilkan modals sesuai kondisi */}
      {modals.partnerAdd && (
        <AddPartnerMod
          onClose={() => handleCloseModal("partnerAdd")}
          onPartnerAdded={handlePartnerAdded}
        />
      )}
      {modals.partnerEdit && selectedItem && (
        <EditPartnerMod
          partner={selectedItem}
          onClose={() => handleCloseModal("partnerEdit")}
          onPartnerUpdated={handlePartnerUpdated}
        />
      )}
    </div>
  );
};

export default PartnersPage;
