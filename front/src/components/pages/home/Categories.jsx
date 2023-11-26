import alchol from "../../../assets/alchol.png";
import bread from "../../../assets/dessert1.png";
import dairy from "../../../assets/dairy.png";
import fruit from "../../../assets/fruits1.png";
import meat from "../../../assets/meat.png";
import nuts from "../../../assets/nuts.png";
import fish from "../../../assets/seafood.png";
import snack from "../../../assets/snacks1.png";
import drink from "../../../assets/soft-drink.png";
import vegetable from "../../../assets/vegetable1.png";
import meal from "../../../assets/meal.png";
import etc from "../../../assets/more.png";
import Category from "./Category";
import { Link } from "react-router-dom";

// Alcohol , Nuts , Drink , Meat, Fish, Bread , Snack, Fruit, Vegetables, Dairy, Meal, Etc

const imagesArray = [
  { photo: snack, name: "간식류", category: "snack" },
  { photo: fruit, name: "과일", category: "fruit" },
  { photo: meal, name: "곡류", category: "meal" },
  { photo: nuts, name: "견과류", category: "nuts" },
  { photo: dairy, name: "유제품", category: "dairy" },
  { photo: meat, name: "육류", category: "meat" },
  { photo: drink, name: "음료", category: "drink" },
  { photo: bread, name: "제과류", category: "bread" },
  { photo: alchol, name: "주류", category: "alchol" },
  { photo: vegetable, name: "채소", category: "vegetable" },
  { photo: fish, name: "해산물", category: "fish" },
  { photo: etc, name: "기타", category: "etc" },
];

const Categories = (props) => {
  return (
    <div className="categories__wrapper">
      <div className="categories">
        <div className="categories--name">카테고리</div>
        {props.showAllBtn && (
          <div className="categories--more">
            <Link to="/products">
              모든 상품 보기
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "10px" }}
              >
                arrow_forward_ios
              </span>
            </Link>
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
