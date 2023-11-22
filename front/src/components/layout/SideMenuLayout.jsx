import { Link } from "react-router-dom";

const SideMenu = ({ name, to, isNow }) => {
  return (
    <Link to={to} className={`side${isNow ? " now" : ""}`}>
      <div className="side__name">{name}</div>
      <span className="material-symbols-outlined">navigate_next</span>
    </Link>
  );
};

export default SideMenu;
