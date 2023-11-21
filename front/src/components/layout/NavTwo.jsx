import InputCommon from "../UI/InputCommon";
import Logo from "./Logo";

const NavTwo = () => {
  return (
    <div className="navTwo__wrapper">
      <div className="navTwo">
        <Logo />
        <div>
          <InputCommon />
        </div>
      </div>
    </div>
  );
};

export default NavTwo;
