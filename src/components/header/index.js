import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useSelector } from "react-redux";
import "./index.scss";

const Header = () => {
  const basket = useSelector((state) => state.basket.basket);
  return (
    <div className="header-main">
      <div className="header-elements">
        <div className="header-name">
          <h2>Electronic Shop</h2>
        </div>
        {/* <div className="header-basket">
          <ShoppingBasketIcon />
          <span className="baskets-items">{basket?.length}</span>
        </div> */}
      </div>
    </div>
  );
};
export default Header;
