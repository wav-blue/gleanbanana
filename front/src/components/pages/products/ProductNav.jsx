import ButtonCommon from "../../UI/ButtonCommon";

const ProductNav = () => {
  return (
    <>
      <article className="product__article2">
        <section className="product__section4">
          <ButtonCommon design="large">상품상세</ButtonCommon>
          <ButtonCommon design="large">상품평</ButtonCommon>
          <ButtonCommon design="large">상품문의</ButtonCommon>
        </section>
      </article>
      <article className="product__article3">
        <section className="product__section5">
          <div className="product__section5--photo">상품 상세 사진 </div>
        </section>
        <div className="product__section5--button">
          <ButtonCommon design="medium">더보기</ButtonCommon>
        </div>
      </article>
    </>
  );
};

export default ProductNav;
