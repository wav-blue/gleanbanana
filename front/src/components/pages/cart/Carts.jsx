import tomato from "../../../assets/tomato.png";
import salad from "../../../assets/salad.png";
import peanut from "../../../assets/peanut.png";
import oats from "../../../assets/oats.png";
import banana from "../../../assets/banana.png";
import Cart from "./Cart";
import ButtonCommon from "../../UI/ButtonCommon";
import CartsHeader from "./CartsHeader";
import CartsButton from "./CartsButton";
import CartsTotal from "./CartsTotal";

const carts = [
  {
    img: tomato,
    itemName: "대추방울토마토",
    itemPrice: "20020",
    bananaIdx: 2.59,
    deliveryDate: "2023-11-25",
    deliveryFee: 0,
  },
  {
    img: salad,
    itemName: "팜에이트 무농약 유러피안 샐러드 꾸러미",
    itemPrice: "21560",
    bananaIdx: 2.38,
    deliveryDate: "2023-11-25",
    deliveryFee: 0,
  },
  {
    img: peanut,
    itemName: "맛을 그리다 볶음 땅콩 알땅콩 1kg 23년 햇땅콩",
    itemPrice: "9600",
    bananaIdx: 3.6,
    deliveryDate: "2023-11-25",
    deliveryFee: 0,
  },
  {
    img: oats,
    itemName: "바른곡물 국산 유기농 귀리쌀",
    itemPrice: "37900",
    bananaIdx: 1.78,
    deliveryDate: "2023-11-25",
    deliveryFee: 0,
  },
];

const Carts = () => {
  // const [carts, setCarts] = useState([])
  //   const { trigger, result, reqIdentifier, loading, error } = useApi({
  //     method: "get",
  //     path: "/cart", //확인필요
  //     data: {},
  //     shouldInitFetch: false,
  //   });

  const totalPrice = carts.reduce((acc, cur) => acc + +cur.itemPrice, 0);
  const totalDeliveryFee = carts.reduce(
    (acc, cur) => acc + +cur.deliveryFee,
    0
  );

  //GET요청
  //   useEffect(() => {
  // if(reqIdentifier !== 'getData') return;
  //     trigger({
  //   method: 'get',
  //   path: `/cart/${id}`,
  //   data: {},
  //   applyResult : true,
  //   isShowBoundary : true,
  //   shouldSetError : true,
  // });
  //   }, []);

  // RESULT가 변하면 세팅
  //   useEffect(() => {
  // if(reqIdentifier !== 'getData') return;
  //    setCarts(result.data?.cart)
  //   }, [result.data, reqIdentifier]);

  return (
    <div className="carts__wrapper">
      <div className="carts__header">
        <CartsHeader />
        {carts.map((cart, index) => (
          <Cart cart={cart} key={`carts-${index}`} />
        ))}
      </div>
      <CartsTotal totalPrice={totalPrice} totalDeliveryFee={totalDeliveryFee} />
      <CartsButton />
    </div>
  );
};

export default Carts;
