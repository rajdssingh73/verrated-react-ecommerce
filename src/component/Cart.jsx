import React, { useMemo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, delCart } from "../redux/action";

export default function Cart() {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const totalCost = useMemo(
    () => state.reduce((a, b) => a + b.price * b.qty, 0).toFixed(2),
    [state]
  );

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
  }, [state])

  const ShowCart = () => {
    return (
      <>
        {state.map((product) => (
          <div className="card my-3">
            <div className="row g-0">
              <div className="col-md-4 d-flex justify-content-center">
                <img
                  src={product.image}
                  className="img-fluid rounded-start p-5"
                  alt={product.title}
                  style={{ maxHeight: 300, maxWidth: 300 }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text fw-bold my-0">₹{product.price}</p>
                  <div className="input-group my-2">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => dispatch(delCart(product))}
                    >
                      -
                    </button>
                    <input style={{width:'20'}}
                      type="number"
                      className="form-control"
                      value={product.qty}
                      readOnly
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => dispatch(addCart(product))}
                    >
                      +
                    </button>
                    <p className="card-text lead fw-bold align-self-center ms-2 my-0">
                      Total ₹{product.price * product.qty}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="container">
      {!state.length ? (
        <>
          <div class="card my-5">
            <div class="card-body d-flex justify-content-center">
              <div>
                <h1 className="card-title">Empty Cart</h1>
                <p className="card-text">Come, lets do some shopping!!!</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <ShowCart />
          <div className="col-12">
            <hr />
            <div className="d-flex justify-content-between">
              <h1 className="display-6 fw-bolder">Gross Total</h1>
              <h1 className="display-6 fw-bolder">₹ {totalCost}</h1>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-warning my-2 d-flex ms-auto"
            onClick={(e) => e.preventDefault()}
          >
            Proceed to Pay
          </button>
        </>
      )}
    </div>
  );
}
