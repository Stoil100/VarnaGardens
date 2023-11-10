import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Title } from "../Components/Title";
import grassServiceIcon from "../Assets/ServicesLogos/GrassServicesIcon.svg";
import bushServiceIcon from "../Assets/ServicesLogos/BushServicesIcon.svg";
import lawnMowingServiceIcon from "../Assets/ServicesLogos/LawnMowingServicesIcon.svg";
import planningServiceIcon from "../Assets/ServicesLogos/PlanningServicesIcon.svg";
import recyclingServiceIcon from "../Assets/ServicesLogos/RecyclingServicesIcon.svg";
import treeServiceIcon from "../Assets/ServicesLogos/TreeServicesIcon.svg";
import triangleBg from "../Assets/triangle.svg";
import backgroundImg from "../Assets/pattern.png";
import waves from "../Assets/waves.svg";
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { ContactButton } from "../Components/ContactButton";

const isMobile = window.innerWidth < 768;

const icons = [
  bushServiceIcon,

  treeServiceIcon,
  planningServiceIcon,
  grassServiceIcon,
];

const swiperText = [
  {
    title: "Почистване на дворове",
    subtitle1: "План 'Екстра'",
    subtitle2: "План 'Медиум'",
    subtitle3: "План 'Експрес'",
    description:
      "Предлагаме различни планове за перфектно изглеждаща градина. За да разберете повече се свържете с нас.",
    description1:
      "Абонаментен план, който покрива най-високите изисквания към поддръжката на зелени площи.Посещенията се извършват веднъж седмично.",
    description2:
      "План за абонамент, който е насочен към фамилни къщи и жилищни сгради. Посещенията веднъж на 10 дни съчетават оптимално отношение между цена и качество.",
    description3:
      "Предимствата са в един баланс между професионално обслужване и повече свободно време в градината. Посещенията са веднъж на 15 дни.",
  },
  {
    title: "Еднократни услуги",
    description:
      "Предлагаме Поддръжка на тревния килим, грижи за храстите, дърветата и цветята. Растителна защита, превенция и торене. Почистване на запустели градини.",
  },
  {
    title: "Нова градина",
    subtitle1: "Нова градина:",
    subtitle2: "Озеленяване:",
    description:
      "Предлагаме различни услуги за съживяването на вашата градина. За повече информация се свържете с нас.",
    description1:
      " Ще ви представим озеленяването, като отделни аспекти. Какви услуги предлагаме и точно, колко ще ви струва бъдещият проект.",
    description2:
      "От нов тревен килим, през красив скален кът с разнообразни растения до идеално подредените живи плетове. Градината ви ще бъде прекрасна.",
  },
  {
    title: "Поливни системи:",
    description:
      "Напояването е един от факторите, които превръщат всяка градина в шедьовър. Предлагаме професионални автоматизирани поливни системи.",
  },
];

const swiperParams = {
  direction: isMobile ? "horizontal" : "vertical",
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: true,
  },
  modules: [Pagination, Autoplay],
};
const Container = styled(Box)`
  min-height: 100vh;
  height: fit-content;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 45px 0 20px 0;
  background-image: url(${backgroundImg});
  background-size: 200px;

  position: relative;
  @media (max-width: 768px) {
    max-height: fit-content;
  }
`;
const WavesImage = styled.img`
  position: absolute;
  top: -1px;
  width: 100%;
`;
const FlexContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 0;
    gap: 20px;
  }
`;
const FlexBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SliderBox = styled(Box)`
  width: 300px;
  height: 300px;
  transition: 0.3s;
  left: -120px;
  top: -70px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconBox = styled.img`
  height: 70px;
  width: 70px;
  background-color: green;
  clip-path: circle();
  border: 15px solid green;
  position: absolute;

  // @media (max-width: 1000px) {
  //   height: 60px;
  //   width: 60px;
  //   border: 5px solid green;
  // }

  @media (max-width: 768px) {
    position: relative;
    height: 80px;
    width: 80px;
    border: 15px solid green;
  }
`;

