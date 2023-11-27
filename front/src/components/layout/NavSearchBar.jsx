import ButtonCommon from "../UI/ButtonCommon";
import InputCommon from "../UI/InputCommon";
import Logo from "./Logo";
import MenuBtn from "./MenuBtn";

const NavSearchBar = () => {
  return (
    <div className="navSearch__wrapper">
      <Logo />
      <div className="navSearch">
        <form>
          <InputCommon
            label=""
            id=""
            value=""
            className="search"
            onChange=""
            placeholder="원하는 식재료를 입력하세요."
          />
          <ButtonCommon design="none" type="submit">
            <span className="material-symbols-outlined">search</span>
          </ButtonCommon>
        </form>
      </div>
      <MenuBtn />
    </div>
  );
};

export default NavSearchBar;
