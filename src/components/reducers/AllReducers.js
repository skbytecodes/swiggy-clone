import { combineReducers } from "redux"
import authToggleReducer from "./AuthToggleReducer"
import {showAuthPageReducer} from "./ShowAuthPageReducer"
import {selectedItemReducer} from "./CommonReducer";
import { cartReducer } from "./CommonReducer";
import {itemsTotalValueReducer} from "./CommonReducer"
import { showDeliveryAddressReducer } from "./ShowDeliveryAddressReducer";

const allReducers = combineReducers({
  authToggle : authToggleReducer,
  showAuthPage : showAuthPageReducer,
  selectedItem : selectedItemReducer,
  cartItems : cartReducer,
  totalItemsAmount : itemsTotalValueReducer,
  showDeliveryForm : showDeliveryAddressReducer
});
export default allReducers;