import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, getProductDetails } from "../redux/action";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";




export default function Product() {
  const { id } = useParams();
  // const [product, setProduct] = useState([]);
  const product = useSelector((state) => state.productReducer.selectedProduct);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product));
  };


  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      // setProduct(await response.json());
      dispatch(getProductDetails(await response.clone().json()));
      setLoading(false);
    };
    if (`${product.id}` !== id) getProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Loading = () => {
    return (
      <>
        <h1 style={{textAlign: 'center'}}>
      <img
          src="/assets/Spinner3.gif"
          width="64px"
          alt="loader"
         
        />
 </h1>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            minHeight="380px"
            width="410px"
          />
        </div>
        <div className="col md-6">
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead fw-bolder">
            Rating {product.rating && product.rating.rate}
            <i className="fa fa-star text-warning ms-2" />
          </p>
          <h3 className="display-6 fw-bold my-4">₹ {product.price}</h3>
          <p className="lead">{product.description}</p>
          <button
            className="btn btn-outline-dark px-4 py-2"
            onClick={() => addProduct(product)}
          >
            Add to Cart
          </button>
          &nbsp; &nbsp; 
          <button
            className="btn btn-outline-dark px-4 py-2"
            onClick={() => addProduct(product)}
          >
             ❤️
          </button>


          <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
            Go to Cart
          </NavLink>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row py-4">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
}
