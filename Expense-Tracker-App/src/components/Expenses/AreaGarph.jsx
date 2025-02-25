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
  );
}

export default AreaGraph