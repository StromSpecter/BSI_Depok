import { useEffect, useState } from "react";
import axios from "axios";
import { API_FILEURL, API_URL } from "../utils/constant";

const TrashPage = () => {
  const [trashData, setTrashData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fungsi untuk memanggil API
    const fetchTrashData = async () => {
      try {
        const response = await axios.get(`${API_URL}/trashs`);
        setTrashData(response.data);
      } catch (error) {
        console.error("Error fetching trash data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrashData();
  }, []);

  // Fungsi untuk memisahkan data berdasarkan kategori
  const groupByCategory = (data) => {
    return data.reduce((acc, item) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    }, {});
  };

  const categorizedTrash = groupByCategory(trashData);

  return (
    <div className="w-full h-full pt-20">
      <section className="w-full h-full gap-2.5 container mx-auto px-5 md:px-0 flex flex-col">
        <p className="text-4xl font-bold text-center text-primary-700">
          Jenis Sampah Yang Diterima BSI Rumah Harum
        </p>
        <p className="text-xl text-center">
          Berikut merupakan jenis/kategori sampah yang diterima oleh BSI Rumah
          Harum
        </p>
      </section>

      {loading ? (
        <p className="text-lg text-center">Loading...</p>
      ) : (
        <section className="container flex flex-col w-full h-full gap-10 px-5 mx-auto md:px-0">
          {/* Render kategori dan item sampah */}
          {Object.entries(categorizedTrash).map(([category, items]) => (
            <div key={category} className="flex flex-col w-full h-full gap-5">
              <p className="text-3xl font-bold text-primary-700">{category}</p>
              <div className="grid w-full h-full grid-cols-1 gap-5 md:grid-cols-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col w-full h-full gap-2.5"
                  >
                    <div className="w-full rounded-md h-60">
                      <img
                        src={`${API_FILEURL}/uploads/${item.image}`}
                        alt="image"
                        className="object-cover w-full h-full rounded-md"
                      />
                    </div>
                    <p className="text-base text-center text-primary-500">
                      {item.title} - {item.amount} kg
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default TrashPage;
