import ConsumerInfo from "../order/ConsumerInfo";
import DeleveryInfo from "../order/DeleveryInfo";
import OrderedProduct from "../order/OrderedProduct";
import OrderedInfo from "../order/OrderedInfo";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useApi from "../../../hooks/useApi";
import { useSelector } from "react-redux";

const OrderedDetail = () => {
  return (
    <div className="ordered__wrapper">
      <div className="ordered__info">
        <div className="title title__head">주문/결제</div>
        <div className="line line__out" />
        <div className="title title__element">구매자 정보</div>
        <div className="line line__in" />
        <ConsumerInfo />
        <div className="line line__out" />
        <div className="title title__element">배송 정보</div>
        <div className="line line__in" />
        <DeleveryInfo />
        <div className="line line__out" />
        <div className="title title__element">배송 물품 내역 (3)</div>
        <div className="line line__in" />
        <OrderedProduct />
        <div className="line line__out" />
        <div className="title title__element">결제정보</div>
        <div className="line line__in" />
        <OrderedInfo />
      </div>
    </div>
  );
};

export default OrderedDetail;
