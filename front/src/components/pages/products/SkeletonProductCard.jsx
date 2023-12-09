const SkeletonProductCard = () => {
  return (
    <div className="skeletonCard__wrapper">
      <div className="skeletonCard__img" />
      <div className="skeletonCard__description__wrapper">
        <div className="skeletonCard__description">
          <div className="skeletonCard__description-detail">
            <div className="skeletonCard__name" />
            <div className="skeletonCard__price" />
          </div>
          <div className="skeletonCard__description-index" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonProductCard;
