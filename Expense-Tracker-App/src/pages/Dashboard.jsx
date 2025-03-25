import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import AreaGraph from "../components/Expenses/AreaGarph";
import RadialChart from "../components/UI/RadialChart";
import { createDatasFromExpenseData } from "../features/chartDataSlice";
import DonutChartComponent from "../components/UI/DonutChartComponent";
import authService from "../appwrite/authService";
import { setCurrentUser } from "../features/authSlice";
import databaseService from "../appwrite/databaseService";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { monthTotal, todaytotal, weekTotal } = useSelector(
    (state) => state.expense.totals
  );
  const currentUser = useSelector((state) => state.credentials.currentUser);

  const { weeklyBudget, dailyBudget } =
    useSelector((state) => state.expense.budget) || 0;

  async function handleCurrentUser() {
    console.log(currentUser);

    if (currentUser.username !== "Admin" && !currentUser.username) return;
    try {
      const user = await authService.getCurrentUser();

      if (user.status) {
        dispatch(
          setCurrentUser({
            ...currentUser,
            username: user.name,
            email: user.email,
          })
        );
        handleDocumentCreation();
        return;
      }
    } catch (error) {
      dispatch(
        setCurrentUser({ ...currentUser, username: "Admmin", email: "" })
      );
      console.error(error);
    }
  }
  async function handleDocumentCreation() {
    console.log(currentUser);

    if (currentUser.username === "Admin" || currentUser.isDocumentCreated)
      return;

    const { email } = currentUser;
    console.log(email);
    try {
      const response = await databaseService.getuserDocument({ email });
      if (response.total !== 0) return;
      databaseService.createUserDocument(currentUser.email);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    dispatch(createDatasFromExpenseData(7));
    handleCurrentUser();
  }, []);

  return (
    <div
      id="container"
      className="w-full flex flex-col mb-4 bg-[#dfe8f1] min-h-[85vh]"
    >
      <div
        id="dashboard-top"
        className="flex justify-between mx-4 my-4 text-xl "
      >
        <span className="text-5xl font-bold ">Dashboard</span>
        <div
          className={`font-semibold  ${todaytotal === 0 || (todaytotal / dailyBudget) * 100 <= 50 ? "text-green-600" : (todaytotal / dailyBudget) * 100 < 80 && (todaytotal / dailyBudget) * 100 > 50 ? "text-orange-400" : "text-red-500"}`}
        >
          Spent ${todaytotal || 0} Today{" "}
        </div>
      </div>
      <div className="flex w-full justify-around items-end">
        <RadialChart
          expense={weekTotal}
          budget={weeklyBudget}
          message={`Expended In Last 7 days`}
        />

        <div
          id="budjet-v-expense-graph"
          className="  mt-10 w-[45vw] self-center "
        >
          <AreaGraph />
        </div>

        <DonutChartComponent timeframe={7} />
      </div>
      <p className="text-center mt-8 text-xl font-bold text-cyan-600">
        Welcome {`${currentUser.username}` || "Admin"}
      </p>
    </div>
  );
};

export default Dashboard;
