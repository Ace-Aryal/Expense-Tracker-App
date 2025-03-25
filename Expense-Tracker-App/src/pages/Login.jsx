import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/authService";
import databaseService from "../appwrite/databaseService";
import { setCurrentUser } from "../features/authSlice";

function Login(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.credentials.currentUser);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsloading] = useState(false);
  const [unableToLogin, setUnableTologin] = useState(false);
  const handleCreditianlsChange = function (e) {
    const { name } = e.target;
    console.log("cred", email, password);
    if (name === "email") {
      setUnableTologin(false);
      setEmail(e.target.value);
      return;
    }

    if (name === "password") {
      setPassword(e.target.value);
      return;
    }
  };

  const handleSubmit = useCallback(
    async function (e) {
      e.preventDefault();
      // authService.logout();

      try {
        setIsloading(true);
        console.log("cred", email, password);
        const results = await authService.login({ email, password });
        console.log("res", results);

        if (results) {
          dispatch(
            setCurrentUser({ ...currentUser, email, username: "Admin" })
          );
          sessionStorage.setItem("current-user", JSON.stringify({ email }));

          props.setCurrentuser(
            JSON.parse(sessionStorage.getItem("current-user"))
          );
          navigate("/dashboard");
        }
      } catch (error) {
        setEmail("Wrong Credentials");
        setUnableTologin(true);
        console.error(error);
      } finally {
        setIsloading(false);
      }
    },
    [email, password]
  );

  return (
    <section class="bg-gray-50 dark:bg-[#a7c6ed]">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-cyan-600"
        >
          <img
            class="w-8 h-8 mr-2"
            src="https://logosandtypes.com/wp-content/uploads/2024/12/xsplit.svg"
            alt="logo"
          />
          <h2 className="font-bold text-2xl ">Xpenso</h2>
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#c3d7f1] dark:border-gray-400">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form
              id="form"
              onSubmit={handleSubmit}
              class="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
                >
                  Your email
                </label>
                <input
                  onChange={handleCreditianlsChange}
                  value={email}
                  type="email"
                  name="email"
                  id="email"
                  className={`${unableToLogin ? "text-red-500" : "dark:text-gray-900"} bg-gray-50 border border-gray-500  rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-[#c3d7f1] dark:border-gray-500 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-text-900"
                >
                  Password
                </label>
                <input
                  onChange={handleCreditianlsChange}
                  type="password"
                  value={password}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-[#c3d7f1] dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              {/* <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="remember"
                      class="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  class="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div> */}
              <button
                type="submit"
                class="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                {isLoading ? "Signing In" : "Sign In"}
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-800">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  class="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
