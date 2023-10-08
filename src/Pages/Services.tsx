import React, { useState, useEffect, useRef } from "react";
import { Box,Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Title } from "../Components/Title";
import grassServiceIcon from "../Assets/ServicesLogos/GrassServicesIcon.svg";
import bushServiceIcon from "../Assets/ServicesLogos/BushServicesIcon.svg";
import lawnMowingServiceIcon from "../Assets/ServicesLogos/LawnMowingServicesIcon.svg";
import planningServiceIcon from "../Assets/ServicesLogos/PlanningServicesIcon.svg";
import recyclingServiceIcon from "../Assets/ServicesLogos/RecyclingServicesIcon.svg";
import treeServiceIcon from "../Assets/ServicesLogos/TreeServicesIcon.svg";
import triangleBg from "../Assets/triangle.svg";
import { Swiper, SwiperSlide} from "swiper/react";
import { Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ContactButton } from "../Components/ContactButton";

const isMobile = window.innerWidth < 768;

const icons = [
  grassServiceIcon,
  recyclingServiceIcon,
  planningServiceIcon,
  bushServiceIcon,
  treeServiceIcon,
  lawnMowingServiceIcon,
];

const swiperText = [
  {
    title: "Почистване на дворове",
    description:
      " Предлагаме и напълно почистване на изостсвени дворове и ливади.",
  },
  {
    title: "Грижа",
    description:
      "  Отнасяме се с изключителна грижа към вашите растения и тревни       площи.",
  },
  {
    title: "Точност",
    description:
      "   Обръщаме внимание на детайлите във всеки аспект на вашата градина.",
  },
  {
    title: "Подрязване на храсти",
    description:
      "Нашето експертно подрязване вдъхва нов живот на вашите храсти и      дървета, като насърчава здравословния растеж за добре поддържана",
  },

  {
    title: "Рязане на дървета",
    description: "Режем,оформяме и също така подрязваме дървета или дръвчета.",
  },
  {
    title: "Косене на трева",
    description:
      "  Нашата услуга за косене на трева гарантира перфектно поддържан двор с професионално оборудване и опит.",
  },
];

const swiperParams = {
  direction: "vertical",
  loop: true,
  modules: [Pagination],
};
const Container = styled(Box)`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 15px;
`;
const FlexContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10vw;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 0;
    gap:20px;
  }
`;
const FlexBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 60%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
const SliderContainer = styled(Box)`
  height: 80vh;
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    height: 40%;
    width: 100%;
  }
`;

const SliderBox = styled(Box)`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  transition: 0.3s;
  position: relative;
  left: -20%;
  @media (max-width: 1000px) {
    left: -45%;
  }

  @media (max-width: 768px) {
    top: 150px;
    left: 20%;
    position: absolute;
  }
`;

const ShapeBox = styled.img`
  height: 200px;
  width: auto;
  position: absolute;
  z-index: 2;
  transform: rotateZ(90deg) translate(0, 150%);
  @media (max-width: 768px) {
    height: 30%;
    width: 50%;
    transform: translate(50%, 0);
    bottom: 0;
  }
`;

const IconBox = styled.img`
  height: 70px;
  width: 70px;
  position: absolute;
  background-color: green;
  clip-path: circle();
  border: 15px solid green;

  @media (max-width: 1000px) {
    height: 60px;
    width: 60px;
    border: 5px solid green;
  }

  @media (max-width: 768px) {
    position: relative;
    height: 80px;
    width: 80px;
    border: 15px solid green;
  }
`;

const TextSwiper = styled(Swiper)`
  width: 100%;
  height: 30vh;
  text-align: center;
  @media (max-width: 768px) {
    height: 60vh;
  }
`;
const FlexSlider = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;


export const Services: React.FC = () => {
  const [sliderDeg, setSliderDeg] = useState(60);
  const [sliderIndex, setSliderIndex] = useState(5);
  const textSwiperRef = useRef<any>(null);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setSliderDeg((prevNumber) => (prevNumber === 360 ? 60 : prevNumber + 60));
      setSliderIndex((prevNum) => (prevNum === 0 ? 5 : prevNum - 1));
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  useEffect(() => {
    textSwiperRef.current!.swiper.slideTo(sliderIndex)

  }, [sliderIndex]);

  return (
    <Container>
      <Title title="Нашите" span="Услуги" />
      <FlexContainer >
        {!isMobile&&
          <SliderContainer>
            <ShapeBox src={triangleBg} />

            <SliderBox sx={{ transform: `rotateZ(${sliderDeg}deg) ` }}>
              {icons.map((icon, index) => (
                <IconBox
                  key={index}
                  src={icon}
                  style={{
                    transform: `rotateZ(-${sliderDeg}deg) 
                scale(${sliderIndex === index ? 1.5 : 1})`,
                top: `${100 + 250 * Math.sin((index * Math.PI) / 3)}px`,
                left: `${100 + 250 * Math.cos((index * Math.PI) / 3)}px`,
                    transition: "1s",
                  }}
                />
              ))}
            </SliderBox>
          </SliderContainer>
        }
        <FlexBox>
          <TextSwiper ref={textSwiperRef} {...swiperParams}>
            {swiperText.map((text, index) => (
              <FlexSlider key={index}>
                <Box>
                <Typography variant={`${isMobile?"h3":"h2"}`}>{text.title}</Typography>
              {isMobile&& <IconBox src={icons[index]}/>}
                </Box>
                <Typography variant={`${isMobile?"body1":"h6"}`}>{text.description}</Typography>
              </FlexSlider>
            ))}
          </TextSwiper>
          <ContactButton>Направи Запитване</ContactButton>
        </FlexBox>
      </FlexContainer>
    </Container>
  );
};
