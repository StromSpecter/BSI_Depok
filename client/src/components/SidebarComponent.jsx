import { Link, useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "../assets/data";
import logodashboard from "../assets/imgs/cms/logodashboard.png";

const SidebarComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Menghapus data dari localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");

    // Redirect ke halaman signin
    navigate("/signin");
  };

  return (
    <div className="flex flex-col w-full h-full gap-5">
      <div className="w-full h-20 p-2.5">
        <img src={logodashboard} alt="logo bsi" className="object-cover w-full h-full rounded-3xl" loading="lazy"/>
      </div>
      <div className="flex flex-col w-full px-2.5 bg-primary-500 grow">
        {menuItems.map((menu) => (
          <div key={menu.id}>
            <Link
              to={menu.path}
              className={`flex flex-row items-center w-full h-10 px-5 gap-2.5 ${
                location.pathname === menu.path
                  ? "bg-white text-primary-500"
                  : "text-white"
              }`}
            >
              <span>
                {location.pathname === menu.path
                  ? menu.iconFill
                  : menu.iconLine}
              </span>
              <p>{menu.title}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="w-full h-20 border-t p-2.5 flex flex-row items-center">
        <div className="w-10 h-10 bg-red-500 rounded-full"></div>
        <div className="flex flex-col ml-2">
          <p className="text-xl font-semibold text-white">
            {localStorage.getItem("name")}
          </p>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-300 w-fit"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
