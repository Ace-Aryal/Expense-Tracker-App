import React from "react";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Button } from "@mantine/core";
import InputField from "../components/UI/InputField";
import { useState } from "react";
import { useDispatch ,useSelector } from "react-redux";
import { setBalance } from "../features/expenseSlice";
import LineGraph from "../components/Expenses/LineGraph";
import RadialChart from "../components/UI/RadialChart";
import DonutChartComponent from "../components/UI/DonutChartComponent";
const Reports = () => {
  const [isInputOn, setIsInputOn] = useState(false);
  const [submitBudget , setSubmitBudget] = useState(true)
  const dispatch = useDispatch()
  const {monthlyBudget , weeklyBudget , quaterBudget , yearBudget} = useSelector(state => state.expense.budget)
  const {todayTotal , weekTotal , monthTotal , threeMonthTotal ,  oneYearTotal ,thisMonthTotal , thisYearTotal } = useSelector(state => state.expense.totals)
  const [expentitureHealth , setExpenditureHealth ]= useState(monthTotal/monthlyBudget*100)
  
  
  let message = isNaN(expentitureHealth) ? "" : expentitureHealth  <= 50 ? "You're doing great! Your wallet is still smiling. Keep this up, and maybe treat yourself... responsibly!" : (expentitureHealth < 80 && expentitureHealth > 50) ? "You're walking the fine line between 'responsible adult' and 'oops.' Proceed with caution!" : "Mission failed successfully! You've officially entered 'survival mode.' May your fridge be full and your wallet... well, just your fridge."

  return (
    <div id="container" className="flex flex-col mt-8 items-center ">
      <h1 className="text-5xl font-bold text-center mb-4">
        Your Expenses Analysis
      </h1>
      <div className="flex flex-col">
        <div className="flex justify-between px-2 my-2 items-center">
          <div className="flex flex-col">
            <Button variant="filled"
             onClick={()=>{
              setIsInputOn(prevValue => !prevValue)
             setSubmitBudget(prevValue=> !prevValue)
             }}
            
             
             color="violet">
              Set Budget
            </Button>{" "}
            {/* if bujdet is 0 setBudjet else Update Budjet*/}
             <InputField  submitBudget = { submitBudget} isInputOn= {isInputOn}/> 
          </div>
          <div>
          <span className=" inline  bg-[#7950F2] p-1.5 rounded text-white font-semibold">Monthly Budget : $ {monthlyBudget}</span>
          </div>  
        </div>
        <div className="grid grid-cols-4 gap-8">
        
          <RadialChart size={100} expense={monthTotal} budget={monthlyBudget} message={`Expended  In Last 30 Days`} />
          <div className="col-span-2 m-4">
           <LineGraph />
           </div>
          
           <DonutChartComponent/>
           <RadialChart size={100} expense={thisMonthTotal} budget={monthlyBudget} message={`Expended  This Month`}/>
           <RadialChart size={100} expense={threeMonthTotal} budget={quaterBudget} message={`Expended  In Last 90 Days`}/>
           <RadialChart size={100} expense={oneYearTotal} budget={yearBudget} message={`Expended In Last 365 Days`}/>
           <RadialChart size={100} expense={thisYearTotal} budget={yearBudget} message={`Expended This Year`}/>
           
         
          </div>
          <h1 className={`text-center text-xl font-semibold mt-4 mb-10 ${expentitureHealth <= 50 ? "text-green-500" : (expentitureHealth <= 80 && expentitureHealth > 50)  ? "text-amber-500" : "text-red-400"}`}>
            {message}</h1>
          <div className="flex w-full justify-around">
            <div className="basis-1/4 h-auto bg-amber-700"></div>
            <div className="basis-1/4 h-auto bg-amber-700"></div>
            <div className="basis-1/4 h-auto bg-amber-700"></div>
          </div>
        </div>
    </div>
  );
};

export default Reports;
