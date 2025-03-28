import React from 'react'
import ExpenseList from './ExpenseList'
import { calculateTotal , setBalance } from '../../features/expenseSlice'
import { useDispatch  } from 'react-redux'
function ExpenseItem({expenseArray, showAllData}) {
const dispatch = useDispatch()
//dispatch(calculateTotal())
//dispatch(setBalance())


  return (

    <div className=" mx-auto w-[60%] p-4 flex flex-col justify-center items-center">
    <div className="   grid grid-cols-[4fr_2fr_2fr_2fr_1fr_1fr] gap-1  ">
        {/*list headers*/}
        <div className='bg-[#ea5322]  px-2 mb-1  py-1 text-lg text-white'>Expense</div>
        <div className='bg-[#ea5322] px-2 mb-1  py-1 text-lg text-white'>Amount</div>
        <div className='bg-[#ea5322] px-2 mb-1  py-1 text-lg text-white'>Catagory</div>
        <div className='bg-[#ea5322] px-2 mb-1  py-1 text-lg text-white'>Date</div>
        <div className='bg-[#ea5322]  px-2 mb-1  py-1 text-lg text-white col-span-2  text-center'>Action</div>
    


        {
          
      expenseArray.map((item,index) =>  {
       
        dispatch(setBalance())
        return  <ExpenseList key={item.id} index={index} item={item} showAllData={showAllData}/>


      })
      
    }
    </div>
  </div>
  
  )
    
  
  
}

export default ExpenseItem