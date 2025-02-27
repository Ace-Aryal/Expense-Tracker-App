import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";
import { useSelector , useDispatch } from "react-redux";
import AreaGraph from "../components/Expenses/AreaGarph";
import RadialChart from "../components/UI/RadialChart"
import { createDatasFromExpenseData } from "../features/chartDataSlice";
const Dashboard = () => {
  const dispatch = useDispatch()
  const{monthTotal ,todaytotal , weekTotal } = useSelector(state => state.expense.totals)
  const weeklyBudget = useSelector( state => state.expense.budget.weeklyBudget)


     
      useEffect(()=>{
        dispatch(createDatasFromExpenseData(7))
      
      } , []
      
      )
  return (
    <div
      id="container"
      className="w-full flex flex-col mb-4 bg-[#dfe8f1]"
    >
      <div
        id="dashboard-top"
        className="flex justify-between mx-4 my-4 text-xl "
      >
        <span className="text-5xl font-bold ">Dashboard</span>
        <div className="font-semibold">Spent ${todaytotal || 0} Today </div>
      </div>
     <div className="flex w-full justify-around items-end">
     
      <RadialChart expense={weekTotal} budget={weeklyBudget} message={`Expended In Last 7 days`} />
      
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
