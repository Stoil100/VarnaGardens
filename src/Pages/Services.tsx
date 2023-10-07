import React, { useState, useEffect,useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { keyframes } from "@mui/material";
import { Title } from "../Components/Title";
import mainBG from "../Assets/bgimg.jpg";
import grassServiceIcon from "../Assets/ServicesLogos/GrassServicesIcon.svg";
import bushServiceIcon from "../Assets/ServicesLogos/BushServicesIcon.svg";
import lawnMowingServiceIcon from "../Assets/ServicesLogos/LawnMowingServicesIcon.svg";
import planningServiceIcon from "../Assets/ServicesLogos/PlanningServicesIcon.svg";
import recyclingServiceIcon from "../Assets/ServicesLogos/RecyclingServicesIcon.svg";
import treeServiceIcon from "../Assets/ServicesLogos/TreeServicesIcon.svg";
import bushesBG from "../Assets/bushesBackground.jpg";
import triangleBg from "../Assets/triangle.svg";
import { Swiper, SwiperSlide,useSwiper } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ContactButton } from "../Components/ContactButton";

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

const swiperParams={
  direction: 'vertical',
  effect: "coverflow",
  loop: true,
  modules: [Autoplay,Pagination],
}

// const GridBox = styled(Box)`
//   min-height: 100vh;
//   height: fit-content;
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   grid-template-rows: repeat(4, 1fr);
//   gap: 20px 30px;
//   grid-template-areas:
//     " title title "
//     " box1 box2 "
//     " box3 box4 "
//     " box5 box6 ";
//   text-align: center;
//   box-sizing: border-box;
//   @media (max-width: 800px) {
//     grid-template-columns: repeat(1, 1fr);
//     grid-template-rows: repeat(6, 1fr);
//     grid-template-areas:
//       " title "
//       " box1"
//       "box2 "
//       " box3"
//       " box4 "
//       " box5"
//       " box6 ";
//     padding: 10px;
//     margin-top: 50px;
//   }
// `;
// const BoxParent = styled(Box)`
//   display: block;
//   height: 275px;
//   outline: 3px dotted #6a994e;
//   box-sizing: border-box;
//   background-image: url(${bushesBG});
//   background-size: cover;
// `;

// const BoxItem = styled(Box)`
//   background-color: #fff;
//   height: 255px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   transition: all 0.35s;
//   padding: 10px;
//   gap: 10px;
//   &:hover {
//     color: #fff;
//     fill: #fff;
//     background-color: #00000050;
//   }
// `;

const Container = styled(Box)`
  min-height: 100vh;
  display:flex;
  justify-content:center;
  align-items: center;
  flex-direction:column;
`;
const FlexContainer = styled(Box)`
display: flex;
justify-content: space-between;
align-items: center;
padding-right:10vw;
`;
const FlexBox = styled(Box)`
display: flex;
justify-content:center;
align-items: center;
flex-direction:column;
width: 60%;
`;
const SliderContainer = styled(Box)`
  height: 80vh;
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const SliderBox = styled(Box)`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  transition: 0.3s;
  position: relative;
  left: -20%;
`;

const ShapeBox = styled.img`
height: 100%;
width: auto;
  position: absolute;
  z-index: 2;
  transform: rotateZ(90deg);
`;

// const TextContainer = styled(Box)`
//   display: flex;
//   justify-content: center;
//   align-items: start;
//   flex-direction: column;
//   text-align: left;
// `;

const IconBox = styled.img`
  height: 70px;
  width: 70px;
  position: absolute;
  background-color: green;
  clip-path: circle();
  border: 15px solid green;
`;

const TextSwiper = styled(Swiper)`
  width: 100%;
  height: 20vh;
  text-align: center;
`;

