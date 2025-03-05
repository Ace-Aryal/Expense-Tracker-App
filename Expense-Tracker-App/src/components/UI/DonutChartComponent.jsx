// chart to compare different expenses acc to catagories\
import { DonutChart } from '@mantine/charts';
import { useSelector , useDispatch } from 'react-redux';  
import { createExpensesAccToCatagory } from '../../features/expenseSlice';
import { useEffect, useState } from 'react';


function DonutChartComponent({timeframe}) {
  const dispatch = useDispatch()
  const expenseData = useSelector (state => state.expense.expenses)
 const data = useSelector(state=> state.expense.catagoryExpenseData)
 const [isDataEmpty , setIsDataEmpty] = useState(false)
 
 useEffect(()=> {
  setIsDataEmpty (data.every(item=> item.value === 0))
  
 },[data])
 
 

 useEffect(()=>{
   dispatch(createExpensesAccToCatagory(timeframe))
 },[expenseData])

  return (
  <div className="flex flex-col items-center text-indigo-600 font-semibold">
  <DonutChart data={data}  withLabelsLine={false} labelsType="percent" withLabels chartLabel={isDataEmpty? "No Money Expended" : ""}/>
  <span>Last {timeframe} Days Expense Breakdown</span>
  </div>
  )
}

export default DonutChartComponent