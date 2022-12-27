import React from "react";
import { useSelector } from "react-redux";
import Style from "./loadingGIF.module.css";
export default function LoadingGif(props) {
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  if (!isLoading) {
    return "";
  } else {
    return (
      <div className={`${Style.loadingGIF}`}>
        <img
          src="/img/loadingGIF.gif"
          alt="gif"
          className="rounded-lg w-screen h-screen opacity-0"
        ></img>
      </div>
    );
  }
}
