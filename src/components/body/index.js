import axios from "axios";
import "./index.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { setBasket, setProducts } from "../../redux/action/action";
import Productfliter from "../products/productfliter/productfliter";
import Basket from "../basket";
import { Container, Row, Col } from "react-bootstrap";

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
      <Container>
        {loading ? (
          <div>Loading....</div>
        ) : (
          <Productfliter filterProduct={filterProduct} props={categoryList} />
        )}
        <div className="body-main">
          <Row>
            {products.map((product) => {
              let stockCount = 0;
              basket.forEach((item) => {
                if (item.id === product.id) {
                  stockCount++;
                }
              });
              return (
                <Col sm="3">
                  <div className="products" key={product.id}>
                    <div className="product-image">
                      <img
                        src="https://electronic-ecommerce.herokuapp.com/fantechHeadset.jpg"
                        alt="img"
                      />
                    </div>
                    <div className="details">
                      <h6>{product.name}</h6>
                      <div>
                        <span className="heading">Price:</span>
                        Rs{usTors(product.price)}
                      </div>
                      <div>
                      <span className="heading">Stock :</span>
                        {parseInt(product.stock) - stockCount}
                      </div>
                      <div>
                        <span className="heading">Categories:</span>
                        {product.category.join(", ")}
                      </div>
                      <div>
                        <span className="heading">Date:</span>
                        {moment(product.createDate).format("DD-MM-YYYY")}
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
                              category: product.category,
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
                </Col>
              );
            })}
          </Row>
        </div>
      </Container>
      <div className="basket">
        <Basket usTors={usTors} />
      </div>
    </div>
  );
};
export default Body1;
