import React from "react";
import Slider from "react-slick";
import style from "./mainslyder.module.css";
import Slyderimg1 from "../../imgs/slyder/images/slider-image-1.jpeg";
import Slyderimg2 from "../../imgs/slyder/images/slider-image-2.jpeg";
import Slyderimg3 from "../../imgs/slyder/images/slider-image-3.jpeg";
import Slyderimg4 from "../../imgs/slyder/images/slider-2.jpeg";
import Slyderimg5 from "../../imgs/slyder/images/grocery-banner-2.jpeg";
import Slyderimg6 from "../../imgs/slyder/images/grocery-banner.png";
// import "./MainSlyder.css";
// {Style1.slidex}
// className="slidex"
export default function MainSlyder() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div>
      <Slider {...settings} className={`${style.slidex} my-3 container`}>
        <img src={Slyderimg1} alt="" />
        <img src={Slyderimg2} alt="" />
        <img src={Slyderimg3} alt="" />
        <img src={Slyderimg4} alt="" />
        <img src={Slyderimg5} alt="" />
        <img src={Slyderimg6} alt="" />
      </Slider>
    </div>
  );
}
