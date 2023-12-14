import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import useApi from "../../../hooks/useApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const [chartData, setChartData] = useState(null);
  const [data, setData] = useState(null);

  const { trigger, result, reqIdentifier, loading, error } = useApi({
    method: "get",
    path: `/graph`,
    shouldInitFetch: true,
  });

  const getData = async () => {
    await trigger({
      applyResult: true,
      isShowBoundary: true,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log("charts 렌더링!");
  }, []);

  useEffect(() => {
    if (result?.data !== undefined) {
      setChartData(result?.data);
    }
  }, [result?.data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        align: "end",
      },
    },
  };

  useEffect(() => {
    console.log("요기", chartData);
    if (chartData !== null) {
      setData({
        labels: chartData.x,
        datasets: [
          {
            label: "바나나 인덱스",
            data: chartData.y.map((data) => (data / 100).toFixed(2)),
            backgroundColor: "#f6e173",
            scale: 100,
          },
        ],
      });
    }
  }, [chartData]);

  return (
    <Link to="/about">
      <div className="chart">
        {chartData && data && (
          <Bar options={options} data={data} style={{ width: "1020px" }} />
        )}
      </div>
    </Link>
  );
};

export default Charts;
