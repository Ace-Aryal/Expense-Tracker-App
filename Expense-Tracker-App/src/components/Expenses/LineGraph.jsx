import { LineChart } from '@mantine/charts';

import { useSelector , useDispatch } from 'react-redux';
import { createDatasFromExpenseData } from '../../features/chartDataSlice';
function LineGraph(props) {
  const dispatch = useDispatch()
   dispatch(createDatasFromExpenseData(7))
   const data = useSelector(state=> state.chartData.datas.weekData)

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