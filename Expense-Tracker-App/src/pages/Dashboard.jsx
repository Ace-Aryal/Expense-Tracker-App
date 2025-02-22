import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";
import { useSelector } from "react-redux";
import AreaGraph from "../components/Expenses/AreaGarph";
import RadialChart from "../components/UI/RadialChart"
const Dashboard = () => {
  const monthlyExpense = useSelector(state => state.expense.totals.monthTotal)
  const monthBudget = useSelector( state => state.expense.budget.monthlyBudget)
  return (
    <div
      id="container"
      className="w-full h-[90vh] flex flex-col mb-4 bg-[#dfe8f1]"
    >
      <div
        id="dashboard-top"
        className="flex justify-between mx-4 my-4 text-xl "
      >
        <span className="text-3xl font-bold ">Dashboard</span>
        <div className="font-semibold">Spent ${monthlyExpense} in last 30 days</div>
      </div>
     <div className="flex w-full justify-around items-end">
     
      <RadialChart expense={monthlyExpense} budget={monthBudget } />
      
     <div
        id="budjet-v-expense-graph"
        className="  mt-10 w-[45vw] self-center "
      >
        <AreaGraph />
      </div>
      <RadialChart/>
     </div>
      <div
        id="nav-area"
        className=" text-center mt-6 self-center flex flex-col items-center gap-y-4"
      >
        <h2 id="message" className="text-3xl font-bold mt-10">
          Track Your Spending, Achive Your Goals
        </h2>

        <div id="buttons" className="flex gap-3 ">
          <Link to="analyse">
          <Button id="analyse-link-btn" variant="filled" color="violet" size="md">Get Started</Button>
          </Link>
          <Link to="update">
          <Button id="update-link-btn" variant="outline" color="violet" size="md">Track Expenses</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
