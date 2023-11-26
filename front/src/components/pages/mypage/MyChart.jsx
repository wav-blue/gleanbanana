import Charts from "../home/Charts";

const MyChart = () => {
  return (
    <div className="mychart__wrapper">
      <div className="mychart__head">나의 탄소 소비량</div>
      <Charts />
      <div className="mychart__description">설명 글 ~~</div>
    </div>
  );
};

export default MyChart;
