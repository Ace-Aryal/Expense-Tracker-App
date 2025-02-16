import { LineChart } from '@mantine/charts';
import { data } from './chartData';

function Chart(props) {
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

export default Chart