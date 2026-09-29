import { Outlet } from "react-router-dom";
import Navbar from "../../components/layout/Navbar/Navbar";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import Footer from "../../components/layout/Footer/Footer";

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <div className="flex min-h-[calc(100vh-80px)]">
        <Sidebar />

        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default UserLayout;
