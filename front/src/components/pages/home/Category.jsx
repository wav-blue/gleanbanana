import { Link } from "react-router-dom";

const Category = ({ imgSrc, imgAlt, category }) => {
  return (
    <div className="category__wrapper">
      <div className="category">
        <Link className="category--link" to={`/items?category=${category}`}>
          <img src={imgSrc} alt={imgAlt} />
        </Link>
      </div>
      <div>{imgAlt}</div>
    </div>
  );
};

export default Category;
