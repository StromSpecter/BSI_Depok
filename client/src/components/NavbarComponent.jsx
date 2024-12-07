import {
  RiCloseFill,
  RiFacebookFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiMenuFill,
  RiWhatsappFill,
  RiArrowDownSFill,
  RiArrowUpSFill,
} from "react-icons/ri";
import logo from "../assets/logo.svg";
import { useState, useEffect } from "react";
import axios from "axios";

const NavbarComponent = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarDropdownOpen, setSidebarDropdownOpen] = useState(false);
  const [subPrograms, setSubPrograms] = useState([]);

  // Current location
  const currentPath = window.location.pathname;

  // Toggle functions
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleSidebarDropdown = () => {
    setSidebarDropdownOpen(!isSidebarDropdownOpen);
  };

  // Fetch data for subprograms
  useEffect(() => {
    const fetchSubPrograms = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/programs");
        setSubPrograms(response.data); // Assuming response.data is an array of programs
      } catch (error) {
        console.error("Failed to fetch subprograms:", error);
      }
    };
    fetchSubPrograms();
  }, []);

  // Menu items
  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/tentang-kami", label: "Tentang Kami" },
    {
      label: "Program",
      subItems: subPrograms.map((program) => ({
        path: `/program/${program.path}`, // Format URL sesuai route dinamis
        label: program.title,
      })),
    },
    { path: "/publikasi", label: "Publikasi" },
  ];

  const renderMenuItem = (item, isSidebar = false) => {
    if (item.subItems) {
      return (
        <div key={item.label} className="relative">
          <button
            onClick={isSidebar ? toggleSidebarDropdown : toggleDropdown}
            className={`flex flex-row items-center justify-between w-full px-6 py-1 ${
              currentPath.startsWith("/program")
                ? "bg-primary-500 text-white rounded-full"
                : "text-gray-300"
            }`}
          >
            <span>{item.label}</span>
            {isSidebar ? (
              isSidebarDropdownOpen ? (
                <RiArrowUpSFill />
              ) : (
                <RiArrowDownSFill />
              )
            ) : isDropdownOpen ? (
              <RiArrowUpSFill />
            ) : (
              <RiArrowDownSFill />
            )}
          </button>
          {(isSidebar ? isSidebarDropdownOpen : isDropdownOpen) && (
            <div
              className={`absolute ${
                isSidebar ? "relative mt-2" : "top-full"
              } left-0 w-80 bg-gray-100 border rounded shadow-md`}
            >
              {item.subItems.map((subItem) => (
                <a href={subItem.path} key={subItem.path}>
                  <div className="px-6 py-2 hover:bg-gray-200">
                    {subItem.label}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      );
    }
    return (
      <a href={item.path} key={item.path}>
        <div
          className={`flex flex-row items-center justify-center px-6 py-1 ${
            currentPath === item.path
              ? "bg-primary-500 text-white rounded-full"
              : "text-gray-300"
          }`}
        >
          <p>{item.label}</p>
        </div>
      </a>
    );
  };

  return (
    <div className="fixed top-0 w-full h-[168px]">
      <div className="relative w-full h-full">
        {/* Logo */}
        <div className="absolute top-16 left-5 w-[260px] h-20 bg-white border gap-2.5 z-50 rounded-full flex flex-row items-center justify-center">
          <div className="w-[60px] h-[60px]">
            <img src={logo} alt="logo" className="object-cover w-full h-full" />
          </div>
          <div className="flex flex-col">
            <p className="text-[12px] font-medium text-primary-300">
              Bang Sampah Induk
            </p>
            <p className="text-lg font-bold text-primary-600">Rumah Harum</p>
          </div>
        </div>

        {/* Header */}
        <div className="absolute top-0 left-0 w-full h-[60px] bg-primary-700 z-40 rounded-b-3xl">
          <div className="container flex flex-col items-center justify-center w-full h-full mx-auto md:flex-row md:justify-between">
            <p className="text-white">
              Welcome to Bank Sampah Induk Rumah Harum
            </p>
            <div className="flex flex-row gap-2.5 items-center justify-center">
              <p className="text-white">Contact us: </p>
              <RiLinkedinFill className="text-white" />
              <RiFacebookFill className="text-white" />
              <RiInstagramFill className="text-white" />
              <RiWhatsappFill className="text-white" />
            </div>
          </div>
        </div>

        {/* Navbar */}
        <div className="absolute top-0 left-0 z-20 flex flex-col justify-end w-full h-full bg-white">
          <div className="flex flex-col items-end justify-center w-full px-5 md:items-center bg-primary-700 h-14">
            <div className="flex-row items-center justify-center hidden gap-5 md:flex">
              {menuItems.map((item) => renderMenuItem(item))}
            </div>
            <button className="w-10 h-10 md:hidden" onClick={toggleSidebar}>
              {isSidebarOpen ? (
                <RiCloseFill className="w-full h-full text-white" />
              ) : (
                <RiMenuFill className="w-full h-full text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed top-[168px] right-0 z-50 w-64 h-full bg-white shadow-lg">
          <div className="flex flex-col items-center justify-start w-full h-full gap-4 pt-5">
            {menuItems.map((item) => renderMenuItem(item, true))}
          </div>
        </div>
      )}

      {/* Overlay untuk menutup sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 top-[168px]"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default NavbarComponent;