const TextSwiper = styled(Swiper)`
  width: 80vw;
  height: 50vh;
  text-align: center;
  @media (max-width: 1000px) {
    height: 75vh;
  }
  @media (max-width: 768px) {
    height: fit-content;
    width: 80vw;
  }
`;
const FlexSlider = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;

  @media (max-width: 768px) {
    height: fit-content;
  }
`;
const SliderItemContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 10px;
`;

const SliderItemBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
  border-radius: 30px;
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
  box-shadow: 4px 4px 16px 0px rgba(0, 0, 0, 0.5);
  border-top: 10px solid #6a994e;
  border-bottom: 10px solid #a7c957;
  height: 100%;
`;

const SliderText = styled(Typography)`
  font-family: Comfortaa;
`;
const BackgroundCircle = styled.div`
  width: 150px;
  height: 150px;
  background-color: green;
  border-radius: 50%;
`;
export const Services: React.FC = () => {
  const [sliderIndex, setSliderIndex] = useState<number>(0);
  const textSwiperRef = useRef<any>(null);
  const [sliderDeg, setSliderDeg] = useState<number>(0);

  useEffect(() => {
    setSliderDeg(sliderIndex! * 90);
  }, [sliderIndex]);

  return (
    <Container>
      {!isMobile && (
        <SliderBox sx={{ transform: `rotateZ(${sliderDeg}deg) ` }}>
          <BackgroundCircle />
          {icons.map((icon, index) => (
            <IconBox
              key={index}
              src={icon}
              style={{
                transform: `rotateZ(-${sliderDeg}deg)`,
                transition: "1s",

                ...(index <= 1 ? { top: "0" } : { bottom: "0" }),
                ...(index === 0 || index === 3
                  ? { left: "0" }
                  : { right: "0" }),
              }}
            />
          ))}
        </SliderBox>
      )}
      <WavesImage src={waves} />
      <Title title="Нашите" span="Услуги" />
      <FlexContainer>
        <FlexBox>
          <TextSwiper
            ref={textSwiperRef}
            {...swiperParams}
            onTransitionEnd={(data: any) => {
              setSliderIndex(data.realIndex);
            }}
          >
            {swiperText.map((text, index) =>
              isMobile ? (
                <FlexSlider key={index}>
                  <Box>
                    <SliderText variant="h4">{text.title}</SliderText>
                    {isMobile && <IconBox src={icons[index]} />}
                  </Box>
                  <SliderText variant="h6">{text.description}</SliderText>
                </FlexSlider>
              ) : index % 2 === 0 ? (
                <FlexSlider key={index}>
                  <Box>
                    <SliderText variant="h4">{text.title}</SliderText>
                  </Box>
                  <SliderItemContainer>
                    <SliderItemBox>
                      <SliderText variant="h5">{text.subtitle1}</SliderText>
                      <SliderText>{text.description1}</SliderText>
                    </SliderItemBox>

                    <SliderItemBox>
                      <SliderText variant="h5">{text.subtitle2}</SliderText>
                      <SliderText>{text.description2}</SliderText>
                    </SliderItemBox>
                    {text.subtitle3 !== undefined && (
                      <SliderItemBox>
                        <SliderText variant="h5">{text.subtitle3}</SliderText>
                        <SliderText>{text.description3}</SliderText>
                      </SliderItemBox>
                    )}
                  </SliderItemContainer>
                </FlexSlider>
              ) : (
                <FlexSlider key={index}>
                  <Box>
                    <SliderText variant="h2">{text.title}</SliderText>
                    {isMobile && <IconBox src={icons[index]} />}
                  </Box>
                  <SliderText variant="h5">{text.description}</SliderText>
                </FlexSlider>
              )
            )}
          </TextSwiper>
          <ContactButton>Направи Запитване</ContactButton>
        </FlexBox>
      </FlexContainer>
    </Container>
  );
};
