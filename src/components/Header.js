import React, { useState } from "react";
import Logo from "../images/swiggy-logo.png";
import "../styles/Header.css";
import {
  ArchiveIcon,
  BadgeCheckIcon,
  ChevronDownIcon,
  SearchIcon,
  SupportIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideAuthPage, showAuthPage } from "./actions/swiggyActions";

function Header() {
  const [activeLink, setActiveLink] = useState("");
  const dispatch = useDispatch();

const handleSigninBtn = () => {
  setActiveLink("Sign In");
  dispatch(showAuthPage());
}

  return (
    <header id="header" className="flex items-center justify-between h-20 bg-white shadow-md">
      <div className="flex flex-1 items-center space-x-10">
        <Link
          to="/"
          onClick={() => {
            setActiveLink("");
          }}
        >
          <div className="pl-8">
            <img className="h-12 w-8" src={Logo} />
          </div>
        </Link>
        <div className="flex justify-around space-x-2 hover:cursor-pointer">
          <span className="font-bold underline underline-offset-8 text-sm hover:text-orange-500 cursor-pointer">
            {" "}
            Pushp Vihar{" "}
          </span>
          <span className="text-sm text-gray-500">
            Sector 7, Pushp Vihar, New Delhi...
          </span>
          <ChevronDownIcon className="h-5 w-5" color="orange" />
        </div>
      </div>
      <navBar className="flex flex-1 justify-evenly items-center hover:cursor-pointer text-gray-600">
        <Link
          to="/search"
          onClick={() => {
            setActiveLink("Search");
          }}
        >
          <div
            className={`flex space-x-2 items-center ${
              activeLink == "Search" ? "text-orange-500" : "text-gray-600"
            } hover:text-orange-500`}
          >
            <SearchIcon class="h-5 w-5" />
            <span className={`pb-1 font-semibold`} style={{marginTop:"2px"}}>Search</span>
          </div>
        </Link>
        <Link
          to="/offers"
          onClick={() => {
            setActiveLink("Offers");
          }}
        >
          <div
            className={`flex space-x-2 items-center ${
              activeLink == "Offers" ? "text-orange-500" : "text-gray-600"
            } hover:text-orange-500`}
          >
            <BadgeCheckIcon class="h-6 w-6" />
            <span className={`font-semibold `}>Offers</span>
          </div>
        </Link>
        <Link
          to="/help"
          onClick={() => {
            setActiveLink("Help");
          }}
        >
          <div
            className={`flex space-x-2 items-center ${
              activeLink == "Help" ? "text-orange-500" : "text-gray-600"
            } hover:text-orange-500`}
          >
            <SupportIcon class="h-6 w-6" />
            <span className={`font-semibold `}>Help</span>
          </div>
        </Link>
        <Link
          to=""
          onClick={handleSigninBtn}
        >
          <div
            className={`flex space-x-2 items-center ${
              activeLink == "Sign In" ? "text-orange-500" : "text-gray-600"
            } hover:text-orange-500`}
          >
            <UserIcon class="h-6 w-6" />
            <span className={`font-semibold `}>Sign In</span>
          </div>
        </Link>
        <Link
          to="/cart"
          onClick={() => {
            setActiveLink("Cart");
          }}
        >
          <div
            className={`flex space-x-2 items-center ${
              activeLink == "Cart" ? "text-orange-500" : "text-gray-600"
            } hover:text-orange-500`}
          >
            <ArchiveIcon class="h-6 w-6" />
            <span className={`font-semibold `}>Cart</span>
          </div>
        </Link>
      </navBar>
    </header>
  );
}

export default Header;
