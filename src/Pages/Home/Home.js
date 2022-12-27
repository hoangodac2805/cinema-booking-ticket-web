import React from "react";
import Banner from "../../Components/Carousel/Banner";
import RapChieu from "../../Components/RapChieu/RapChieu";

import SwiperFilm from "../../Components/SwiperFilm/SwiperFilm";

export default function Home() {
  return (
    <div>
      <Banner></Banner>

      <SwiperFilm></SwiperFilm>
    
      <RapChieu></RapChieu>
    </div>
  );
}
