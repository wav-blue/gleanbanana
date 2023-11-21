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
