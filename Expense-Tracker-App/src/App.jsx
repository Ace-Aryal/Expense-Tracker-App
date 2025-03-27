import React, { useEffect, useMemo, useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import databaseService from "./appwrite/databaseService";
import { setCurrentUser as setCurrentStateUser } from "./features/authSlice";
import { setDatas } from "./features/expenseSlice";
import authService from "./appwrite/authService";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedin, setIsLoggedin] = React.useState(
    JSON.parse(localStorage.getItem("current-user"))
  );
  const [currentUser, setCurrentuser] = useState(
    JSON.parse(localStorage.getItem("current-user"))
  );
  const email = useSelector((state) => state.credentials.currentUser.email);
  const expenseObject = useSelector((state) => state.expense);
  const { expenses, totals, balance, budget, documentID } = expenseObject;
  const currentStateUser = useSelector(
    (state) => state.credentials.currentUser
  );
  // state management for current user
  async function handleCurrentUser() {
    console.log("current user", currentStateUser);

    if (currentStateUser.username !== "Admin" && !currentStateUser.username)
      return;
    try {
      const user = await authService.getCurrentUser().then((user) => {
        const { email, name } = user;
        console.log("user", user);

        if (user.status) {
          dispatch(
            setCurrentStateUser({
              ...currentStateUser,
              username: name,
              email: email,
            })
          );

          localStorage.setItem("current-user", JSON.stringify({ name, email }));
          handleDocumentCreation();
          return;
        }
      });
    } catch (error) {
      console.error(error);

      dispatch(
        setCurrentStateUser({
          ...currentStateUser,
          username: "Admin",
          email: "",
        })
      );
      console.error(error);
    }
  }
  // creates new document for new user and syncs state with database
  async function handleDocumentCreation() {
    console.log("current state user", currentStateUser);

    if (
      currentStateUser.username === "Admin" ||
      currentStateUser.isDocumentCreated
    )
      return;

    const { email } = currentStateUser;
    try {
      let response = await databaseService
        .getuserDocument({ email })
        .then((response) => {
          console.log("response 1", response);
          if (response.total === 0) return;
          dispatch(
            setDatas({
              documentID: response.documents[0].$id,
              expenses: JSON.parse(response.documents[0].expenses),
              totals: JSON.parse(response.documents[0].totals),
              budget: JSON.parse(response.documents[0].budget),
              balance: JSON.parse(response.documents[0].balance),
            })
          );
        });
      console.log("resp", response);

      if (response.total === 0) {
        await databaseService.createUserDocument(currentStateUser.email);
        response = await databaseService
          .getuserDocument({ email })
          .then((response) => {
            console.log("response", response);

            dispatch(
              setDatas({
                documentID: response.documents[0].$id,
                expenses: JSON.parse(response.documents[0].expenses),
                totals: JSON.parse(response.documents[0].totals),
                budget: JSON.parse(response.documents[0].budget),
                balance: JSON.parse(response.documents[0].balance),
              })
            );
          });
      }

      // dispatch(createDatasFromExpenseData(7));
    } catch (error) {
      console.error("get doc error", error);
    }
  }

  useEffect(() => {
    handleDocumentCreation();
  }, [currentStateUser]);

  useEffect(() => {
    console.log(isLoggedin);

    if (!isLoggedin) {
      return;
    }
    dispatch(calculateTotal());
    dispatch(setBalance());
    handleCurrentUser();
    navigate("/dashboard");
    // chart
    dispatch(createDatasFromExpenseData({ noOfDays: 7, expenses }));
    dispatch(createDatasFromExpenseData({ noOfDays: 30, expenses }));
  }, [isLoggedin]);

  useEffect(() => {
    if (currentUser) {
      setIsLoggedin(true);
      return;
    }
    setIsLoggedin(false);
  }, [currentUser]);

  useEffect(() => {
    if (!isLoggedin) {
      return;
    }
    console.log("doc id, email", documentID, email, expenseObject);

    databaseService.updateUserDocument({
      documentID,
      email,
      expenses,
      totals,
      balance,
      budget,
    });
    dispatch(createDatasFromExpenseData({ noOfDays: 7, expenses }));
    dispatch(createDatasFromExpenseData({ noOfDays: 30, expenses }));
  }, [expenseObject]);

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
