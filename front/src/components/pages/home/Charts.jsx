import chart from "../../../assets/dataset-cover.png";

const Charts = () => {
  return (
    <div className="chart">
      <img
        src={chart}
        alt="chartBanana"
        className="chart--img"
        loading="lazy"
      />
    </div>
  );
};

export default Charts;

// import React, { useEffect, useState } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import { useRecoilState } from "recoil";
// import { urlState } from "../../src/recoilState";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function Lastweek() {
//   const [rootUrl, setRootUrl] = useRecoilState(urlState);
//   const [chatData, setChatData] = useState([]);

//   useEffect(() => {
//       const fetchData = async () => {
//           try {
//               const response = await fetch(
//                   `${rootUrl}/admin/dashboard/lastweek`
//               );
//               const json = await response.json();
//               setChatData(json.data);
//           } catch (error) {
//               console.log("Error :", error);
//           }
//       };
//       fetchData();
//       console.log(chatData);
//   }, []);

//   const options = {
//       responsive: true,
//       plugins: {
//           legend: {
//               position: "top",
//           },
//           title: {
//               display: true,
//               text: "지난 7일 간 채팅 건수",
//           },
//       },
//   };

//   let labels = [];
//   if (chatData.length > 0) {
//       labels = chatData.map((data) => data.x);
//   }

//   const data = {
//       labels,
//       datasets: [
//           {
//               label: "채팅 건수",
//               data: chatData.map((data) => data.y),
//               borderColor: "rgb(255, 99, 132)",
//               backgroundColor: "rgba(255, 99, 132, 0.5)",
//           },
//       ],
//   };
//   return (
//       <div>
//           {chatData.length > 0 && <Line options={options} data={data} />}
//       </div>
//   );
// }

// export default Lastweek
