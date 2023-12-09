import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <div className="logo__wrapper">
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>
    </div>
  );
};

export default Logo;
