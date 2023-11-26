import Charts from "../home/Charts";

const MonthlyChart = () => {
  return (
    <div className="monthlychart__wrapper">
      <div className="monthlychart__head">월별 바나나 인덱스 변화</div>
      <Charts />
      <div className="monthlychart__description">설명 글 ~~</div>
    </div>
  );
};

export default MonthlyChart;
