import { Link } from "react-router-dom";

const NavOne = () => {
  return (
    <div className="navOne">
      <Link to="/login">로그인</Link>
      <Link to="/join">회원가입</Link>
    </div>
  );
};

export default NavOne;
