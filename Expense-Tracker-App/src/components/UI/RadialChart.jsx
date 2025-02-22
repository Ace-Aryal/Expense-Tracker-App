// chart for expense v budget
import { DonutChart } from '@mantine/charts';
import { useState } from 'react';

function RadialChart({expense , budget}) { //
  const [percentage , setPercentage ] =  useState(expense/budget*100 || 0) //for optimization
  const  data = [
    { name: 'Expended',
       value: 0,
       color: percentage <= 50 ? 
      'limegreen' : (percentage <= 75 && percentage > 50) ?
       "yellow" : (percentage <=90 && percentage > 75) ?
        "orange" : (percentage > 90 ) ? "red" : "white" },
    {name : 'Available', value :100 , color : 'rgb(250, 250, 250)' }
   
  ];



data[0].value = expense
data[1].value = budget



  return ( 
  <div className="flex flex-col items-center">
  <DonutChart withLabelsLine={false} labelsType="percent" withLabels data={data} chartLabel= {`$ ${expense}/${budget} `}/>
  <span>Expended Of Monthly Budget</span>
  </div>
  )
}

export default RadialChart