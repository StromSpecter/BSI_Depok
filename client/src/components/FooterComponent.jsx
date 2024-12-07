import logo from "../assets/logo.svg";
import {
  RiFacebookFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiWhatsappFill,
} from "react-icons/ri";

const FooterComponent = () => {
  return (
    <div className="w-full h-full py-10 mt-20 bg-primary-700">
      <section className="container grid w-full h-full grid-cols-1 gap-10 px-5 mx-auto md:grid-cols-4 md:px-0">
        <div className="flex flex-col w-full h-full gap-5">
          <div className="flex flex-row items-center justify-center w-full h-20 gap-2.5 bg-white rounded-full">
            <div className="w-[60px] h-[60px]">
              <img
                src={logo}
                alt="logo"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-xs font-medium text-primary-200">
                Bang Sampah Induk
              </p>
              <p className="text-lg font-bold text-primary-700">Rumah Harum</p>
            </div>
          </div>
          <p className="text-white">
            Jln. Merdeka Raya No. 1 RT05/RW01, Kel. Abadijaya, Kec. Sukmajaya,
            Kota Depok
          </p>
        </div>
        <div className="flex flex-col w-full h-full gap-5">
          <p className="text-xl font-semibold text-white">BSI Rumah Harum</p>
          <div className="flex flex-col gap-2.5">
            <p className="text-gray-300">
              <a href="/">Home</a>
            </p>
            <p className="text-gray-300">
              <a href="/">Tentang Kamu</a>
            </p>
            <p className="text-gray-300">
              <a href="/">Program</a>
            </p>
            <p className="text-gray-300">
              <a href="/">Publikasi</a>
            </p>
            <p className="text-gray-300">
              <a href="/">Donasi</a>
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full h-full gap-5">
          <p className="text-xl font-semibold text-white">Kontak</p>
          <div className="flex flex-col gap-2.5">
            <p className="text-gray-300">bsirumahharum@gmail.com</p>
            <p className="text-gray-300">marketing.rumaharum@gmail.com</p>
            <p className="text-gray-300">0813-1086-2475</p>
          </div>
        </div>
        <div className="flex flex-col w-full h-full gap-5">
          <p className="text-xl font-semibold text-white">Sosial Media</p>
          <div className="flex flex-row gap-2.5">
            <div className="flex flex-row items-center justify-center w-10 h-10 rounded-full bg-primary-200">
              <RiLinkedinFill className="size-6 text-primary-500" />
            </div>
            <div className="flex flex-row items-center justify-center w-10 h-10 rounded-full bg-primary-200">
              <RiFacebookFill className="size-6 text-primary-500" />
            </div>
            <div className="flex flex-row items-center justify-center w-10 h-10 rounded-full bg-primary-200">
              <RiInstagramFill className="size-6 text-primary-500" />
            </div>
            <div className="flex flex-row items-center justify-center w-10 h-10 rounded-full bg-primary-200">
              <RiWhatsappFill className="size-6 text-primary-500" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FooterComponent;
