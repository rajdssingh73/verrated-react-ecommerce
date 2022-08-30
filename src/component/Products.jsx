import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductsList } from "../redux/action";

import { addCart} from "../redux/action";
import ReactStars from "react-rating-stars-component";
import { productCat } from "../constants/productCat";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export default function Products() {
  // const [data, setData] = useState([]);
  const data = useSelector((state) => state.productReducer.productList);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const [selectedCat, setSelectedCat] = useState(productCat.all);
  const componentMounted = useRef(true);
  const dispatch = useDispatch();

 
  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      if (componentMounted) {
        // setData(await response.clone().json());
        dispatch(getProductsList(await response.clone().json()));
        setFilter(await response.json());
        setLoading(false);
      }
      return () => {
        componentMounted.current = false;
      };
    };
    if (!data.length) getProducts();
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

  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat);
    setFilter(updatedList);
    setSelectedCat(cat);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button
            className={`btn ${
              selectedCat === productCat.all ? "btn-dark" : "btn-outline-dark"
            } me-2`}
            onClick={() => {
              setFilter(data);
              setSelectedCat(productCat.all);
            }}
          >
            All
          </button>
          <button
            className={`btn ${
              selectedCat === productCat.MEN ? "btn-dark" : "btn-outline-dark"
            } me-2`}
            onClick={() => filterProduct(productCat.MEN)}
          >
            Men's Cloths
          </button>
          <button
            className={`btn ${
              selectedCat === productCat.women ? "btn-dark" : "btn-outline-dark"
            } me-2`}
            onClick={() => filterProduct(productCat.women)}
          >
            Women's Cloths
          </button>
          <button
            className={`btn ${
              selectedCat === productCat.jewellery
                ? "btn-dark"
                : "btn-outline-dark"
            } me-2`}
            onClick={() => filterProduct(productCat.jewellery)}
          >
            Jwellery
          </button>
          <button
            className={`btn ${
              selectedCat === productCat.electronic
                ? "btn-dark"
                : "btn-outline-dark"
            } me-2`}
            onClick={() => filterProduct(productCat.electronic)}
          >
            Electronics
          </button>
        </div>
        {filter.map((product) => {
          return (
            <>
              <div className="col-md-3 my-3" >
                <div className="card h-100 text-center p-4" key={product.id}>
                 <a href={`/products/${product.id}`}><img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    height="250px"
                  /> </a>
            
                  <div className="card-body">
                    <h5 className="card-title mb-0" style={{Margin:'0px' }}>
                      {product.title.substring(0, 200)}
                    </h5>
                    
                    <p className="card-text lead fw-bold my-0">
                      ₹{product.price}
                    </p>
                    <div className="d-flex justify-content-center">
                      <ReactStars
                        isHalf
                        size="20"
                        value={product.rating.rate}
                        edit={false}
                      />
                      <p className="d-flex align-self-end lead my-2" style={{font:'100px'}} >{` (${product.rating.count})`}</p>
                    </div>
                    <NavLink
                         to={`/products/${product.id}`}
                          className="btn btn-outline-dark">
                           Buy Now
                      </NavLink> 
                      <p
            className="btn btn-outline-dark mx-3 my-0"
            onClick={() => addProduct(product)} >
             ❤️
           </p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
}
