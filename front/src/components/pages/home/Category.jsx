import { Link } from "react-router-dom";

const Category = ({ imgSrc, imgAlt }) => {
  return (
    <div className="category__wrapper">
      <div className="category">
        <Link className="category--link" to={`/items?category=${imgAlt}`}>
          <img src={imgSrc} alt={imgAlt} />
        </Link>
      </div>
      <div>{imgAlt}</div>
    </div>
  );
};

export default Category;
