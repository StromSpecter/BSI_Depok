import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_FILEURL, API_URL } from "../utils/constant";

const PublikasiDetailPage = () => {
  const { path } = useParams(); // Ambil parameter path dari URL
  const [publikasiData, setPublikasiData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublikasiData = async () => {
      try {

        // Fetch semua publikasi
        const response = await axios.get(`${API_URL}/newss`);
        const publikasiList = response.data;

        // Cari publikasi yang cocok berdasarkan path
        const matchedPublikasi = publikasiList.find(
          (news) => news.path === path
        );

        if (matchedPublikasi) {
          // Fetch detail publikasi
          const detailResponse = await axios.get(
            `${API_URL}/newss/${matchedPublikasi.id}`
          );
          setPublikasiData(detailResponse.data);
        } else {
          console.error("Publikasi tidak ditemukan berdasarkan path:", path);
          setError("Publikasi tidak ditemukan");
        }
      } catch (err) {
        console.error("Failed to fetch publikasi data:", err);
        setError("Gagal memuat data publikasi");
      }
    };

    fetchPublikasiData();
  }, [path]);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!publikasiData) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="w-full h-full py-20">
      <section className="container flex flex-col w-full h-full gap-5 px-5 mx-auto md:px-0">
          <h1 className="text-3xl font-bold text-center">{publikasiData.title}</h1>
        <div className="w-full h-80">
          <img
            src={`${API_FILEURL}/${publikasiData.image}`}
            alt="Publikasi Image 1"
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div className="flex flex-col w-full h-full gap-8">
          <p
            className="text-xl text-justify text-gray-600"
            dangerouslySetInnerHTML={{
              __html: publikasiData.description,
            }}
          ></p>
        </div>
      </section>
    </div>
  );
};

export default PublikasiDetailPage;
