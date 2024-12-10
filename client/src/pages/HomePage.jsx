import {
  RiArrowRightUpLine,
  RiArrowRightCircleFill,
  RiStarFill,
  RiInkBottleFill,
  RiOilFill,
} from "react-icons/ri";
import banner from "../assets/imgs/landing/banner.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/logo.svg";
import { FaGlassMartini, FaLeaf } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { API_URL, API_FILEURL } from "../utils/constant";

const HomePage = () => {
  const [programs, setPrograms] = useState([]);
  const [kemitraans, setKemitraans] = useState([]);
  const [testimonis, setTestimonis] = useState([]);
  const [partners, setPartners] = useState([]);
  const [trashs, setTrashs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get(`${API_URL}/programs`);
        setPrograms(response.data); // Asumsikan API mengembalikan array program
      } catch (err) {
        console.error("Failed to fetch programs:", err);
        setError("Gagal memuat program.");
      }
    };

    fetchPrograms();
  }, []);

  useEffect(() => {
    const fetchKemitraans = async () => {
      try {
        const response = await axios.get(`${API_URL}/kemitraans`);
        setKemitraans(response.data); // Asumsikan API mengembalikan array kemitraan
      } catch (err) {
        console.error("Failed to fetch kemitraans:", err);
        setError("Gagal memuat kemitraan.");
      }
    };

    fetchKemitraans();
  }, []);

  useEffect(() => {
    const fetchTestimonis = async () => {
      try {
        const response = await axios.get(`${API_URL}/testimonials`);
        setTestimonis(response.data); // Asumsikan API mengembalikan array testimoni
      } catch (err) {
        console.error("Failed to fetch testimoni:", err);
        setError("Gagal memuat testimoni.");
      }
    };

    fetchTestimonis();
  }, []);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get(`${API_URL}/partners`);
        setPartners(response.data); // Asumsikan API mengembalikan array partner
      } catch (err) {
        console.error("Failed to fetch partners:", err);
        setError("Gagal memuat partner.");
      }
    };

    fetchPartners();
  }, []);

  useEffect(() => {
    const fetchTrashs = async () => {
      try {
        const response = await axios.get(`${API_URL}/trashs`);
        setTrashs(response.data); // Asumsikan API mengembalikan array trash
      } catch (err) {
        console.error("Failed to fetch trashs:", err);
        setError("Gagal memuat trash.");
      }
    };

    fetchTrashs();
  }, []);

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
    <div className="flex flex-col gap-20">
      {/* Banner Section */}
      <section
        className="flex flex-col items-center justify-center w-full h-screen bg-center bg-repeat bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="flex flex-col items-center p-5 bg-white rounded-3xl">
          <p className="text-3xl font-bold text-primary-600">BSI RUMAH HARUM</p>
          <p className="text-gray-500">- Depok -</p>
        </div>
      </section>

      {/* Program Section */}
      <section className="container flex flex-col items-center justify-center w-full h-full gap-10 px-5 mx-auto md:px-0">
        <p className="text-5xl font-bold text-primary-800">Program</p>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid w-full h-full grid-cols-1 gap-5 md:grid-cols-3">
          {programs.map((program) => (
            <div
              key={program.id}
              className={`w-full h-full p-5 rounded-3xl border bg-primary-500 text-white`}
            >
              <div className="flex flex-row items-center justify-between">
                {/* Placeholder Icon */}
                <div className="w-20 h-20">
                  <img
                    src={`${API_FILEURL}/${program.icon}`}
                    alt={program.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <a
                  href={`/program/${program.path}`}
                  className={`w-10 h-10 border-2 rounded-full border-white text-white `}
                >
                  <RiArrowRightUpLine className="w-full h-full" />
                </a>
              </div>
              {/* Program Title */}
              <p className={`py-5 text-2xl font-bold line-clamp-2 text-white`}>
                {program.title}
              </p>
              {/* Program Description */}
              <p className={` line-clamp-2 text-white`}>
                {program.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="container grid grid-cols-1 px-5 mx-auto md:grid-cols-2 md:px-0">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="w-32 h-32">
            <img src={logo} alt="logo" className="object-cover w-full h-full" />
          </div>
          <p className="text-lg font-light text-primary-500">
            Bank Sampah Induk
          </p>
          <p className="text-4xl font-bold text-primary-600">Rumah Harum</p>
        </div>
        <div className="flex flex-col w-full h-full">
          <p className="hidden text-3xl text-red-700 md:flex">
            Bank Sampah Induk
          </p>
          <p className="hidden text-5xl font-bold text-primary-700 md:flex">
            Rumah Harum
          </p>
          <p className="mt-1 text-xl text-gray-400">
            Bank Sampah Induk Rumah Harum berdiri pada tahun 2013 hingga
            sekarang. Kami memiliki 105 titik Bank Sampah Unit yang tersebar di
            Wilayah Jabodetabek, khususnya Wilayah Depok.
          </p>
          <div className="flex flex-col gap-1 mt-5">
            <p className="text-2xl font-bold text-primary-700">
              Berpengalaman selama 10 tahun
            </p>
            <p className="text-2xl font-bold text-primary-700">
              Konsep zero waste
            </p>
          </div>
          <button className="flex flex-row items-center justify-between gap-20 w-fit h-fit py-2.5 px-5 mt-5 bg-primary-700 rounded-lg">
            <p className="text-white">Selengkapnya</p>
            <div className="w-4 h-4 rounded-full">
              <RiArrowRightCircleFill className="w-full h-full text-white" />
            </div>
          </button>
        </div>
      </section>

      {/* Kemitraan Section */}
      <section className="container flex flex-col items-center justify-center gap-10 px-5 mx-auto md:px-0">
        <p className="text-5xl font-bold text-primary-800">Kemitraan</p>
        <div className="grid w-full h-full grid-cols-1 gap-10 md:grid-cols-4">
          {kemitraans.map((kemitraan) => (
            <div
              key={kemitraan.id}
              className="flex flex-col items-center justify-center w-full gap-5 p-5 shadow-lg rounded-3xl bg-primary-500"
            >
              <div className="w-20 h-20">
                <img
                  src={`${API_FILEURL}/${kemitraan.icon}`}
                  alt="icon"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col items-center justify-center w-full h-full">
                <p className="text-2xl font-bold text-primary-200">
                  {kemitraan.jumlah}
                </p>
                <p className="text-2xl font-bold text-white">
                  {kemitraan.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container flex flex-col items-center justify-center gap-10 px-5 mx-auto md:px-0">
        <p className="text-5xl font-bold text-center text-primary-800">
          Sampah Terkumpul
        </p>
        <div className="flex flex-col items-center justify-center w-full h-full gap-5 md:gap-10 md:flex-row">
          {/* Card category */}
          {groupedTrashs.map((trash) => (
            <div
              key={trash.category} // Gunakan category sebagai key
              className="flex flex-col items-center justify-center w-full h-40 text-white md:w-60 rounded-3xl bg-primary-500"
            >
              {/* Tampilkan ikon berdasarkan kategori */}
              {trash.category === "Organik" && (
                <FaLeaf className="mb-2 text-3xl" />
              )}
              {trash.category === "Plastik" && (
                <RiInkBottleFill className="mb-2 text-3xl" />
              )}
              {trash.category === "Minyak" && (
                <RiOilFill className="mb-2 text-3xl" />
              )}
              {trash.category === "Kertas" && (
                <IoIosPaper className="mb-2 text-3xl" />
              )}
              {trash.category === "Logam" && (
                <IoSettings className="mb-2 text-3xl" />
              )}
              {trash.category === "Kaca" && (
                <FaGlassMartini className="mb-2 text-3xl" />
              )}

              <p className="text-xl font-semibold">{trash.category}</p>
              <p className="text-lg font-light">{trash.amount}</p>
            </div>
          ))}
        </div>
        <a href="/sampah">
          <div className="flex flex-row items-center justify-center w-full h-full px-5 py-2 text-white bg-primary-500 rounded-3xl">
            <p className="text-xl font-semibold">Lihat Semua</p>
          </div>
        </a>
      </section>

      {/* Testimoni Section */}
      <section className="w-full h-full py-20 bg-primary-700">
        <div className="container flex flex-col items-center justify-center gap-10 px-5 mx-auto md:px-0">
          <p className="text-5xl font-bold text-white">Testimoni</p>
          <div className="flex flex-row justify-between w-full h-full gap-10 overflow-x-auto">
            {testimonis.map((testimoni) => (
              <div
                key={testimoni.id}
                className="flex flex-col h-full p-5 bg-white min-w-[350px] max-w-[350px] rounded-3xl"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row items-start justify-between w-full h-fit">
                    <div>
                      <p className="text-lg font-semibold">{testimoni.name}</p>
                      <p className="font-medium">{testimoni.instansi}</p>
                    </div>
                    <div className="flex">
                      {Array.from({ length: testimoni.star }).map(
                        (_, index) => (
                          <RiStarFill key={index} className="text-yellow-500" />
                        )
                      )}
                    </div>
                  </div>
                  <p className="text-gray-500">{testimoni.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section className="container grid w-full h-full grid-cols-6 gap-5 px-5 mx-auto md:gap-10 md:px-0">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="flex items-center justify-center w-full h-full"
          >
            <img
              src={`${API_FILEURL}/${partner.image}`}
              alt="partner"
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
