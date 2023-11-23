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
import { useEffect, useState } from "react";

// Alcohol , Nuts , Drink , Meat, Fish, Bread , Snack, Fruit, Vegetables, Dairy, Meal, Etc

const imagesArray = [
  { photo: alchol, name: "주류", category: "alchol" },
  { photo: nuts, name: "견과류", category: "nuts" },
  { photo: drink, name: "음료", category: "drink" },
  { photo: meat, name: "고기", category: "meat" },
  { photo: fish, name: "해산물", category: "fish" },
  { photo: bread, name: "제과류", category: "bread" },
  { photo: snack, name: "간식류", category: "snack" },
  { photo: fruit, name: "과일", category: "fruit" },
  { photo: vegetable, name: "채소", category: "vegetable" },
  { photo: dairy, name: "유제품", category: "dairy" },
  { photo: meal, name: "곡류", category: "meal" },
  { photo: etc, name: "기타", category: "etc" },
];

//props.showAllBtn에서 props를 false로 변경을 했는데도
//DOM업데이트가 되지 않는 현상.
//props를 가지고 state를 변경을 하고 state값에 따라 렌더링 한다고 해도
//변경되지 않음.
const Categories = (props) => {
  const [show, setShow] = useState(false);
  console.log(props.showAllBtn);
  useEffect(() => {
    setShow(props.showAllBtn);
  }, [props.showAllBtn]);

  return (
    <div className="categories__wrapper">
      <div className="categories">
        <div className="categories--name">카테고리</div>
        {show && (
          <div className="categories--more">
            <Link to="/products">
              모든 상품 보기
              <span
                class="material-symbols-outlined"
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
            <Category imgSrc={img.photo} imgAlt={img.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Categories;
