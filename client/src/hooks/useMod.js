import { useState } from "react";

const useMod = () => {
  const [modals, setModals] = useState({
    programAdd: false,
    programEdit: false,
    KemitraanAdd: false,
    KemitraanEdit: false,
    partnerAdd: false,
    partnerEdit: false,
    trashAdd: false,
    trashEdit: false,
    newsAdd: false,
    newsEdit: false,
    testimoniAdd: false,
    testimoniEdit: false,
  });
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenModal = (type, item = null) => {
    setModals((prev) => ({ ...prev, [type]: true }));
    setSelectedItem(item); // Set the selected item (promo or lisensi) for editing if applicable
  };

  const handleCloseModal = (type) => {
    setModals((prev) => ({ ...prev, [type]: false }));
    setSelectedItem(null); // Clear selected item after closing
  };

  return {
    modals,
    selectedItem,
    handleOpenModal,
    handleCloseModal,
  };
};

export default useMod;
