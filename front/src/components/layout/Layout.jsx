import NavOne from "./NavOne";
import NavTwo from "./NavTwo";

const Layout = () => {
  return (
    <div className="layout__wrapper">
      <div className="layout">
        <NavOne />
        <hr />
        <NavTwo />
      </div>
    </div>
  );
};

export default Layout;
