// chart for expense v budget
import { DonutChart } from '@mantine/charts';
import { useState } from 'react';

function RadialChart({expense , budget ,size , message}) { //
  const [percentage , setPercentage ] =  useState(expense/budget*100 || 0.1) //for optimization
  
  const  data = [
    { name: 'Expended',
       value: 0,
       color: percentage <= 50 ? 
      'limegreen' : (percentage <= 75 && percentage > 50) ?
       "yellow" : (percentage <=90 && percentage > 75) ?
        "orange" :  "red"  },
    {name : 'Available', value :100 , color : 'rgb(250, 250, 250)' }
   
  ];



data[0].value = expense
data[1].value = (budget - expense) > 0 ? budget-expense : 0.00001 



  return ( 
  <div className="flex flex-col items-center text-indigo-600 font-semibold">
  <DonutChart withLabelsLine={false} labelsType="percent" thickness={10} withLabels data={data} chartLabel= {`$ ${expense}/${budget || 0} `}/>
  <span>{message}</span>
  </div>
  )
}

export default RadialChart