import carbonChart from "../../../assets/carbonChart.png";
import purchase from "../../../assets/purchase.png";

const Intro = () => {
  return (
    <section className="about__section">
      <article className="about__div-big">
        <h1 className="about__head">바나나와 탄소 배출</h1>
        <p>
          바나나 하나가 식탁에 오르기까지 어떤 과정들이 필요한지 알고 계신가요?
          <br />
          어떤 식품이든 생산하고 운송하고 가공하고 조리한 후 섭취가 끝나면
          폐기되는 과정을 따라갑니다. 식품을 소비하는 전과정에서 반드시 탄소가
          배출되는데 무려 전세계 탄소배출량의 26%를 차지하고 있어 그 영향이 작지
          않습니다.
          <br />
          우리나라 식품 소비 습관 이대로 괜찮을까요?
        </p>
      </article>
      <article className="about__div-row">
        <img src={carbonChart} alt="chart" />
        <article className="about__div-small">
          <h3>점점 높아지는 연간 탄소 배출량</h3>
          <p>
            우리나라가 배출하는 탄소량은 매년 증가하고 있습니다. 2020년을
            기준으로 00톤을 배출하며 세계 10위를 차지하기도 했습니다.
            <br />
            탄소 중립을 위해 정부와 단체들이 정말 많은 노력을 하지만, 오히려
            탄소 배출량은 늘어나기만 합니다. 여러 정책과 전세계적인 노력도
            필요하지만 개인의 실천과 노력이 더 중요해지고 있습니다.
          </p>
        </article>
      </article>
      <article className="about__div-row">
        <article className="about__div-small">
          <h3>높아지는 지속가능한 식품 구매 욕구</h3>
          <p>
            물론 소비자의 친환경 식습관에 대한 관심과 지속가능한 선택의 욕구도
            높아지고 있습니다. 다른 제품군들보다도 식품에 대한 지속가능성을
            고민하는 사람이 많아지고 있습니다.
            <br />
            관심과는 별개로, 실제 식품 구매 시 지속가능성을 최우선 순위로 두는
            사람들은 적습니다. 다양한 이유가 있겠지만, 가격과 접근성이 주요
            원인으로 꼽힙니다. 이에 식품의 탄소 배출량 지표가 필요하다는 의견도
            있었습니다.
          </p>
        </article>
        <img src={purchase} alt="purchase" />
      </article>
    </section>
  );
};

export default Intro;
