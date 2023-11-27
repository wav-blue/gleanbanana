import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navBar">
      <Link to="/login">로그인</Link>
      <Link to="/join">회원가입</Link>
    </div>
  );
};

export default NavBar;
