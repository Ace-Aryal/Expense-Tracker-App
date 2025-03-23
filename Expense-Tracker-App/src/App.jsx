import React, { useEffect, useMemo, useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./router/Layout";
import { Routes, Route } from "react-router-dom";
import Reports from "./pages/Reports";
import PageNotFound from "./pages/PageNotFound";
import Addexpenses from "./pages/Addexpenses";
import UpdateExpenses from "./pages/UpdateExpenses";
import Navbar from "./components/Layouts/Navbar";
import Footer from "./components/Layouts/Footer";
import { calculateTotal, setBalance } from "./features/expenseSlice";
import { useDispatch, useSelector } from "react-redux";
import { createDatasFromExpenseData } from "./features/chartDataSlice";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";

function App() {
  const dispatch = useDispatch();
  const [isLoggedin, setIsLoggedin] = React.useState(
    JSON.parse(sessionStorage.getItem("current-user"))
  );
  const [currentUser, setCurrentuser] = useState(
    JSON.parse(sessionStorage.getItem("current-user"))
  );

  const expenseObject = useSelector((state) => state.expense);
  useEffect(() => {
    dispatch(calculateTotal());
    dispatch(setBalance());

    // chart
    dispatch(createDatasFromExpenseData(7));
    dispatch(createDatasFromExpenseData(30));
  }, []);

  useEffect(() => {
    localStorage.setItem("totals", JSON.stringify(expenseObject.totals));
    localStorage.setItem("expenses", JSON.stringify(expenseObject.expenses));
  }, [calculateTotal]);

  useEffect(() => {
    if (currentUser) {
      setIsLoggedin(true);
      return;
    }
    setIsLoggedin(false);
  }, [currentUser]);

  return (
    <div className="bg-[#dfe8f1]">
      {isLoggedin && <Navbar setIsLoggedin={setIsLoggedin} />}
      <Routes>
        <Route index element={<LandingPage setIsLoggedin={setIsLoggedin} />} />
        {!isLoggedin && (
          <>
            {" "}
            <Route path="signup" element={<Signup />} />
            <Route
              path="login"
              element={<Login setCurrentuser={setCurrentuser} />}
            />{" "}
          </>
        )}
        {isLoggedin && (
          <>
            {" "}
            <Route path={`dashboard`} element={<Dashboard />} />
            <Route path="analyse" element={<Reports />} />
            <Route path="add" element={<Addexpenses />} />
            <Route path="update" element={<UpdateExpenses />} />
          </>
        )}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {isLoggedin && <Footer />}
    </div>
  );
}

export default App;
