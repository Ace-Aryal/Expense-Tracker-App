import React from 'react'
import ExpenseItem from '../components/Expenses/ExpenseItem'
import { useSelector } from 'react-redux'
import { useState } from 'react'
const updateExpenses = () => {
  const [isInputOn , setIsInputOn] = useState(false)
  const fetchedData = useSelector((state) => state.expense.expenses)
  
  
  return (
    
    <div className='flex flex-col mt-[15vh] mb-2 items-center  min-h-[70vh]'>
      <h1 className='font-bold text-5xl text-center my-4 '>Track And Update Expenses</h1>
     < ExpenseItem expenseArray={fetchedData} showAllData={true} />
    </div>
  )
}

export default updateExpenses