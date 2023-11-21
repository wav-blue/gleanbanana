import Card from "../../UI/Card";

const Recommendations = () => {
  return (
    <>
      <div>추천상품</div>
      <div className="recommendation__wrapper">
        <div className="recommendation">
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
      </div>
    </>
  );
};

export default Recommendations;
