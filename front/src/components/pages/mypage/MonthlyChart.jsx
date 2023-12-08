import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useApi from "../../../hooks/useApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyChart = () => {
  const [chartData, setChartData] = useState(null);
  const [data, setData] = useState(null);

  const { trigger, result, reqIdentifier, loading, error } = useApi({
    method: "get",
    path: `/myPage`,
    shouldInitFetch: false,
  });

  useEffect(() => {
    const getData = async () => {
      await trigger({
        applyResult: true,
        isShowBoundary: true,
      });
    };
    getData();
  }, []);
  console.log("data: ", result);

  // useEffect(() => {
  //   if (result?.data !== undefined) {
  //     setChartData(result?.data);
  //   }
  // }, [result?.data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        align: "end",
      },
    },
  };

  // useEffect(() => {
  //   console.log("요기", chartData);
  //   if (chartData !== null) {
  //     setData({
  //       labels: chartData.x,
  //       datasets: [
  //         {
  //           label: "바나나 인덱스",
  //           data: chartData.y,
  //           backgroundColor: "#f6e173",
  //           scale: 100,
  //         },
  //       ],
  //     });
  //   }
  // }, [chartData]);

  return (
    <div className="monthlychart__wrapper">
      <div className="monthlychart__head">최근 구매내역</div>
      {/* <Line options={options} data={data} /> */}
    </div>
  );
};

export default MonthlyChart;
