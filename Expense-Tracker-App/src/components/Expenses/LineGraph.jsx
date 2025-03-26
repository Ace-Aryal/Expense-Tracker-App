import { LineChart } from "@mantine/charts";

import { useSelector, useDispatch } from "react-redux";
import { createDatasFromExpenseData } from "../../features/chartDataSlice";
import { useEffect } from "react";

function LineGraph(props) {
  const dispatch = useDispatch();

  // useEffect(()=> {
  //   dispatch(createDatasFromExpenseData(30))
  // },[])

  const data = useSelector((state) => state.chartData.datas.monthData);

  return (
    <div className="flex flex-col items-center">
      <LineChart
        h={props.height || 300}
        data={data}
        dataKey="date"
        series={[{ name: "amount", color: "indigo.6" }]}
        curveType="linear"
      />
      <span className="mt-4 text-indigo-400 font-semibold">
        Your Last 30 Days Expense Trend
      </span>
    </div>
  );
}

export default LineGraph;
