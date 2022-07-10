import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromBasket } from "../../redux/action/action";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
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
      {basket.map((item) => {
        return (
          <div className="basket-main">
            <Row className="align-items-center">
              <Col md={4}>
                <div className="basket-image">
                  <img src={item.image} alt="img" />
                </div>
              </Col>
              <Col md={4}>
                <div className="discription">
                  <div className="item-name">
                    <h5>{item.name}</h5>
                    <div className="item-price">
                      <span className="heading">Rs</span>
                      {usTors(item.price)}
                    </div>

                    <div className="item-price">
                      <span className="heading">Category:</span>
                      {item.category.join(" , ")}
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="button">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      dispatch(removeFromBasket(item.id));
                    }}
                  >
                    Remove from basket
                  </button>
                </div>
              </Col>
            </Row>
          </div>
        );
      })}
      <hr />
      <div className="checkout-del">
        <Row className="align-items-center">
          <Col md={6}>
            <div>
              {" "}
              <h6>
                Total: Rs <span>{getBasketTotal(basket)}</span>
              </h6>
            </div>
          </Col>
          <Col md={6}>
            <div className="checkout-button">
              <button
                className="btn btn-primary"
                disabled={empts}
                onClick={navigates}
              >
                Checkout
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Basket;
