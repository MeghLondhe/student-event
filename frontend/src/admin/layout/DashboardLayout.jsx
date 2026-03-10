import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />

        <Header />

        <div className="p-20">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
