import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import { slickSettings as settings } from "../constants/slickSettings";
import { getProductsList } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Home() {
  const data = useSelector((state) => state.productReducer.productList);
  const [loading, setLoading] = useState(false);
  const componentMounted = useRef(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      if (componentMounted) {
        // setData(await response.clone().json());
        dispatch(getProductsList(await response.clone().json()));
        setLoading(false);
      }
      return () => {
        componentMounted.current = false;
      };
    };
    if (!data.length) getProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="hero">
      <div className="card bg-dark text-white border-0">
        <img
          src="/assets/bg.jpg"
          className="card-img"
          alt="Background"
          height="550px"
        />
        <div className="card-img-overlay d-flex flex-column justify-content-center">
          <div className="container">
            <h5 className="card-title display-4 fw-bolder mb-0">
              NEW SEASON ARRIVALS
            </h5>
            <p className="card-text lead fs-2">
              CHECK OUT THE TRENDS OUT THERE!
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <h3 className="display-6 fw-bolder text-center m-5">Top Deals</h3>
        <hr />
        <Slider className="m-5" {...settings}>
          {!loading ? (
            data.map((product) => (
              <NavLink to="/products" className="text-decoration-none text-dark fw-bold fs-4">
                <div className="m-2 p-5">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    height="200px"
                    width="100px"
                  />
                  <h5 className="card-title mb-0 my-5">{product.title}</h5>
                </div>
              </NavLink>
            ))
          ) : (
            <div>
              <div className="col-md-3">
                <Skeleton height={200} width={100} />
              </div>
              <div className="col-md-3">
                <Skeleton height={200} width={100} />
              </div>
              <div className="col-md-3">
                <Skeleton height={200} width={100} />
              </div>
            </div>
          )}
        </Slider>

        <div className="card border-warning m-5 p-5">
          <div className="card-header lead">Thought for today</div>
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <p>Grab it now, tomorrow it might be gone forever.</p>
              <footer className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}
