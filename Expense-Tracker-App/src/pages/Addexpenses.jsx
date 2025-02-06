import React from 'react'

const Addexpenses = () => {





  return (
    <div className='flex flex-col justify-center items-center w-[100vw] h-[85vh]' id='container'>
      <h1 className='text-center text-3xl mb-6'>Add Expenses</h1>
      <form className='flex flex-col items-center bg-[#a7c6ed] 
      text-xl p-6 rounded-md px-10 shadow-gray shadow-xl text-center' action="">
        <div id="input-grid" className='grid grid-cols-2 gap-4 gap-y-6 p-2  '>
        <div className='flex gap-2'>
          <label className='' htmlFor="expense">Expense</label>
          <input className='focus:outline-none  focus:ring-indigo-600 
          focus:ring-2 rounded' type="text" name="expense" id="expense" placeholder="Enter expense" required />
        </div>
        <div className='flex gap-2'>
          <label className='' htmlFor="amount" >Amount</label>
          <input className='focus:outline-none focus:ring-indigo-600 
          focus:ring-2 rounded' type="number" name="amount" id="amount" min={1} placeholder="Enter amount" required />
        </div>
        <div className='flex gap-2'>
          <label className='' htmlFor="date">Date</label>
          <input className='focus:outline-none focus:ring-indigo-600 
          focus:ring-2 rounded' type="date" name="date" id="date" required />
        </div>
        <div className='flex gap-4'>
          <label className='' htmlFor="category">Category</label>
          <select className='focus:outline-none focus:ring-indigo-600 
          focus:ring-2 rounded' name="category" id="category" required> { /*do it dynamically using array of catgories */}
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="bills">Bills</option>
            <option value="others">Others</option>
          </select>
          </div>
          </div>
        <button className='mt-10 rounded bg-indigo-400 p-1 px-2 text-white ' type="submit">Add Expense</button>
      </form>
    </div>
  )
}

export default Addexpenses