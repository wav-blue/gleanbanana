import customer1 from "../../../assets/customer1.png";
import customer2 from "../../../assets/customer2.png";

const Problem = () => {
  return (
    <section className="about__section">
      <article className="about__div-big">
        <h1 className="about__head">식품의 탄소 배출량, 줄일 수 있을까요?</h1>

        <article className="about__div-left">
          <img src={customer1} alt="customer1" />
          <article className="about__div-ssmall">
            <h3>
              식품 소비 하나가 환경에 얼마나 영향을 주는지 판단하기 어려워요.
            </h3>
            <p>
              탄소를 배출한다는건 알지만 그 양이나 영향력은 잘 와닿지 않아요.
            </p>
          </article>
        </article>
        <article className="about__div-right">
          <article className="about__div-ssmall">
            <h3>
              친환경 식품 소비, 어떤 기준과 방법으로 실천해야 할지도 모르겠어요.
            </h3>
            <p>
              친환경적인 식습관이 갖고 싶은데 어떻게 하면 실천할 수 있을까요?
            </p>
          </article>
          <img src={customer2} alt="customer2" />
        </article>
      </article>
    </section>
  );
};

export default Problem;
