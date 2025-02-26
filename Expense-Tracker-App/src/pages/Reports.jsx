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
const Reports = () => {
  const [isInputOn, setIsInputOn] = useState(false);
  const [submitBudget , setSubmitBudget] = useState(true)
  const dispatch = useDispatch()
 const monthlyBudget = useSelector(state => state.expense.budget.monthlyBudget)

  return (
    <div id="container" className="flex flex-col mt-8 items-center ">
      <h1 className="text-3xl font-bold text-center mb-4">
        Your Expenses Analysis
      </h1>
      <div className="flex flex-col">
        <div className="flex justify-between px-2 my-2">
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
          <span className=" inline  border-1 border-indigo-500 p-1 rounded text-indigo-500">Monthly Budget : $ {monthlyBudget}</span>
          </div>  
        </div>
        <div className="grid grid-cols-4 gap-4">
        <RadialChart size={100}/>
        <RadialChart size={100}/>
          <RadialChart size={100}/>
           <RadialChart size={100}/>
          <RadialChart size={100}/>
          <div className="col-span-2 m-4">
           <LineGraph />
           </div>
          
           <RadialChart  size={100}/>
           <RadialChart size={100}/>
           <RadialChart size={100}/>
           <RadialChart size={100}/>
           <RadialChart size={100}/>
           
         
          </div>
          <h1 className="text-center text-xl font-semibold ">Message</h1>
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
