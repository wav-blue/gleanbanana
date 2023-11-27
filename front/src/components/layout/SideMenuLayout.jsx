import { useMemo } from "react";
import { Link } from "react-router-dom";

const SideMenu = ({ name, to, isNow }) => {
  const sideMenuCls = useMemo(() => (isNow ? "side now" : "side"), [isNow]);
  return (
    <Link to={to} className={sideMenuCls}>
      <div className="side__name">{name}</div>
      <span className="material-symbols-outlined">navigate_next</span>
    </Link>
  );
};

export default SideMenu;
