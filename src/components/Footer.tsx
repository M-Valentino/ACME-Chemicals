import React from "react";

export const Footer = () => {
  return (
    <div className=" bg-blue-800 text-white p-8">
      <div className="flex flex-row justify-between">
        <div>
          <h3 className="font-bold">About</h3>
          <ul>
            <li>
              <a href="#">Company</a>
            </li>
            <li>
              <a href="#">Our Team</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">News</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">Products</h3>
          <ul>
            <li>
              <a href="#">Acids</a>
            </li>
            <li>
              <a href="#">Bases</a>
            </li>
            <li>
              <a href="#">Oxidizers</a>
            </li>
            <li>
              <a href="#">Solvents</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">Legal</h3>
          <ul>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms and Conditions</a>
            </li>
            <li>
              <a href="#">Shipping Policy</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">Media</h3>
          <ul>
            <li>
              <a href="#">Sales</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
            <li>
              <a href="#">Partnerships</a>
            </li>
            <li>
              <a href="#">Media</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
