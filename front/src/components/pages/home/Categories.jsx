import alchol from "../../../assets/alchol.png";
import dessert from "../../../assets/dessert1.png";
import dairy from "../../../assets/dairy.png";
import fruits from "../../../assets/fruits1.png";
import meat from "../../../assets/meat.png";
import nuts from "../../../assets/nuts.png";
import seafood from "../../../assets/seafood.png";
import snacks from "../../../assets/snacks1.png";
import Category from "./Category";

const imagesArray = [
  { photo: alchol, name: "alchol" },
  { photo: fruits, name: "fruits1" },
  { photo: dessert, name: "dessert1" },
  { photo: dairy, name: "dairy" },
  { photo: meat, name: "meat" },
  { photo: nuts, name: "nuts" },
  { photo: seafood, name: "seafood" },
  { photo: snacks, name: "snacks1" },
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
