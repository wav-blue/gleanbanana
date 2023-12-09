import { BounceLoader } from "react-spinners";
import Layout from "../../layout/Layout";

const Loading = () => {
  return (
    <div className="load__container">
      <div className="load__header">
        <Layout />
      </div>
      <main className="load__main">
        <BounceLoader color="#f6e173" size={80} />
        <p>잠시만 기다려주세요.</p>
      </main>
    </div>
  );
};

export default Loading;
