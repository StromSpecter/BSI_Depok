import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProgramPage = () => {
  const { path } = useParams(); // Ambil parameter path dari URL
  const [programData, setProgramData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        // Fetch all programs untuk mencocokkan path dengan ID
        const response = await axios.get("http://localhost:5001/api/programs");
        const programs = response.data;

        // Cari program berdasarkan path yang aktif
        const matchedProgram = programs.find(
          (program) => program.path === path
        );

        if (matchedProgram) {
          // Fetch detail program berdasarkan ID
          const detailResponse = await axios.get(
            `http://localhost:5001/api/programs/${matchedProgram.id}`
          );
          setProgramData(detailResponse.data);
        } else {
          setError("Program not found");
        }
      } catch (err) {
        console.error("Failed to fetch program data:", err);
        setError("Failed to fetch program data");
      }
    };

    fetchProgramData();
  }, [path]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!programData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full py-20">
      <section className="container grid w-full h-full grid-cols-1 gap-5 px-5 mx-auto md:grid-cols-2 md:px-0">
        <div className="flex flex-col w-full h-full gap-8">
          <h1 className="text-3xl font-bold">{programData.title}</h1>
          <p
            className="text-xl text-justify text-gray-600"
            dangerouslySetInnerHTML={{ __html: programData.description }}
          ></p>
        </div>
        <div className="flex flex-col w-full h-full gap-5 md:relative">
          <div className="top-0 left-0 md:absolute md:w-2/3 md:h-2/3 rounded-3xl">
            <img
              src={`http://localhost:5001/uploads/${programData.image1}`}
              alt=""
              className="object-cover w-full h-[242px] md:h-full rounded-3xl"
            />
          </div>
          <div className="bottom-0 right-0 md:absolute md:w-2/3 md:h-2/3 rounded-3xl">
            <img
              src={`http://localhost:5001/uploads/${programData.image2}`}
              alt=""
              className="object-cover w-full h-[242px] md:h-full rounded-3xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramPage;
