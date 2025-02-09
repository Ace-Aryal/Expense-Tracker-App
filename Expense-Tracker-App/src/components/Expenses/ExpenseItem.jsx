import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../../features/expenseSlice'
import {useState} from "react"
function ExpenseItem({expenseArray, showAllData}) {
  const dispatch = useDispatch()



  function handleDelete(e, id){
    e.preventDefault()
    console.log(id);
    dispatch(deleteItem(id)) // all the delete is handled by redux reducers
  }
  
  function handleUpdate(setIsEditable) {
    setIsEditable(prevValue=> !prevValue)


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
/// from here 
        //local fn for each item
        const [isEditable , setIsEditable] = useState(false)
        const [updatedData , setUpdatedData] = useState(item)

        function handleChange (e) {
          const {name} = e.target
        
          setUpdatedData( prevdata =>  { 
            return {
            ...prevdata,
            [item[name]]: e.target.innerText
            }
          })
       
          
          console.log(updatedData);
          
        }
// to here
        if(!showAllData && index > 2){
          return 
        }
        return (
        <> 
        <div id='expense' name="expense" contentEditable={isEditable} onInput={handleChange} className={`bg-[#5763ab] text-[#fbe6e4] px-2 py-0.5 ${item.id} ` } >{item.expense}</div>
        <div id='amount' name="amount" contentEditable={isEditable} onInput={handleChange} className={`bg-[#5763ab] text-[#fbe6e4] px-2 py-0.5 ${item.id} ` }>{item.amount}</div>
        <select id="category"  name="category"  onInput={handleChange} disabled={isEditable ? false : true} className={` ${item.id} appearance-none bg-[#5763ab] text-[#fbe6e4] px-2 py-0.5`}>
            <option value="food" selected>{item.category}</option>
            <option value="transport">Transport</option>
            <option value="others">Others</option>
        </select>
        <div id='date' name="date" contentEditable={isEditable} onInput={handleChange} className={`bg-[#5763ab] text-[#fbe6e4] px-2 py-0.5 ${item.id} ` }>{item.date}</div>
        <button className='bg-cyan-500 px-2 py-0.5' 
          onClick={(e)=> { 
            e.preventDefault()
            handleUpdate(setIsEditable)}}
        ><i class={isEditable ? "fa-solid fa-floppy-disk" : "fa-solid fa-pen-to-square"}></i></button>
        <button type="submit" className='bg-red-500 px-2 py-0.5'  onClick={(e)=> {
          e.preventDefault()
          handleDelete(e, item.id)
        }}><i class= "fa-solid fa-trash-can"></i></button>
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