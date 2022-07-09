import axios from "axios";
import "./index.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { setBasket, setProducts } from "../../redux/action/action";
import Productfliter from "../products/productfliter/productfliter";
import Basket from "../basket";

const Body1 = () => {
  const products = useSelector((state) => state.allProducts.products);
  const basket = useSelector((state) => state.basket.basket);
  const dispatch = useDispatch();
  const [allProducts, setAllProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  const usTors = (amount) => {
    let price = parseFloat(amount.replace("$", ""));
    return price * 126.73;
  };
  //Filtering categories from products
  const filterProduct = (filter) => {
    // let filter = e.target.value;
    let filteredProducts = allProducts.filter((product) => {
      return product.category.includes(filter);
    });
    dispatch(setProducts(filteredProducts));
  };
  //api fetching to the redux
  const fetchProducts = async () => {
    const response = await axios
      .get("https://electronic-ecommerce.herokuapp.com/api/v1/product")
      .catch((err) => {
        console.log(err);
      });
    return response.data.data.product;
  };
  useEffect(() => {
    if (products.length > 0) return;
    fetchProducts().then((data) => {
      setAllProducts([...data]);
      let list = [];
      allProducts.forEach((product) => {
        list = [...new Set([...list, ...product.category])];
      });
      setCategoryList(list);
      filterProduct("electronic");
      setLoading(false);
    });
  });
  return (
    <div className="body">
      <div className="container">
        {loading ? (
          <div>Loading....</div>
        ) : (
          <Productfliter filterProduct={filterProduct} props={categoryList} />
        )}
        <div className="body-main">
          {products.map((product) => {
            let stockCount = 0;
            basket.forEach((item) => {
              if (item.id === product.id) {
                stockCount++;
              }
            })
            return (
              <div className="products" key={product.id}>
                <div className="product-image">
                  <img
                    src="https://electronic-ecommerce.herokuapp.com/fantechHeadset.jpg"
                    alt="img"
                  />
                </div>
                <div>
                  <h6>{product.name}</h6>
                  <div>Price: Rs{usTors(product.price)}</div>
                  <div>Stock : {parseInt(product.stock)-stockCount}</div>
                  <div>categories: {product.category.join(", ")}</div>
                  <div>
                    Date: {moment(product.createDate).format("DD-MM-YYYY")}
                  </div>
                </div>
                <div>
                  <button
                    className="btn btn-primary"
                    disabled={parseInt(product.stock) === stockCount}
                    onClick={() => {
                      dispatch(
                        setBasket({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          stock: product.stock,
                          image:
                            "https://electronic-ecommerce.herokuapp.com/fantechHeadset.jpg",
                        })
                      );
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="basket">
        <Basket usTors={usTors} />
      </div>
    </div>
  );
};
export default Body1;
