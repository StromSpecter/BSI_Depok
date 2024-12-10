import { RiCloseFill } from "react-icons/ri";
import { API_FILEURL } from "../utils/constant";

const ViewProgramMod = ({ onClose, program }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between pb-3 mb-4 border-b">
          <h2 className="text-lg font-semibold">Program Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <RiCloseFill className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex flex-row items-end justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {program.title}
              </h3>
              <div className="flex flex-row gap-5">
                <p className="text-sm text-gray-500">{program.author}</p>
                {/* Format tanggal */}
                <p className="text-sm text-gray-500">
                  {formatDate(program.date)}
                </p>
              </div>
            </div>
            <div className="w-10 h-10">
              <img
                src={`${API_FILEURL}/${program.icon}`}
                alt="Icon"
                className="object-cover w-full h-full p-1 rounded-full bg-primary-500"
              />
            </div>
          </div>
          <div>
            {/* Render description sebagai HTML */}
            <p
              className="text-sm text-gray-800"
              dangerouslySetInnerHTML={{ __html: program.description }}
            ></p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <img
              src={`${API_FILEURL}/${program.image1}`}
              alt="Image 1"
              className="object-cover w-full h-32 rounded-md"
            />
            <img
              src={`${API_FILEURL}/${program.image2}`}
              alt="Image 2"
              className="object-cover w-full h-32 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProgramMod;
