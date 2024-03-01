import React, { useEffect, useState } from "react";
import EmptyCart from "../images/emptyCart.jpg";
import EmptyCartPNG from "../images/emptyCartPNG.png";
import Roll from "../images/roll.webp";
import { Wallet } from "@mui/icons-material";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import { UserIcon } from "@heroicons/react/outline";
import Cake from "../images/cake.jpg";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { menuItemClasses } from "@mui/material";
import { addItem, cartTotalValue, removeItem, showDeliveryAddress } from "./actions/swiggyActions";
import Logo from "../images/swiggy-logo.png";
import { redirect } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";

function Cart() {
  const [items, setItems] = useState([]);
  const [auth, setAuth] = useState();
  const parentUrl = window.globalPrentUrl;
  const publicImagePath = window.publicImagePath;

  const dispatch = useDispatch();
  const selectedRestaurant = useSelector((state) => state.selectedItem);
  const itemsInCart = useSelector((state) => state.cartItems.items);
  console.log("item changes ", itemsInCart);
  const [itemsInCartState, setItemsInCartState] = useState(itemsInCart);
  let itemsTotalAmount = useSelector((state) => state.totalItemsAmount);
  const [restaurant, setRestaurant] = useState({});
  console.log("items in cart state ", itemsInCartState);
  let arr = [];

  useEffect(() => {
    async function fetchData() {
      const restaurantResponse = await axios.get(
        `${parentUrl}/api/v1/restaurant/${selectedRestaurant}`
      );

      const authRes = await axios.get(`${parentUrl}/api/v1/login`);
      console.log("auth response ", authRes);
      setAuth(authRes.data);
      setRestaurant(restaurantResponse.data);

      const promises = itemsInCartState.map(async (item) => {
        const response = await axios.get(
          `${parentUrl}/api/v1/foodById/${item.foodId}`
        );
        console.log("response data promise " + response.data);
        return response.data;
      });
      arr = await Promise.all(promises);
      setItems(arr);
    }
    fetchData();
  }, [items]);

  const pushItem = async (item) => {
    dispatch(addItem({ foodId: item.foodId, count: 1 }));
    const response = await axios.get(
      `${parentUrl}/api/v1/foodById/${item.foodId}`
    );
    itemsTotalAmount = itemsTotalAmount + response.data.foodPrice;
    dispatch(cartTotalValue(itemsTotalAmount));
  };

  const pullItem = async (item) => {
    dispatch(removeItem({ foodId: item.foodId }));
    const response = await axios.get(
      `${parentUrl}/api/v1/foodById/${item.foodId}`
    );
    itemsTotalAmount = itemsTotalAmount - response.data.foodPrice;
    if (itemsTotalAmount <= 0) {
      dispatch(cartTotalValue(0));
    } else {
      dispatch(cartTotalValue(itemsTotalAmount));
    }
  };

  // payment

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const data = {
      amount: itemsTotalAmount.toFixed(2),
    };

    const result = await axios.post(
      parentUrl + "/api/v1/payment/createOrder",
      data
    );

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_ZEjXTEe2VFxVYo", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Sushil Info Technology",
      description: "Test Transaction",
      image: { Logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          parentUrl + "/api/v1/payment/success",
          data
        );
        if (result.data == "Success") {
          window.location.href = "/";
        } else {
          window.location.href = "/error";
        }
      },
      prefill: {
        name: "Sujeet Devi",
        email: "SoumyaDey@example.com",
        contact: "9582364692",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  function openAddressForm(){
    dispatch(showDeliveryAddress());
  }


  return (
    <>
      {itemsInCartState.length <= 0 ? (
        <div
          className="flex items-center justify-center"
          style={{ height: "87vh" }}
        >
          <div className="flex flex-col items-center">
            <img src={EmptyCart} className="h-64" />
            <p className="font-semibold mt-5 mb-1 text-lg">
              Your cart is empty
            </p>
            <p className="text-sm text-gray-600 mb-5">
              You can go to home page to view more restaurants
            </p>
            <p className="bg-orange-500 w-fit py-2 px-5 font-semibold text-white">
              SEE RESTAURANTS NEAR YOU
            </p>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* secondsection */}

      <div
        className="bg-gray-200 relative flex justify-around"
        // style={{ minHeight: "140vh", paddingTop: "5vh" }}
        style={{ minHeight: "180vh", paddingTop: "5vh" }}
      >
        <div
          className="flex flex-col justify-between"
          style={{ height: "80vh", width: "63vw" }}
          // style={{ width: "63vw" }}
        >
          {navigator.onLine ? (
            ""
          ) : (
            <>
              <div
                className="bg-white flex flex-col justify-evenly pl-10 ml-5"
                style={{ height: "27vh" }}
              >
                <p className="font-semibold text-lg">
                  Oops, something went wrong. Please clear your cart and try
                  again.
                </p>
                <p className="bg-orange-500 text-white font-semibold w-fit px-5 py-2">
                  RETRY
                </p>
              </div>
            </>
          )}
          {auth != true ? (
            <>
              <div
                className="bg-white flex justify-around items-center ml-5"
                style={{ height: "32vh" }}
              >
                <div
                  className="flex flex-col justify-between"
                  style={{ height: "21vh" }}
                >
                  <div>
                    <p className="font-bold">Account</p>
                    <p className="text-gray-400" style={{ fontSize: "13px" }}>
                      To place your order now, log in to your existing account
                      or sign up.
                    </p>
                  </div>

                  <div className="flex">
                    <div
                      className="border px-8 py-2 text-center"
                      style={{ borderColor: "#60b246", color: "#60b246" }}
                    >
                      <p className="text-xs">Have an account?</p>
                      <p className="font-semibold" style={{ fontSize: "13px" }}>
                        LOG IN
                      </p>
                    </div>

                    <div
                      className="px-8 py-2 text-center text-white ml-7"
                      style={{ backgroundColor: "#60b246" }}
                    >
                      <p className="text-xs">New to Swiggy?</p>
                      <p className="font-semibold" style={{ fontSize: "13px" }}>
                        SIGN UP
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <img src={Roll} className="h-32" />
                </div>
              </div>
            </>
          ) : (
            <div className="h-96 bg-white ml-5 flex flex-col justify-evenly">
              <div className="ml-8">
                <p className="text-neutral-900 font-bold">
                  Select delivery address
                </p>
                <p className="text-gray-400">
                  You have a saved address in this location
                </p>
              </div>

              <div className="flex justify-around">
                <div className=" flex w-5/12 h-52 justify-evenly py-5  border gray-red-900">
                  <HomeOutlinedIcon />
                  <div className="w-5/6 ">
                    <p>Home</p>
                    <p className="text-gray-400 text-xs mt-2">
                      F1 194 4th Floor Madangir, South Delhi, Block F1, Doctor
                      Ambedkar Nagar, Madangir, New Delhi, Delhi 110062, India
                    </p>

                    <p
                      className="mt-5 mb-2"
                      style={{ fontSize: "12px", fontWeight: "bold" }}
                    >
                      23 MINS
                    </p>
                    <p
                      className=" text-white w-fit px-2 py-1 hover:cursor-pointer"
                      style={{ backgroundColor: "#60b246", fontSize: "14px" }}
                    >
                      Deliver Here
                    </p>
                  </div>
                </div>
                <div className=" flex w-5/12 h-52 justify-evenly py-5 border gray-red-900">
                  <FmdGoodOutlinedIcon />
                  <div className="w-5/6">
                    <p>Add New Address</p>
                    <p className="text-gray-400 text-xs mt-2">
                      F1/235, Block F1, Doctor Ambedkar Nagar, Madangir, New
                      Delhi, Delhi 110062, India
                    </p>
                    <p
                      className=" text-white w-fit px-4 py-1 mt-7 hover:cursor-pointer"
                      style={{
                        border: "1px solid #60b246",
                        fontSize: "13px",
                        color: "#60b246",
                      }}
                      onClick={openAddressForm}
                    >
                      ADD NEW
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {auth == true ? (
            ""
          ) : (
            <>
              <div
                className="bg-white flex items-center p-9 ml-5"
                style={{ height: "10vh" }}
              >
                <p className="font-bold text-gray-400">Delivery address</p>
              </div>
            </>
          )}
          
          {
            auth == true ?
            (
          <div className="bg-white h-20 ml-5 flex flex-col justify-center">
            <div
              className="flex flex-col justify-center"
              style={{ backgroundColor: "#60b246", height: "10vh" }}
              onClick={displayRazorpay}
            >
              <p className="text-white font-bold text-center">
                Proceed To Payment
              </p>
            </div>
          </div>
            ):(
              <>
              <div
                className="bg-white flex items-center p-9 ml-5"
                style={{ height: "10vh" }}
              >
                <p className="font-bold text-gray-400">Payment</p>
              </div>
            </>
            )
          }
        </div>

        {/* cart section */}

        {itemsInCartState.length <= 0 ? (
          <div className="" style={{ height: "100vh", width: "28vw" }}>
            <div className=" flex flex-col justify-center items-center">
              <div className="" style={{ width: "100%", paddingLeft: "75px" }}>
                <p className="text-3xl font-bold text-gray-400 mb-5 ml-0">
                  Cart Empty
                </p>
              </div>

              <img src={EmptyCartPNG} className="h-64 w-64 mb-2" />
              <p className="  text-sm text-gray-400" style={{ width: "60%" }}>
                Good food is always cooking! Go ahead, order some yummy items
                from the menu.
              </p>
            </div>
          </div>
        ) : (
          <div
            className="space-y-5"
            style={{ width: "28vw", height: "fit-content" }}
          >
            <div className="bg-white shadow-md space-y-5">
              <div className="flex items-center h-20 px-5 space-x-3 shadow-md">
                <img
                  src={Cake}
                  className=""
                  style={{ height: "47px", width: "50px" }}
                />
                <div className="">
                  <p className="font-semibold text-gray-700">
                    {restaurant.restaurantName}
                  </p>
                  <p className="text-gray-600" style={{ fontSize: "12px" }}>
                    {restaurant.restaurantAddress}
                  </p>
                </div>
              </div>

              {/* scroll */}
              <div
                className="overflow-y-scroll space-y-6"
                style={{ height: "60vh" }}
              >
                {items.map((item) => (
                  <div className="flex items-center px-5 justify-between ">
                    <div
                      className="flex justify-start "
                      style={{ width: "40%" }}
                    >
                      <RadioButtonCheckedIcon
                        sx={{
                          color: "green",
                          height: "13px",
                          width: "12px",
                          textAlign: "start",
                          marginTop: "2px",
                        }}
                      />
                      <div className="flex flex-col justify-start pt-0 pl-1">
                        <p
                          className="font-semibold text-gray-700"
                          style={{ fontSize: "12px" }}
                        >
                          {item.foodName}
                        </p>
                        <div className="flex items-center">
                          <p
                            className="font-semibold text-gray-500"
                            style={{ fontSize: "11px" }}
                          >
                            Customize
                          </p>
                          <ArrowForwardIosIcon
                            sx={{ color: "orange", height: "8px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className=" flex items-center justify-around w-20 border border-gray-300 py-1">
                      <RemoveIcon
                        onClick={() => {
                          pullItem(item);
                        }}
                        sx={{ color: "gray", fontSize: "14px" }}
                      />
                      <p
                        className="text-gray-500"
                        style={{ fontSize: "12px", color: "green" }}
                      >
                        {itemsInCartState.findIndex(
                          (foo) => foo.foodId === item.foodId
                        ) !== -1 ? (
                          <p id={item.foodId}>
                            {itemsInCartState
                              .find((foo) => foo.foodId === item.foodId)
                              .count.toString()}
                          </p>
                        ) : (
                          <p id={item.food_id}>0</p>
                        )}
                      </p>
                      <AddIcon
                        onClick={() => {
                          pushItem(item);
                        }}
                        sx={{ color: "green", fontSize: "14px" }}
                      />
                    </div>

                    <div
                      className=" text-gray-500 flex"
                      style={{ fontSize: "12px" }}
                    >
                      &#8377;
                      {itemsInCartState.findIndex(
                        (foo) => foo.foodId === item.foodId
                      ) !== -1 ? (
                        <p id={item.foodId}>
                          {(
                            itemsInCartState.find(
                              (foo) => foo.foodId === item.foodId
                            ).count * item.foodPrice
                          ).toFixed(2)}
                        </p>
                      ) : (
                        <p id={item.food_id}>0.00</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Bills */}

                <div
                  className="space-y-4 text-gray-600"
                  style={{ fontSize: "12px" }}
                >
                  <p
                    className="font-semibold text-gray-800 px-5"
                    style={{ fontSize: "12px" }}
                  >
                    Bill Details
                  </p>
                  <div className="flex items-center justify-between px-5">
                    <p>Item Total</p>
                    <div className="flex">
                      &#8377;<p>0.00</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-5">
                    <p>Delivery Fee | 5.8 kms</p>
                    <div className="flex">
                      &#8377;<p>0.00</p>
                    </div>
                  </div>
                  <div className=" flex items-center justify-between px-5">
                    <p>Delivery Tip</p>
                    <div className="flex">
                      &#8377;<p>0.00</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-5">
                    <p>Platform fee</p>
                    <div className="flex">
                      &#8377;<p>0.00</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-5">
                    <p>GST and Restaurant Charges</p>
                    <div className=" flex">
                      &#8377;<p>0.00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="flex items-center h-14 px-5 justify-between font-bold text-gray-800"
                style={{
                  fontSize: "14px",
                  boxShadow:
                    "0px -3px 6px rgba(0, 0, 0, 0.16), 0px 0px 0px rgba(0, 0, 0, 0.23)",
                }}
              >
                <p className="">TO PAY</p>
                <div className="flex">
                  &#8377;<p>{itemsTotalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 shadow-md border border-gray-100">
              <div className=" p-4 space-y-2" style={{ fontSize: "12px" }}>
                <p
                  className="font-bold  text-gray-900"
                  style={{ fontSize: "14px" }}
                >
                  Review your order and address details to avoid cancellations
                </p>
                <p className="text-gray-800">
                  <span className="text-red-500">Note:</span> If you cancel
                  within 60 seconds of placing your order, a 100% refund will be
                  issued. No refund for cancellations made after 60 seconds.
                </p>
                <p className="text-gray-800">
                  Avoid cancellation as it leads to food wastage.
                </p>
                <p
                  className="font-semibold border-dotted border-b-gray-100 "
                  style={{ fontSize: "13px" }}
                >
                  Read cancellation policy
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
