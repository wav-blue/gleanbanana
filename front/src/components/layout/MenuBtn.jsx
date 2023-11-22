import { Link } from "react-router-dom";

const MenuArray = [
  { icon: "favorite", link: "/likeView", name: "찜하기" },
  { icon: "shopping_cart", link: "/cartView", name: "장바구니" },
  { icon: "account_circle", link: "/myPage", name: "마이페이지" },
  // { icon: "account_circle", link: "/myPage", name: "마이페이지", isLogin: false },
];

const MenuBtn = () => {
  return (
    <div className="menuBtn__wrapper">
      {MenuArray.map((menu, idx) => (
        <Link key={`menu-${idx}`} to={menu.link} className="menuBtn">
          <span className="material-symbols-outlined">{menu.icon}</span>
          {menu.name}
        </Link>
      ))}
    </div>
  );
};

export default MenuBtn;
