import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mantine/core";
import authService from "../../appwrite/authService";
import { useState } from "react";
import { setCurrentUser } from "../../features/authSlice";

const navigation = [
  { name: "Dashboard", href: "dashboard", current: true },
  { name: "Add", href: "/add", current: false },
  { name: "View", href: "/update", current: false },
  { name: "Analyze", href: "/analyse", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ setIsLoggedin }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.credentials.currentUser);
  const monthlyBalance = useSelector(
    (state) => state.expense.balance.monthlyBalance
  );

  async function handleLogout() {
    setIsLoading(true);
    try {
      await authService.logout();
      dispatch(
        setCurrentUser({
          username: "",
          email: "",
          isDocumentCreated: false,
        })
      );
      localStorage.removeItem("current-user");
      navigate("/");
    } catch (e) {
      alert("Error logging out , Try again");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Disclosure as="nav" className="bg-[#a7c6ed] ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 sticky">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to="/">
                <img
                  onClick={() => {
                    localStorage.removeItem("current-user");
                  }}
                  alt="Your Company"
                  src="https://logosandtypes.com/wp-content/uploads/2024/12/xsplit.svg"
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "bg-indigo-500 text-white"
                          : "text-gray-800 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
          {/* Profile dropdown */}
          <div className="bg-indigo-500 p-2 rounded-xl text-white shadow-gray-500 ">
            Balance: $ {monthlyBalance}
          </div>
          <button
            onClick={handleLogout}
            className="bg-none mx-2 p-2 rounded-xl text-indigo-500  shadow-gray-500 "
          >
            <span className="text font-semibold" aria-hidden="true">
              {isLoading ? "Logging out" : "Logout →"}
            </span>
          </button>

          <DisclosurePanel className="sm:hidden bg-indigo-400 text-white rounded">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-white hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </div>
      </div>
    </Disclosure>
  );
}
