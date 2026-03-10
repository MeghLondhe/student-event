import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import DashboardLayout from "../layout/DashboardLayout";

const AdminDashboard = () => {
  return (
    <>
      <div className="flex">
        <DashboardLayout />
        <p>Hello</p>
      </div>
    </>
  );
};

export default AdminDashboard;
