import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Layouts/Navbar";
import Footer from "../components/Layouts/Footer";
const Layout = () => {
  return (
    <div>
      <Navbar />
      
      {/* Outlet is where the routed components will render */}
      <main>
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
