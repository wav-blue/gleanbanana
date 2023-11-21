const Category = ({ imgSrc, imgAlt }) => {
  return (
    <div className="categories__wrapper">
      <div className="categories">
        <img src={imgSrc} alt={imgAlt} />
      </div>
      <div>{imgAlt}</div>
    </div>
  );
};

export default Category;
