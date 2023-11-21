import Categories from "./Categories";

const imagesArray = [];

const Home = () => {
  return (
    <div className="home__div">
      {imagesArray.map((img) => (
        <Categories imgSrc={img} />
      ))}
      <div className="div">여러div들</div>
    </div>
  );
};

export default Home;
