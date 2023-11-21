import { Link } from "react-router-dom";

const Category = ({ imgSrc, imgAlt }) => {
  return (
    <div className="categories__wrapper">
      <Link className="categories" to={`/items?category=${imgAlt}`}>
        <img src={imgSrc} alt={imgAlt} />
      </Link>
      <div>{imgAlt}</div>
    </div>
  );
};

export default Category;
