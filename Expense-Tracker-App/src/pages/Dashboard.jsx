import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";
const Dashboard = () => {
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
        <div className="font-semibold">Spent $100 this month</div>
      </div>
      <div
        id="budjet-v-expense-graph"
        className="  mt-10 not-sm:w-[100vw]   min-w-3/5 sm:h-[40vw] min-h-[40vh] bg-amber-700 self-center "
      ></div>
      <div
        id="nav-area"
        className=" text-center mt-6 self-center flex flex-col items-center gap-y-4"
      >
        <h2 id="message" className="text-3xl font-bold">
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
