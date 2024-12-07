import FooterComponent from "../components/FooterComponent";
import NavbarComponent from "../components/NavbarComponent";
import { Outlet } from "react-router-dom";

const LadingPageLayout = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 z-50 w-full">
        <NavbarComponent />
      </div>
      <div className="pt-[168px]">
        <Outlet />
      </div>
      <FooterComponent />
    </div>
  );
};

export default LadingPageLayout;
