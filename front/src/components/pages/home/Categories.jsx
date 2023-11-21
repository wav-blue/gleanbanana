import alchol from "../../../assets/alchol.png";
import dessert1 from "../../../assets/dessert1.png";
import dairy from "../../../assets/dairy.png";
import fruits1 from "../../../assets/fruits1.png";
import meat from "../../../assets/meat.png";
import nuts from "../../../assets/nuts.png";
import seafood from "../../../assets/seafood.png";
import snacks1 from "../../../assets/snacks1.png";
import Category from "./Category";

const imagesArray = [
  { photo: alchol, name: "alchol" },
  { photo: fruits1, name: "fruits1" },
  { photo: dessert1, name: "dessert1" },
  { photo: dairy, name: "dairy" },
  { photo: meat, name: "meat" },
  { photo: nuts, name: "nuts" },
  { photo: seafood, name: "seafood" },
  { photo: snacks1, name: "snacks1" },
];

const Categories = () => {
  return (
    <>
      <div>카테고리</div>
      <ul>
        {imagesArray.map((img) => (
          <li key={`imgs-${img.name}`}>
            <Category imgSrc={img.photo} imgAlt={img.name} />
          </li>
        ))}
      </ul>
    </>
  );
};
export default Categories;
