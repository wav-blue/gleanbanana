import { Link } from "react-router-dom";
import Likes from "../icons/Likes";
import Carts from "../icons/Carts";
import Users from "../icons/Users";

const MenuArray = [
  { icon: <Likes />, link: "/like", name: "찜하기" },
  { icon: <Carts />, link: "/cart", name: "장바구니" },
  { icon: <Users />, link: "/myPage", name: "마이페이지" },
  // { icon: "account_circle", link: "/myPage", name: "마이페이지", isLogin: false },
];

const MenuBtn = () => {
  return (
    <div className="menuBtn__wrapper">
      {MenuArray.map((menu, idx) => (
        <Link key={`menu-${idx}`} to={menu.link} className="menuBtn">
          {menu.icon}
          {menu.name}
        </Link>
      ))}
    </div>
  );
};

export default MenuBtn;
