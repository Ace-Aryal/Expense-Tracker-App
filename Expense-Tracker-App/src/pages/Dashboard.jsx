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
const Dashboard = () => {
  const dispatch = useDispatch();
  const { monthTotal, todaytotal, weekTotal } = useSelector(
    (state) => state.expense.totals
  );
  const currentUser = useSelector(
    (state) => state.credentials.currentUser.username
  );

  const { weeklyBudget, dailyBudget } =
    useSelector((state) => state.expense.budget) || 0;

  async function handleCurrentUser() {
    if (currentUser !== "Admin") return;
    try {
      const user = await authService.getCurrentUser();
      console.log("curr", user);

      if (user.status) {
        dispatch(setCurrentUser({ username: user.name, email: user.email }));
        return;
      }
      dispatch(setCurrentUser({ username: "Admmin", email: "" }));
    } catch (error) {
      dispatch(setCurrentUser({ username: "Admmin", email: "" }));
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
        Welcome {currentUser || "Admin"}
      </p>
    </div>
  );
};

export default Dashboard;
