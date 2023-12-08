const BananaIndex = () => {
  return (
    <section className="about__section">
      <article className="about__div-big">
        <h1 className="about__head">바나나 인덱스는 어떤가요?</h1>
        <p>
          소비자들의 어려움을 해결하기 위해 친환경에 반한 바나나가 제시하는
          새로운 기준이 바로 바나나 인덱스입니다.
          <br />
          바나나 인덱스는 바나나 1kg을 기준으로 다른 식품들의 상대적인
          탄소배출량을 비교한 지표입니다. 식품별로 바나나와 비교했을 때
          얼마만큼의 탄소를 소비하는지 쉽게 파악할 수 있는 기준이 됩니다.
        </p>
        <img src="" alt="banana" />
        <p>
          바나나는 소비 전과정에서의 기후 영향과 영양가가 중간 정도라 적합한
          기준점이 됩니다.
        </p>
      </article>
      <article className="about__div-back">
        <article className="about__div-small">
          <h3>바나나인덱스 기준으로 보면,</h3>
          <p>소비하려는 음식들의 평균 탄소 배출량을 쉽게 비교할 수 있습니다.</p>
        </article>
        <img src="" alt="bananaIndex" />
      </article>
    </section>
  );
};

export default BananaIndex;
