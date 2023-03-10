import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Utility/icon/logo.png";
import {
  FaCcAmazonPay,
  FaAlipay,
  FaPaypal,
  FaCcApplePay,
} from "react-icons/fa";
import { SiSamsungpay, SiLiberapay } from "react-icons/si";

function Footer() {
  return (
    <div className="bg-base-200">
      <footer className="footer container mx-auto px-10 py-20 text-base-content">
        <div>
          <div>
            <div className="flex items-center justify-start mb-1 gap-2">
              <img src={logo} className="w-8" alt="" />
              <h3 className="text-xl font-bold">Materia</h3>
            </div>
            <p>Quality car parts at affordable prices</p>
          </div>
          <div className="p-2 border-2 border-gray-400 rounded-md">
            <p>We Accept</p>
            <div className="text-3xl flex items-center justify-center gap-2">
              <FaCcAmazonPay />
              <FaPaypal />
              <FaAlipay />
              <FaCcApplePay />
              <SiSamsungpay />
              <SiLiberapay />
            </div>
          </div>
        </div>
        <div>
          <span className="footer-title ">Services</span>
          <Link to="/" className="link link-hover ">
            Branding
          </Link>
          <Link to="/" className="link link-hover">
            Design
          </Link>
          <Link to="/" className="link link-hover">
            Marketing
          </Link>
          <Link to="/" className="link link-hover">
            Advertisement
          </Link>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <Link to="/" className="link link-hover">
            About us
          </Link>
          <Link to="/" className="link link-hover">
            Contact
          </Link>
          <Link to="/" className="link link-hover">
            Jobs
          </Link>
          <Link to="/" className="link link-hover">
            Press kit
          </Link>
        </div>
        <div>
          <span className="footer-title">Contact</span>
          <Link to="/" className="link link-hover">
            Phone : +880153132164
          </Link>
          <Link to="/" className="link link-hover">
            Email : materia@gmail.com
          </Link>
          <Link to="/" className="link link-hover">
            Address : Dhaka, Bangladesh
          </Link>
        </div>
      </footer>
      <footer className="footer footer-center p-4 border-t border-gray-300 ">
        <div>
          <p>Copyright © 2023 - All right reserved by Materia Industries Ltd</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
