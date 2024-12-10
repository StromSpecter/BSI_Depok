import banner from "../assets/imgs/landing/Bank Sampah Project Group.svg";
import { FaMedal, FaRecycle, FaTrophy, FaAward } from "react-icons/fa";
import { HiHomeModern } from "react-icons/hi2";
import banner1 from "../assets/imgs/landing/Rectangle 37.svg";
import banner2 from "../assets/imgs/landing/Rectangle 131.svg";

const AboutPage = () => {
  return (
    <div className="flex flex-col w-full h-full gap-20 pt-20">
      <section className="container grid w-full h-full grid-cols-1 gap-5 px-5 mx-auto md:grid-cols-2 md:px-0">
        <div className="flex flex-col w-full h-full gap-8">
          <p className="text-2xl text-primary-900">Tentang BSI Rumah Harum</p>
          <h1 className="text-3xl font-bold">
            Memberi Kehidupan Baru Untuk Barang Bekas
          </h1>
          <p className="text-xl text-justify text-gray-600">
            Bank Sampah Induk Rumah Harum berdiri pada tahun 2013 hingga
            sekarang. Dibentuknya bank sampah ini dimulai dari kepedulian kami
            tentang masalah lingkungan khusus nya masalah sampah dan limbah di
            kota depok yang seakan akan tidak pernah ada penyelesaian. Awalnya
            Bank Sampah Induk Rumah Harum hanya memiliki 1 titik pengumpulan
            sampah atau Bank Sampah Unit. Namun, saat ini kami telah memiliki
            sekitar 105 titik Bank Sampah Unit.
            <br />
            <br /> Bank sampah yang kami kelola berfokus pada konsep zero waste.
            BSI Rumah Harum memiliki beberapa program yang bertujuan untuk
            mengubah sampah hari ini menjadi bahan baku di masa depan. Kami
            memberikan kehidupan baru pada bahan bekas. Kami berkomitmen untuk
            bersinergi dengan program lingkungan pemerintah dan terus
            mengedukasi masyarakat tentang cara mengelola sampah selama hampir
            10 tahun.
          </p>
        </div>
        <div className="flex flex-col w-full h-full gap-5 md:relative">
          <div className="top-0 left-0 md:absolute md:w-2/3 md:h-2/3 rounded-3xl">
            <img
              src={banner1}
              alt="banner"
              className="object-cover w-full h-[242px] md:h-full rounded-3xl bg-red-500"
            />
          </div>
          <div className="bottom-0 right-0 md:absolute md:w-2/3 md:h-2/3 rounded-3xl">
            <img
              src={banner2}
              alt="banner"
              className="object-cover w-full h-[242px] md:h-full rounded-3xl bg-blue-500"
            />
          </div>
        </div>
      </section>

      <section
        className="w-full h-full px-40 py-20 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="grid w-full h-full grid-cols-1 gap-10 md:grid-cols-3">
          <div className="flex flex-col items-center justify-center w-full h-full gap-5">
            <FaMedal className="w-20 h-20 text-primary-300" />
            <div>
              <p className="text-5xl font-bold text-center text-white">
                {">"} 10
              </p>
              <p className="text-2xl text-center text-white">Pengalaman</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full gap-5">
            <HiHomeModern className="w-20 h-20 text-primary-300" />
            <div>
              <p className="text-5xl font-bold text-center text-white">
                {">"}105
              </p>
              <p className="text-2xl text-center text-white">
                Bank Sampah Unit
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full gap-5">
            <FaRecycle className="w-20 h-20 text-primary-300" />
            <div>
              <p className="text-5xl font-bold text-center text-white">
                0 Waste
              </p>
              <p className="text-2xl text-center text-white">
                Konsep {"'"} Zero Waste {"'"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full h-full px-5 md:px-0">
        <div className="container flex flex-col w-full h-full gap-20 p-5 py-20 mx-auto border rounded-3xl">
          <p className="text-4xl font-bold text-center text-primary-700">
            Penghargaan
          </p>
          <div className="grid w-full h-full grid-cols-1 gap-10 md:grid-cols-2">
            <div className="flex flex-col items-center justify-center w-full h-full gap-2.5">
              <FaTrophy className="w-20 h-20 text-primary-300" />
              <p className="text-xl font-bold text-center text-primary-400">
                Anugrah Raksa Persada
              </p>
              <p className="text-xl text-center text-primary-700">
                Dari Dinas Lingkungan Hidup Provinsi Jawa Barat
              </p>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full gap-2.5">
              <FaAward className="w-20 h-20 text-primary-300" />
              <p className="text-xl font-bold text-center text-primary-400">
                Terbaik Ketiga Business Pitching
              </p>
              <p className="text-xl text-center text-primary-700">
                Dari PPM Bussiness School dan WWF
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
