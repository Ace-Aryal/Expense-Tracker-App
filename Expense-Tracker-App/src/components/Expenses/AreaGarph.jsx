import { AreaChart } from '@mantine/charts';
import { data } from './chartData';

function AreaGraph() {
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