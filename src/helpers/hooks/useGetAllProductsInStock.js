import axios from "axios";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import {
  setDataState,
  displayNotification,
} from "../../store/reducers/notificationSlice";

import { SERVER_URL, DATA_STATE, NOTIFICATION_TYPES } from "../app.constants";
import { setAllProducts } from "../../store/reducers/productSlice";

function useGetAllProductsInStock() {
    const dispatch = useDispatch();
    const [inStockProducts, setInStockProducts] = useState(null);
  
    useEffect(() => {
      dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
      const fetchInStockProducts = async () => {
        try {
          const response = await axios.get(`${SERVER_URL}product/getallproducts`);
          const allProducts = response.data.products;
  
          // Filter products that are not out of stock
          const inStockProducts = allProducts.filter((product) => !product.outOfStock);
          setInStockProducts(inStockProducts);
          dispatch(setAllProducts(inStockProducts));
        } catch (error) {
          const notificationPayload = {
            text: "Došlo je do greške!",
            type: NOTIFICATION_TYPES.ERROR,
          };
          dispatch(displayNotification(notificationPayload));
        } finally {
          dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
        }
      };
  
      fetchInStockProducts();
    }, [dispatch]);
  
    return inStockProducts;
  };

export default useGetAllProductsInStock;
