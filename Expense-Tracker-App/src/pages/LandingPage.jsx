import { LandingPage as LandingPageComponent } from "../components";
import Dashboard from "./Dashboard";
import React, { useState } from "react";

function LandingPage({ setIsLoggedin }) {
  const currentUser =
    JSON.parse(sessionStorage.getItem("current-user")) || null;
  if (currentUser) {
    setIsLoggedin(true);
    return <Dashboard />;
  }
  setIsLoggedin(false);
  return <LandingPageComponent />;
}

export default LandingPage;
