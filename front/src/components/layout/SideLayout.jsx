import SideMenu from "./SideMenuLayout";
import { useLocation } from "react-router-dom";

const SideMenus = [
  { menuName: "탄소 소비량", to: "/myPage" },
  { menuName: "찜 목록", to: "/like" },
  { menuName: "주문내역", to: "/order" },
  { menuName: "정보 수정", to: "/user" },
  { menuName: "문의내역", to: "/inquiry" },
];

const Side = () => {
  const { pathname } = useLocation();

  return (
    <div className="side__wrapper">
      <div className="side__head">마이페이지</div>
      <div className="side__menuList">
        {SideMenus.map((sidemenu, idx) => (
          <SideMenu
            key={`side-${idx}`}
            name={sidemenu.menuName}
            to={sidemenu.to}
            isNow={pathname === sidemenu.to}
          />
        ))}
      </div>
    </div>
  );
};

export default Side;
