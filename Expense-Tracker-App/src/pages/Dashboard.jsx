import React from 'react'


const Dashboard = () => {
  return (
    <>
    <div id='container' className='w-full flex flex-col '>
    <div id="dashboard-top" className='flex justify-between mx-2 my-2 text-xl '>
        <span>Dashboard</span>
        <div >Balance: $100</div>
    </div>
        <div id="graph"></div>



    </div>

    </>
  )
}

export default Dashboard