import { useMemo } from "react";
import { Link } from "react-router-dom";
import Right from "../icons/Right";

const SideMenu = ({ name, to, isNow }) => {
  const sideMenuCls = useMemo(() => (isNow ? "side now" : "side"), [isNow]);
  return (
    <Link to={to} className={sideMenuCls}>
      <div className="side__name">{name}</div>
      <Right />
    </Link>
  );
};

export default SideMenu;
