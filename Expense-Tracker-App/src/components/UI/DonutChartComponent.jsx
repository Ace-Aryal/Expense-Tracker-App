// chart to compare different expenses acc to catagories\
import { DonutChart } from '@mantine/charts';
 const data = [
    { name: 'USA', value: 400, color: 'indigo.6' },
    { name: 'India', value: 300, color: 'yellow.6' },
    { name: 'Japan', value: 100, color: 'teal.6' },
    { name: 'Other', value: 200, color: 'gray.6' },
  ];


function DonutChartComponent() {
  return (
  <div className="flex flex-col items-center text-indigo-600 font-semibold">
  <DonutChart data={data}  withLabelsLine={false} labelsType="percent" withLabels/>
  <span>Last 7 Days Expense Breakdown</span>
  </div>
  )
}

export default DonutChartComponent