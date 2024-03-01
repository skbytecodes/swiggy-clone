import React from "react";
import Cart from "./Cart";
import Header from "./Header";
import LoginPage from "./LoginPage";
import { showAuthPage } from "./actions/swiggyActions";
import { useSelector } from "react-redux";
import DeliveryAddress from "./DeliveryAddress";

function CartContainer() {
  const showAuthPage = useSelector((state) => state.showAuthPage);
  const isAddressFormOpen = useSelector((state) => state.SHOW_ADDRESS_FORM);
  return (
    <div>
      {showAuthPage ? (
        <div>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.40)",
              zIndex: 10,
            }}
          ></div>
          <LoginPage isOpen={1} />
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
            }}
          >
            <Header />
            <Cart />
          </div>
        </div>
      ) : (
        <div>
          <DeliveryAddress isOpen={0}/>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
            }}
          >
          <Header />
          <Cart />
          </div>
        </div>
      )}
    </div>
  );
}

export default CartContainer;
