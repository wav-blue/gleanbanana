import NavBar from "./NavBar";
import NavSearchBar from "./NavSearchBar";

const Layout = () => {
  return (
    <div className="layout__wrapper">
      <div className="layout">
        <NavBar />
        <hr />
        <NavSearchBar />
      </div>
    </div>
  );
};

export default Layout;
