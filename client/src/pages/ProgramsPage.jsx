import { useEffect, useState } from "react";
import axios from "axios";
import useMod from "../hooks/useMod"; // Pastikan path ke useMod benar
import AddProgramMod from "../mods/AddProgramMod";
import EditProgramMod from "../mods/EditProgramMod";
import ViewProgramMod from "../mods/ViewProgramMod";

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]); // State untuk menyimpan data dari API
  const { modals, selectedItem, handleOpenModal, handleCloseModal } = useMod();

  // Fungsi untuk mengambil data dari API
  const fetchPrograms = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/programs");
      setPrograms(response.data); // Simpan data ke state
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  // Fungsi untuk menghapus program
  const handleDeleteProgram = async (programId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this program?"
    );
    if (!confirmDelete) return;

    try {
      // Panggil API untuk menghapus program
      await axios.delete(`http://localhost:5001/api/programs/${programId}`);

      // Perbarui state programs setelah program dihapus
      setPrograms((prevPrograms) =>
        prevPrograms.filter((program) => program.id !== programId)
      );
      alert("Program deleted successfully!");
    } catch (error) {
      console.error("Error deleting program:", error);
      alert("Failed to delete the program. Please try again.");
    }
  };

  // Panggil fetchPrograms saat komponen pertama kali dirender
  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleProgramAdded = (newProgram) => {
    // Tambahkan program baru ke state programs
    setPrograms((prevPrograms) => [newProgram, ...prevPrograms]);
  };

  const handleProgramUpdated = (updatedProgram) => {
    // Perbarui program dalam state programs
    setPrograms((prevPrograms) =>
      prevPrograms.map((program) =>
        program.id === updatedProgram.id ? updatedProgram : program
      )
    );
  };

  return (
    <div className="flex flex-col w-full h-full gap-5 p-5">
      {/* Header */}
      <div className="flex flex-row items-end justify-between w-full h-fit">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">Programs</p>
          <p className="text-gray-500">
            Dashboard / <span className="text-primary-500">Programs</span>
          </p>
        </div>
        <button
          className="px-6 py-2 text-white rounded-lg bg-primary-500 w-fit h-fit"
          onClick={() => handleOpenModal("programAdd")}
        >
          Add Program
        </button>
      </div>

      {/* Program Grid */}
      <div className="grid w-full h-full grid-cols-3 gap-5 mt-5">
        {programs.map((program) => (
          <div
            key={program.id} // Bagian ini
            className="w-full transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl"
          >
            {/* Program Image */}
            <div className="relative">
              <img
                src={`http://localhost:5001/uploads/${program.image1}`} // Gambar dari API
                alt={program.title}
                className="object-cover w-full h-40 bg-gray-200 rounded-t-lg"
              />
            </div>

            {/* Program Content */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-700">
                {program.title}
              </h3>
              <p className="text-gray-500 line-clamp-2">
                {program.description}
              </p>
              <div className="flex items-center gap-2 mt-4">
                <button
                  className="w-full px-4 py-2 text-white rounded-lg bg-primary-500"
                  onClick={() => handleOpenModal("programView", program)}
                >
                  View
                </button>
                <button
                  className="w-full px-4 py-2 text-white rounded-lg bg-primary-500"
                  onClick={() => handleOpenModal("programEdit", program)}
                >
                  Edit
                </button>
                <button
                  className="w-full px-4 py-2 text-white rounded-lg bg-primary-500"
                  onClick={() => handleDeleteProgram(program.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {modals.programAdd && (
        <AddProgramMod
          onClose={() => handleCloseModal("programAdd")}
          onProgramAdded={handleProgramAdded}
        />
      )}
      {modals.programEdit && (
        <EditProgramMod
          program={selectedItem}
          onClose={() => handleCloseModal("programEdit")}
          onProgramUpdated={handleProgramUpdated}
        />
      )}
      {modals.programView && (
        <ViewProgramMod
          program={selectedItem}
          onClose={() => handleCloseModal("programView")}
        />
      )}
    </div>
  );
};

export default ProgramsPage;
