import { useSelector, useDispatch } from "react-redux";
import authService from "../appwrite/authService";
import { LandingPage as LandingPageComponent } from "../components";
import Dashboard from "./Dashboard";
import React, { useState } from "react";
import { setCurrentUser } from "../features/authSlice";

function LandingPage({ setIsLoggedin }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.credentials.currentUser);
  const email = useSelector((state) => state.credentials.currentUser.email);
  const response = JSON.parse(localStorage.getItem("current-user"));
  const handleSession = () => {
    const { name, email } = response;
    dispatch(setCurrentUser({ ...currentUser, username: name, email }));
    localStorage.setItem(
      "current-user",
      JSON.stringify({
        name,
        email,
      })
    );
  };
  if (response) {
    handleSession();
  }

  if (response?.email) {
    setIsLoggedin(true);
    return <>Loading...</>;
  }

  setIsLoggedin(false);
  return <LandingPageComponent />;
}

export default LandingPage;
