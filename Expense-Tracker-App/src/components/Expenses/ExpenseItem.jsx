import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../../features/expenseSlice'
import { updateItems } from '../../features/expenseSlice'
import {useState} from "react"
import { categoryList } from '../../pages/Addexpenses'
function ExpenseItem({expenseArray, showAllData}) {

  const dispatch = useDispatch()



  function handleDelete(e, id){
    e.preventDefault()
    console.log(id);
    dispatch(deleteItem(id)) // all the delete is handled by redux reducers
  }
  

  return (

    <div className=" mx-auto w-[60%] p-4 flex flex-col justify-center items-center">
    <div className="   grid grid-cols-[4fr_2fr_2fr_2fr_1fr_1fr] gap-1  ">
        {/*list headers*/}
        <div className='bg-[#ea5322]  px-2 mb-1  py-1 text-lg text-white'>Expense</div>
        <div className='bg-[#ea5322] px-2 mb-1  py-1 text-lg text-white'>Amount</div>
        <div className='bg-[#ea5322] px-2 mb-1  py-1 text-lg text-white'>Catagory</div>
        <div className='bg-[#ea5322] px-2 mb-1  py-1 text-lg text-white'>Date</div>
        <div className='bg-[#ea5322]  px-2 mb-1  py-1 text-lg text-white col-span-2  text-center'>Action</div>
    


        {/*list datas*/}
        {
      expenseArray.map((item,index) =>  { // each time array updates this whole function re-executes and latest values
        // are added  from here 


        //local callback fn for each item
      //item is the object containing id , expense name , amount , date an category

        function handleChange (e) {
          const attributeKey = e.target.name
        
          setUpdatedData( prevdata =>  { 
            return {
            ...prevdata,
            [attributeKey]: e.target.value
            }
          })
        }
          
  function handleUpdate() {
   
    
    console.log("isEditable" , isEditable);
    
    
    if(!isEditable) return
    if(isEditable){
      updateItems(updatedData)
    }


  }
          
          
        

        if(!showAllData && index > 2){
          return 
        }
        return (
        <> 
        <input type='text' id='expense' name="expense" readOnly={!isEditable} onChange={handleChange} className={`bg-[#5763ab] text-[#fbe6e4] px-2 py-0.5 ${item.id} ` } value={updatedData.expense} />
        <input type='number'  id='amount' name="amount" readOnly={!isEditable} onChange={handleChange} className={`bg-[#5763ab] text-[#fbe6e4] px-2 py-0.5 ${item.id} `} value={updatedData.amount}/>
        <select id="category"  name="category"  onChange={handleChange} disabled={!isEditable} className={` ${item.id} ${isEditable ? "" : "appearance-none"} bg-[#5763ab] text-[#fbe6e4] px-2 py-0.5`}>
              {categoryList.map(category => (
                <option value={category} selected={item.category === category}>{category}</option>
              ) )}          
        </select>
        < input type='date' id='date' name="date" readOnly={!isEditable} onChange={handleChange} className={`bg-[#5763ab] text-[#fbe6e4] px-2 py-0.5 ${item.id} ` } value={updatedData.date}/>
        <button className='bg-cyan-500 px-2 py-0.5' 
          onClick={(e)=> { 
            e.preventDefault()
            setIsEditable(prevValue=> !prevValue)
            handleUpdate()
          }} // updates the data on save
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