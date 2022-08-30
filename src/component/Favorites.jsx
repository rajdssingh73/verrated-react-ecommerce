import React, { useMemo } from "react";
import { useDispatch, useSelector} from "react-redux";
import { addCart, delFav } from "../redux/action";

export default function Fav() {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const totalCost = useMemo(
    () => state.reduce((a, b) => a + b.price * b.qty, 0).toFixed(2),
    [state]
  );

  const ShowFav = () => {
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
                  <p  className="card-text fw-bold my-0">₹{product.price}</p>
                
                  <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => dispatch(delFav(product))}
                    >
                      ❌
                    </button>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <button
                      className="btn btn-outline-secondary"
                      type="button" 
                      onClick={() => dispatch(addCart(product))}
                    >
                      Add to Cart
                    </button>
                  
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
                <h1 className="card-title">Favtorite's Empty 💔</h1>
                <p className="card-text">Add Items whom you love to Wishlist!!!</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <ShowFav />
    
        </>
      )}
    </div>
  );
}
