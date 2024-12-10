import { RiCloseFill } from "react-icons/ri";
import { API_FILEURL } from "../utils/constant";

const ViewNewsMod = ({ onClose, news }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between pb-3 mb-4 border-b">
          <h2 className="text-lg font-semibold">News Details</h2>
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
                {news.title}
              </h3>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-800">{news.description}</p>
          </div>
          <div className="w-full h-full">
            <img
              src={`${API_FILEURL}/${news.image}`}
              alt="Image 1"
              className="object-cover w-full h-32 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewNewsMod;
