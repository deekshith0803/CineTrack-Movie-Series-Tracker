import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/layout/AdminSidebar/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <AdminSidebar />

      <main className="flex-1 min-w-0 min-h-screen bg-gray-950">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;