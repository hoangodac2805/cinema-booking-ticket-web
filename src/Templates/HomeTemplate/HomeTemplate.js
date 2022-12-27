import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";


import FooterHome from "./HomeTemplateComponent/FooterHome";

import HeaderHome2 from "./HomeTemplateComponent/HeaderHome2";

export default function HomeTemplate(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div>
      <HeaderHome2></HeaderHome2>
      <div className="mt-20">
        <Outlet></Outlet>
      </div>
      <FooterHome></FooterHome>
    </div>
  );
}
