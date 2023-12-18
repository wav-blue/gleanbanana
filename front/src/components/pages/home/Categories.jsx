import { imagesArray } from "../../../utils/categories";
import Category from "./Category";
import { Link } from "react-router-dom";

// Alcohol , Nuts , Drink , Meat, Fish, Bread , Snack, Fruit, Vegetables, Dairy, Meal, Etc

const Categories = (props) => {
  return (
    <div className="categories__wrapper">
      <div className="categories">
        <div className="categories--name">카테고리</div>
        {props.showAllBtn && (
          <div className="categories--more">
            <Link to="/products">모든 상품 보기 &gt;</Link>
          </div>
        )}
      </div>
      <ul>
        {imagesArray.map((img, idx) => (
          <li key={`imgs-${idx}`}>
            <Category
              imgSrc={img.photo}
              imgAlt={img.name}
              category={img.category}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Categories;
