import ButtonCommon from "../UI/ButtonCommon";
import InputCommon from "../UI/InputCommon";
import Logo from "./Logo";
import MenuBtn from "./MenuBtn";
import Search from "../icons/Search";

const NavSearchBar = () => {
  // const barWidth = window.innerWidth;
  // const isBig = useEffect((barWidth) => barWidth > 768, [barWidth]);
  const isBig = window.innerWidth > 768;
  console.log(window.innerWidth);
  //크기에 따라서 placeholder 달리 하고 싶음
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
            placeholder={isBig ? "원하는 식재료를 입력하세요." : ""}
          />
          <ButtonCommon design="none" type="submit">
            <Search />
          </ButtonCommon>
        </form>
      </div>
      <MenuBtn />
    </div>
  );
};

export default NavSearchBar;
