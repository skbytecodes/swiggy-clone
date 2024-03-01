import { XIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import RollIcon from "../images/roll.webp";
import { useDispatch, useSelector } from "react-redux";
import { hideAuthPage, showLoginForm } from "./actions/swiggyActions";
import { showSignupForm } from "./actions/swiggyActions";

function DeliveryAddress({ isOpen }) {
  const authToggle = useSelector((state) => state.authToggle);
  const dispatch = useDispatch();

  return (
    <div
      className="relative"
      style={{
        height: "130vh",
        zIndex: isOpen == 1 ? 10 : "",
        position: isOpen == 1 ? "fixed" : "",
        top: (isOpen = 1 ? "0%" : ""),
        right: (isOpen = 1 ? "0%" : ""),
        width: "100%",
        transform: "translate(0%, 0%)",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div
        className={`bg-white h-full px-5 absolute right-0 transition-transform ${
          isOpen ? "right-0" : "translate-x-full"
        } animate-slide-animation`}
        style={{ width: "35%" }}
      >
        <div className=" h-12 flex items-center ">
          <XIcon
            height={25}
            className="text-gray-500 hover:cursor-pointer ml-6 mt-8"
            onClick={() => dispatch(hideAuthPage())}
          />
        </div>
        <div className="m-auto" style={{ width: "85%" }}>
          <div className="flex h-28 justify-between items-center">
            <div className="h-2/3 flex flex-col justify-evenly">
              <p className="font-semibold text-3xl">Save delivery address</p>
            </div>
            <div>
              <img src={RollIcon} style={{ height: "80px", width: "80px" }} />
            </div>
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Name"
              className="outline-none p-5 border rounded-md"
              style={{
                borderTopLeftRadius: "2px",
                borderTopRightRadius: "2px",
              }}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="outline-none p-5 border rounded-md"
            />
            <input
              type="text"
              placeholder="Street Address"
              className="outline-none p-5 border rounded-md"
            />
            <input
              type="text"
              placeholder=" Landmark (Optional)"
              className="outline-none p-5 border rounded-md"
            />
            <input
              type="text"
              placeholder="Pincode"
              className="outline-none p-5 border rounded-md"
            />
            <textarea
              name="deliveryInstructions"
              placeholder="Delivery Instructions (Optional)"
              id="deliveryInstructions"
              className="border rounded-md px-3 py-2 resize-none focus:outline-none"
            />
          </div>

          <div className="flex flex-col mb-4">
            <select
              name="deliveryLocation"
              id="deliveryLocation"
              className="border rounded-md px-3 py-4 focus:outline-none"
            >
              <option value="doorstep">Delivery Location</option>
              <option value="doorstep">Doorstep</option>
              <option value="specific_location">
                Specific Location (e.g., gate, lobby)
              </option>
              <option value="shared_location">
                Shared Location (e.g., reception area)
              </option>
            </select>
            <p className="bg-orange-500 text-white py-3 text-center mt-4">
            SAVE ADDRESS & PROCEED
            </p>
            <p className="font-bold text-xs">
              By clicking on Save, I accept the Terms & Conditions & Privacy
              Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryAddress;
