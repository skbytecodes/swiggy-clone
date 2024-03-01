import React from "react";
import AppStore from "../images/app_store_btn.webp";
import PlayStore from "../images/play_store_btn.webp";
import SwiggyLogo from "../images/swiggy-logo.png";

function Footer() {
  return (
    <div className="">
      <div className="bg-gray-200 h-28 flex items-center justify-around">
        <div className="text-2xl font-bold max-w-sm text-gray-700">
          <p>For better experience</p>
          <p>download the Swiggy app now</p>
        </div>
        <div className="flex">
          <img className="h-16 w-48" src={PlayStore} />
          <img className="h-16 w-48 ml-5" src={AppStore} />
        </div>
      </div>
      <div className="bg-black h-5/6 pt-10 pb-10">
        <div className="flex justify-center space-x-20 text-gray-400 ">
          <div className="">
            <div className="flex space-x-2">
              <img className="h-7 w-5" src={SwiggyLogo} />
              <p className="text-white font-bold text-2xl">Swiggy</p>
            </div>
            <div className="text-sm mt-3 font-semibold">
              <p>© 2023 Sushil Info Technology.</p>
            </div>
          </div>
          <div className="">
            <ul className="pb-2 leading-8">
              <li className="text-white font-semibold">About</li>
              <li>Careers</li>
              <li>Teams</li>
              <li>Swiggy One</li>
              <li>Swiggy Instamart</li>
              <li>Swiggy Genie</li>
            </ul>
          </div>
          <div className="">
            <div>
              <ul className="leading-8">
                <li className="text-white font-semibold">Contact us</li>
                <li>Help and Support</li>
                <li>Partener with us</li>
                <li>Ride with us</li>
                <li>Swiggy Instamart</li>
                <li>Swiggy Genie</li>
              </ul>

              <ul className="mt-10 leading-8">
                <li className="text-white font-semibold">Legal</li>
                <li>Terms & Conditions</li>
                <li>Cooie Policy</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="">
            <ul className="leading-8">
              <li className="text-white font-semibold">We deliver to:</li>
              <li>banglore</li>
              <li>Gurgaon</li>
              <li>Hyderbad</li>
              <li>Delhi</li>
              <li>Mumbai</li>
              <li>Pune</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
