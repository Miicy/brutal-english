import { useDispatch } from "react-redux";
import {
  decrementItemsCount,
  incrementItemsCount,
  addItemToCart,
  removeItemsFromcart
} from "../../store/reducers/cartSlice";
import Toast from "./ToastComponent";

export const AddToCartBadge = ({ children }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(incrementItemsCount());
    dispatch(addItemToCart({ id: 1, name: "Item 1" }));

  };
  return (
    <Toast notificationText={"Dodato u korpu!"}>
      <div onClick={handleIncrease}>{children}</div>
    </Toast>
  );
};

export const RemoveFromCartBadge = ({ children }) => {
  const dispatch = useDispatch();

  const handleReduce = () => {
    dispatch(decrementItemsCount());
    dispatch(removeItemsFromcart(1));
  };

  return   (  
  <Toast notificationText={"Uklonjeno iz korpe!"}>
    <div onClick={handleReduce}>{children}</div>
    </Toast>)
};
