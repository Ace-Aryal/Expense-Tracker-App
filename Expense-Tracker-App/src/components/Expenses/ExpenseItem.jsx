import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../../features/expenseSlice'
function ExpenseItem({expenseArray, showAllData}) {
  const dispatch = useDispatch()



  function handleDelete(e, id){
    e.preventDefault()
    console.log(id);
    dispatch(deleteItem(id)) // all the delete is handled by redux reducers
  }
  

  return (

    <div className="container mx-auto p-4 flex flex-col justify-center items-center">
    <div className=" w-[60%] grid grid-cols-[4fr_2fr_2fr_2fr_0.5fr_0.5fr] gap-1  ">
        {/*list headers*/}
        <div className='bg-[#ea5322]  px-2 mb-1  py-1 text-lg text-white'>Expense</div>
        <div className='bg-[#ea5322] px-2 mb-1  py-1 text-lg text-white'>Amount</div>
        <div className='bg-[#ea5322] px-2 mb-1  py-1 text-lg text-white'>Catagory</div>
        <div className='bg-[#ea5322] px-2 mb-1  py-1 text-lg text-white'>Date</div>
        <div className='bg-[#ea5322]  px-2 mb-1  py-1 text-lg text-white col-span-2  text-center'>Action</div>
    


        {/*list datas*/}
        {
      expenseArray.map((item,index) =>  { // each time array updates this whole function re-executes and latest values
        // are added 
        if(!showAllData && index > 2){
          return 
        }
        return (
        <>
        <div className='bg-[#5763ab] text-[#fbe6e4] px-2 py-0.5'>{item.expense}</div>
        <div className='bg-[#5763ab] text-[#fbe6e4] px-2 py-0.5'>{item.amount}</div>
        <select name="catagory" id="catagory" disabled className='appearance-none bg-[#5763ab] text-[#fbe6e4] px-2 py-0.5'>
            <option value="food" selected>{item.category}</option>
            <option value="transport">Transport</option>
            <option value="others">Others</option>
        </select>
        <div className='bg-[#5763ab] text-[#fbe6e4] px-2 py-0.5'>{item.date}</div>
        <button className='bg-cyan-500 px-2 py-0.5' >Edit</button>
        <button type="submit" className='bg-red-500 px-2 py-0.5'  onClick={(e)=> {
          e.preventDefault()
          handleDelete(e, item.id)
        }}>Delete</button>
        </>
        )
      }
      )
    }
    </div>
    </div>
      
  )
}

export default ExpenseItem