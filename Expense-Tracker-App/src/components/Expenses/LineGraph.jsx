import { LineChart } from '@mantine/charts';

import { useSelector , useDispatch } from 'react-redux';
import { createDatasFromExpenseData } from '../../features/chartDataSlice';
import { useEffect } from 'react';

function LineGraph(props) {
  const dispatch = useDispatch()

  const expense = useSelector(state=> state.expense.expenses)
  
  
  
   
   const data = useSelector(state=> state.chartData.datas.weekData)
  console.log(data);
  
  return (
    <LineChart
      h={props.height  || 300}
      data={data}
      dataKey="date"
      series={[
        { name: 'amount', color: 'indigo.6' },
      ]}
      curveType="linear"
    />
  );
}

export default LineGraph