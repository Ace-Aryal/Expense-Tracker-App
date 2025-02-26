import { AreaChart } from '@mantine/charts';

import { useSelector , useDispatch } from 'react-redux';
import { createDatasFromExpenseData } from '../../features/chartDataSlice';
import {useEffect} from "react"
function AreaGraph() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(createDatasFromExpenseData(7))

    
  }, [dispatch])

  const data = useSelector(state=> state.chartData.datas.weekData)
  console.log("month graph data", data);
  
  return (
    <div className='flex flex-col justify-center items-center'>
    <AreaChart
      h={300}
      data={data}
      dataKey="date"
      series={[
        { name: 'amount', color: 'indigo.6' },
       
      ]}
      curveType="linear"
      withDots={false}
    />
        <span className='mt-4 text-indigo-400 font-semibold'>Your Last 7 Days Expense Trend</span>
   
    </div>
  );
}

export default AreaGraph