import InputCommon from "../UI/InputCommon";
import Logo from "./Logo";
import MenuBtn from "./MenuBtn";

const NavTwo = () => {
  return (
    <div className="navTwo__wrapper">
      <Logo />
      <div className="navTwo">
        <InputCommon label="" id="" value="" className="search" onChange="" />
        <span class="material-symbols-outlined">search</span>
      </div>
      <MenuBtn />
    </div>
  );
};

export default NavTwo;
