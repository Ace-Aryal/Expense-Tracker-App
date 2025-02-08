import React from 'react'
import ExpenseItem from '../components/Expenses/ExpenseItem'
import { useSelector } from 'react-redux'
const updateExpenses = () => {

  const fetchedData = useSelector((state) => state.expense)
  
  
  return (
    
    <div className='flex flex-col mt-[15vh] mb-2 items-center  min-h-[70vh]'>
      <h1 className='font-bold text-3xl text-center my-4 '>Track And Update Expenses</h1>
     < ExpenseItem expenseArray={fetchedData} showAllData={true}/>
    </div>
  )
}

export default updateExpenses