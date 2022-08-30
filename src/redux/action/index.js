// For Add Item to Cart
export const addCart = (product) => {
  return {
    type: "ADDITEM",
    payload: product,
  };
};

// For Delete Item to Cart
export const delCart = (product) => {
  return {
    type: "DELITEM",
    payload: product,
  };
};

// For Delete Item from Favorites
export const delFav = (product) => {
  return {
    type: "DELITEM",
    payload: product,
  };
};

export const getProductsList = (productsArray) => {
  return {
    type: "PRODUCTSARRAY",
    payload: productsArray,
  };
};

export const getProductDetails = (productData) => {
  return {
    type: "PRODUCTDATA",
    payload: productData,
  };
};