export const Services: React.FC = () => {
  const [sliderDeg, setSliderDeg] = useState(60);
  const [sliderIndex, setSliderIndex] = useState(5);
  const textSwiperRef = useRef<any>(null);

  // useEffect hook that sets up the interval and clears it when the component is unmounted.
  useEffect(() => {
    // Set up an interval to add 60 to 'myNumber' every 2 seconds.
    const intervalId = setInterval(() => {
      setSliderDeg((prevNumber) => (prevNumber === 360 ? 60 : prevNumber + 60));
      setSliderIndex((prevNum) => (prevNum === 0 ? 5 : prevNum - 1));

    }, 3000);

    // Return a cleanup function to clear the interval when the component is unmounted.
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  useEffect(() => {
    textSwiperRef.current!.swiper.slideTo(sliderIndex);
  }, [sliderIndex]);

  return (
    <Container>
      <Title title="Нашите" span="Услуги" />
      <FlexContainer>

      
        <SliderContainer>
          <ShapeBox src={triangleBg} />

          <SliderBox sx={{ transform: `rotateZ(${sliderDeg}deg)` }}>
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
        <FlexBox>

        <TextSwiper ref={textSwiperRef} {...swiperParams}>
          {swiperText.map((text,index) => (
            <SwiperSlide key={index}>
              <Typography variant="h2">{text.title}</Typography>
              <Typography variant="h6">{text.description}</Typography>
            </SwiperSlide>
          ))}
        </TextSwiper>
        <ContactButton>
          Направи Запитване
        </ContactButton>
        </FlexBox>
      </FlexContainer>
    </Container>
    // <GridBox sx={{ paddingY: "40px", paddingX: "60px" }}>
    //   <Box sx={{ gridArea: "title" }}>
    //     <Title title="Какво" span="Предлагаме" />
    //   </Box>
    //   <BoxParent>
    //     <BoxItem sx={{ gridArea: "box1" }}>
    //       <LawnMowingServiceIcon width="124px" height="auto" />
    //       <TextBox>
    //         <Typography variant="h5">Косене на трева</Typography>
    //         <Typography variant="body1">
    //           Нашата услуга за косене на трева гарантира перфектно поддържан
    //           двор с професионално оборудване и опит.
    //         </Typography>
    //       </TextBox>
    //     </BoxItem>
    //   </BoxParent>
    //   <BoxParent>
    //     <BoxItem sx={{ gridArea: "box2" }}>
    //       <BushServiceIcon width="124px" height="auto" />
    //       <TextBox>
    //         <Typography variant="h5">Рязане на дървета</Typography>
    //         <Typography variant="body1">
    //           Режем,оформяме и също така подрязваме дървета или дръвчета.
    //         </Typography>
    //       </TextBox>
    //     </BoxItem>
    //   </BoxParent>
    //   <BoxParent>
    //     <BoxItem sx={{ gridArea: "box3" }}>
    //       <GrassServiceIcon width="124px" height="auto" />
    //       <TextBox>
    //         <Typography variant="h5">Почистване на дворове</Typography>
    //         <Typography variant="body1">
    //          Предлагаме и напълно почистване на изостсвени дворове и ливади.
    //         </Typography>
    //       </TextBox>
    //     </BoxItem>
    //   </BoxParent>
    //   <BoxParent>
    //     <BoxItem sx={{ gridArea: "box4" }}>
    //       <TreeServiceIcon width="124px" height="auto" />
    //       <TextBox>
    //         <Typography variant="h5">Подрязване на храсти</Typography>
    //         <Typography variant="body1">
    //           Нашето експертно подрязване вдъхва нов живот на вашите храсти и
    //           дървета, като насърчава здравословния растеж за добре поддържана
    //           градина.
    //         </Typography>

    //       </TextBox>
    //     </BoxItem>
    //   </BoxParent>
    //   <BoxParent>
    //     <BoxItem sx={{ gridArea: "box5" }}>
    //       <PlanningServiceIcon width="124px" height="auto" />
    //       <TextBox>
    //         <Typography variant="h5">Точност</Typography>
    //         <Typography variant="body1">
    //           Обръщаме внимание на детайлите във всеки аспект на вашата градина.

    //         </Typography>
    //       </TextBox>
    //     </BoxItem>
    //   </BoxParent>
    //   <BoxParent>
    //     <BoxItem sx={{ gridArea: "box6" }}>
    //       <RecyclingServiceIcon width="124px" height="auto" />
    //       <TextBox>
    //         <Typography variant="h5">Грижа</Typography>
    //         <Typography variant="body1">
    //           Отнасяме се с изключителна грижа към вашите растения и тревни
    //           площи.
    //         </Typography>
    //       </TextBox>
    //     </BoxItem>
    //   </BoxParent>
    // </GridBox>
  );
};
