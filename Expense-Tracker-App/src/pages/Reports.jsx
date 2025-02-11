import React from 'react'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Button } from '@mantine/core';
const Reports = () => {
  return (
    <div id='container' className='flex flex-col mt-8 items-center '>
      <h1 className='text-3xl font-bold text-center mb-4'>Your Expenses Analysis</h1>
      <div className="w-[80vw] flex flex-col">
      <div className="flex justify-between px-2 my-2">
      <Button variant="filled" color="violet" >Set Budget</Button> {/* if bujdet is 0 setBudjet else Update Budjet*/}

        <div>Spent $200 in 18 days </div>
      </div>
      <div className="container">
        <div className='w-full h-[35vh] bg-amber-300'> Graph on center and 1 trackers on each side   </div>
        <h1 className='text-center text-xl font-semibold '>Message</h1>
        <div className='flex justify-around'>
    <div className='w-[50px] h-[50px] bg-amber-700'></div>
    <div className='w-[50px] h-[50px] bg-amber-700'></div>
    <div className='w-[50px] h-[50px] bg-amber-700'></div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Reports