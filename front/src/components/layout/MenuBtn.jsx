import { Link } from "react-router-dom";
import Likes from "../icons/Likes";
import Carts from "../icons/Carts";
import Users from "../icons/Users";
import { useSelector } from "react-redux";

// { icon: "account_circle", link: "/myPage", name: "마이페이지", isLogin: false },

const MenuBtn = () => {
  //로그인했으면 보여주고
  //안했으면 보여주지마
  const isLoggedIn = useSelector((state) => state.user?.userInfo?.user_id);
  const MenuArray = [
    { icon: <Likes />, link: "/like", name: "찜하기", visable: isLoggedIn },
    { icon: <Carts />, link: "/cart", name: "장바구니", visable: isLoggedIn },
    {
      icon: <Users />,
      link: "/myPage",
      name: "마이페이지",
      visable: isLoggedIn,
    },
  ];

  console.log(isLoggedIn);
  return (
    <div className="menuBtn__wrapper">
      {MenuArray.map((menu, idx) => {
        if (menu.visable) {
          return (
            <Link key={`menu-${idx}`} to={menu.link} className="menuBtn">
              {menu.icon}
              {menu.name}
            </Link>
          );
        }
      })}
    </div>
  );
};

export default MenuBtn;
