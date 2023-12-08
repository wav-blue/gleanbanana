import effect1 from "../../../assets/effect1.png";
import effect2 from "../../../assets/effect2.png";
import effect3 from "../../../assets/effect3.png";

const Project = () => {
  return (
    <section className="about__section">
      <article className="about__div-big">
        <h1 className="about__head">친환경에 반한 바나나</h1>
        <p>
          친환경에 반한 바나나는 바나나 인덱스를 기준으로 모든 상품들의 탄소
          배출량을 표기하여 소비자가 쉽게 저탄소 식품을 선택할 수 있는 구매
          환경을 마련하고자 합니다. 저희 서비스와 함께 친환경, 저탄소 식습관을
          만들어가요.
        </p>

        <article className="about__div-three">
          <article className="about__div">
            <img src={effect1} alt="effect1" />
            <p>
              식품에 의한 탄소 배출량
              <br />
              감소에 대한 필요성을 인지하고
              <br />
              실천할 수 있습니다.
            </p>
          </article>
          <article className="about__div">
            <img src={effect2} alt="effect2" />
            <p>
              식품 선택 및 구매 시<br />
              바나나 인덱스로 탄소 배출량을
              <br />
              빠르게 파악하고
              <br />
              쉽게 비교할 수 있습니다.
            </p>
          </article>
          <article className="about__div">
            <img src={effect3} alt="effect2" />
            <p>
              구매 내역을 기반으로
              <br />
              나의 식품 탄소 배출량 평균을 기록해
              <br />
              저탄소를 습관화할 수 있습니다
            </p>
          </article>
        </article>
      </article>
    </section>
  );
};

export default Project;
