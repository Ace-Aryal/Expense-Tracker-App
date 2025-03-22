import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAccount } from "../features/authSlice";
export default function Signup() {
  const [credentials, setCredentials] = useState({});
  const dispatch = useDispatch();
  const creadentialsArray = useSelector(
    (state) => state.credentials.credentialsList
  );
  function handleInputchange(e) {
    const { name, value } = e.target;
    if (name === "username") {
      setCredentials((prevval) => {
        return {
          ...prevval,
          username: value,
        };
      });
    }
    if (name === "email") {
      setCredentials((prevval) => {
        return {
          ...prevval,
          email: value,
        };
      });
    }
    if (name === "password") {
      setCredentials((prevval) => {
        return {
          ...prevval,
          password: value,
        };
      });
    }
  }

  function handleSignup(e) {
    e.preventDefault();
    dispatch(createAccount(credentials));
  }
  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(creadentialsArray));
  }, [handleSignup]);

  return (
    <div className="dark:bg-gray-900 min-h-screen flex justify-center items-center">
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <div className="flex lg:max-w-[35%] border-1 border-gray-600 rounded-xl py-2 px-1 flex-1 dark:bg-gray-800 flex-col justify-center ">
        <div className=" sm:w-full ">
          <img
            alt="Your Company"
            src="https://logosandtypes.com/wp-content/uploads/2024/12/xsplit.svg"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-100">
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            onSubmit={handleSignup}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-100"
                >
                  Username
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleInputchange}
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="current-username"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={handleInputchange}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-100"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleInputchange}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an Account?{" "}
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
