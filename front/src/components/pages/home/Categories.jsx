import alchol from "../../../assets/alchol.png";
import dessert from "../../../assets/dessert1.png";
import dairy from "../../../assets/dairy.png";
import fruits from "../../../assets/fruits1.png";
import meat from "../../../assets/meat.png";
import nuts from "../../../assets/nuts.png";
import seafood from "../../../assets/seafood.png";
import snacks from "../../../assets/snacks1.png";
import softdrink from "../../../assets/soft-drink.png";
import vegetable1 from "../../../assets/vegetable1.png";
import meal from "../../../assets/meal.png";
import more from "../../../assets/more.png";
import Category from "./Category";

const imagesArray = [
  { photo: alchol, name: "주류" },
  { photo: nuts, name: "견과류" },
  { photo: softdrink, name: "음료" },
  { photo: meat, name: "고기" },
  { photo: seafood, name: "해산물" },
  { photo: dessert, name: "제과류" },
  { photo: snacks, name: "간식류" },
  { photo: fruits, name: "과일" },
  { photo: vegetable1, name: "채소" },
  { photo: dairy, name: "유제품" },
  { photo: meal, name: "곡류" },
  { photo: more, name: "기타" },
];

const Categories = () => {
  return (
    <div className="categories__wrapper">
      <div className="categories--name">카테고리</div>
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
