import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromBasket } from "../../redux/action/action";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const Basket = ({ usTors }) => {
  const basket = useSelector((state) => state.basket.basket);
  const [empts, setEmpts] = useState(true);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const navigates = () => {
    navigate("/checkout");
  };
  //for checking if the basket is empty
  const empty = () => {
    if (basket.length > 0) {
      setEmpts(false);
    } else {
      setEmpts(true);
    }
  };
  //getting the total price of the basket
  const getBasketTotal = (basket) => {
    let amount = 0;
    basket.forEach((item) => {
      amount += usTors(item.price);
    });
    return amount;
  };

  useEffect(() => {
    empty();
  });


  return (
    <div className="body-basket">
      <div className="container">
        {basket.map((item) => {
          return (
            <div className="basket-main">
              <div className="basket-image">
                <img src={item.image} alt="img" />
              </div>
              <div>
                <div>{item.name}</div>
                <div>Rs {usTors(item.price)}</div>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      dispatch(removeFromBasket(item.id));
                    }}
                  >
                    Remove from basket
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div>
          <div>Total: Rs {getBasketTotal(basket)}</div>
          <div>
            <button
              className="btn btn-primary"
              disabled={empts}
              onClick={navigates}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Basket;
