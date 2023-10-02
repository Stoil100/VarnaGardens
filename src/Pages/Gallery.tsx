import React from "react";
import { Title } from "../Components/Title";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import result0 from "../Assets/Results/results0.jpg";
import result1 from "../Assets/Results/results1.jpg";
import result2 from "../Assets/Results/results2.jpg";
import result3 from "../Assets/Results/results3.jpg";
import result4 from "../Assets/Results/results4.jpg";
import result5 from "../Assets/Results/results5.jpg";
import result6 from "../Assets/Results/results6.jpg";
import result7 from "../Assets/Results/results7.jpg";

const images = [result0, result1, result2, result3, result4,result5,result6,result7];

const swiperParams = {
  spaceBetween: -200,
  autoplay: {
    delay: 2500,
    disableOnInteraction: true,
  },
  effect: "coverflow",
  grabCursor: true,
  slidesPerView: 3,
  centeredSlides: true,
  centerInsufficientSlides: true,
  loop: true,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 500,
    modifier: 1,
    slideShadows: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  modules: [EffectCoverflow, Navigation, Autoplay],
};

const FlexBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  gap: 50px 0px;
  box-sizing: border-box;
  padding: 30px;

  @media (max-width: 600px) {
    padding: 10px;
    min-height: fit-content;
  }
`;

const StyledSwiper = styled(Swiper)`
  height: 60%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
`;

export const Gallery = () => {
  return (
    <FlexBox>
      <Title title="Нашите" span="Проекти" />
      <StyledSwiper {...swiperParams}>
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <StyledImage src={image} />
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </FlexBox>
  );
};
