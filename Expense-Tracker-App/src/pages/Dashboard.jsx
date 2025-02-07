import React from 'react'


const Dashboard = () => {
  return (
    
    <div id='container' className='w-full h-[90vh] flex flex-col mb-4 bg-[#dfe8f1]'>
    <div id="dashboard-top" className='flex justify-between mx-4 my-4 text-xl '>
        <span className='text-3xl font-bold '>Dashboard</span>
        <div className='font-semibold' >Spent $100 this month</div>
    </div>
        <div id="budjet-v-expense-graph" className='  mt-10 not-sm:w-[100vw]   min-w-3/5 sm:h-[40vw] min-h-[40vh] bg-amber-700 self-center '></div>
    <div id="nav-area" className=' text-center mt-6 self-center flex flex-col items-center gap-y-4'> 
      <h2 id='message' className='text-3xl font-bold'>Track Your Spending, Achive Your Goals</h2>
      <div id="buttons" className='flex gap-3 '> 
        <button id="button-add" className='bg-indigo-400 p-3 text-white rounded'>Add Expenses</button>
        <button id="track" className='p-3  border-indigo-400 border-2 rounded hover:text-white hover:bg-indigo-400 hover:border-0'>Track Expenses</button>
      </div>

    </div>


    </div>

    
  )
}

export default Dashboard