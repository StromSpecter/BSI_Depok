import { Route, Routes } from "react-router-dom";
import LadingPageLayout from "./layouts/LadingPageLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./middleware/PrivateRoute";
import ProgramsPage from "./pages/ProgramsPage";
import PartnersPage from "./pages/PartnersPage";
import TrashsPage from "./pages/TrashsPage";
import NewssPage from "./pages/NewssPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import KemitraansPage from "./pages/KemitraansPage";
import HomePage from "./pages/HomePage";
import ProgramPage from "./pages/ProgramPage";
import AboutPage from "./pages/AboutPage";
import PublikasiPage from "./pages/PublikasiPage";
import TrashPage from "./pages/TrashPage";
import PublikasiDeatailPage from "./pages/PublikasiDeatailPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LadingPageLayout />}>
          <Route index element={<HomePage />} />
          {/* Dinamis Route untuk Program */}
          <Route path="/program/:path" element={<ProgramPage />} />
          <Route path="/tentang-kami" element={<AboutPage />} />
          <Route path="/publikasi" element={<PublikasiPage />} />
          <Route path="/publikasi/:path" element={<PublikasiDeatailPage />} />
          <Route path="/sampah" element={<TrashPage />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="/dashboard/programs" element={<ProgramsPage />} />
          <Route path="/dashboard/kemitraans" element={<KemitraansPage />} />
          <Route path="/dashboard/partners" element={<PartnersPage />} />
          <Route path="/dashboard/trashs" element={<TrashsPage />} />
          <Route path="/dashboard/newss" element={<NewssPage />} />
          <Route
            path="/dashboard/testimonials"
            element={<TestimonialsPage />}
          />
        </Route>

        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
};

export default App;
