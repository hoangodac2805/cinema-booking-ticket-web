import React from "react";
import { useSelector } from "react-redux";
import Style from "./FooterHome.module.css";

export default function FooterHome() {
  const { heThongRap } = useSelector((state) => state.QuanLyRapReducer);

  return (
    <footer
      className={`${Style.footerHome} relative pt-1 border-b-2 border-blue-700`}
    >
      <div className="container mx-auto px-6">
        <div className="sm:flex sm:mt-8">
          <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between">
            <div className="flex flex-col">
              <span className="font-bold text-gray-700 uppercase mb-2">
                Hệ thống rạp
              </span>
              {heThongRap?.map((item, index) => {
                return (
                  <div key={index} className="my-2">
                    <img src={item.logo} style={{ width: "50px" }}></img>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-700 uppercase mt-4 md:mt-0 mb-2">
                Contact
              </span>
              <span className="my-2">
                <a href="https://www.facebook.com/profile.php?id=100087663985597">
                  <img
                    style={{ width: "50px" }}
                    className="rounded-full opacity-50 transition-all duration-300 hover:opacity-100"
                    src={require("../../../Assets/img/facebook.png")}
                  ></img>
                </a>
              </span>
              <span className="my-2">
                <img
                  style={{ width: "50px" }}
                  className="rounded-full opacity-50 transition-all duration-300 hover:opacity-100"
                  src={require("../../../Assets/img/twiter.png")}
                ></img>
              </span>
              <span className="my-2">
                <img
                  style={{ width: "50px" }}
                  className="rounded-full opacity-50 transition-all duration-300 hover:opacity-100"
                  src={require("../../../Assets/img/youtube.webp")}
                ></img>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6">
        <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
          <div className="sm:w-2/3 text-center py-6">
            <p className="text-sm text-blue-700 font-bold mb-2 font-mono">
              © 2022 by Ngô Đắc Hoà
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
