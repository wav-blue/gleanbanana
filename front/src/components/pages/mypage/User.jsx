import Side from "../../layout/SideLayout";

const User = () => {
  return (
    <div className="mypage">
      <div className="mypage__sidebar">
        <Side />
      </div>
      <div className="mypage__content">정보수정페이지</div>
    </div>
  );
};

export default User;
