import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import CountUp from "react-countup";
import textBg from "../Assets/bushesBackground.jpg";
import { useIntersectionObserver as useVisibility } from "@uidotdev/usehooks";


const isMobile = window.innerWidth<=768;

const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${textBg});
  background-size: cover;
  background-position-y:50%;
  min-height: 40vh;
  @media (max-width:768px){
    flex-direction: column;
  }
`;
const MainContainer = styled(Box)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-right: 40px;
  //border-right: 10px solid #191a1b;
  text-align: center;
  @media (max-width:768px){
    padding:0;
    border-right:0px;
    border-bottom: 3px solid #6a994e;
  }
`;
const OthersContainer = styled(Box)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: end;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 40px 0 40px;
  @media (max-width:768px){
    align-items: center;
    padding:0;
    
  }
`;
const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media (max-width:768px){
    text-align: center;
    justify-content:center;
    flex-wrap:wrap;
  }
`;
const MainCounter = styled(CountUp)`
  color: #fff;
  font-size: 200px;
  font-family: Montserrat Alternates;
  font-weight: 600;
  background-color: #fff;
  // background: url(${textBg});
  // background-position: -50px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 3px #a7c957;
  @media (max-width: 1000px) {
    font-size: 150px;
  }
  @media(max-width:300px){
    font-size: 100px;
  }
`;
const Line = styled.hr`
  border: 2px solid #f0b429;
  width: 80%;
`;
const OtherCounter = styled(CountUp)`
  color: #fff;
  font-size: 100px;
  font-family: Montserrat Alternates;
  font-weight: 400;
  @media (max-width: 300px) {
    font-size: 75px;
  }
`;

export default function Clients() {
  const [ref, entry] = useVisibility({
    threshold: 0.1,
    root: null,
    rootMargin: "0px",
  });
  return (
    <Container ref={ref}>
      {entry?.isIntersecting&&
      <>
      <MainContainer>
       <MainCounter end={115} duration={3} />
        <Typography
          variant={isMobile?"h3":"h2"}
          sx={{ color: "#fff", fontFamily: "Comfortaa" }}
        >
          Доволни клиенти
        </Typography>
      </MainContainer>
      <OthersContainer>
        <FlexBox>
          <OtherCounter end={53} duration={4} />
          <Typography
            variant={isMobile?"h5":"h4"}
            sx={{ color: "#fff", fontFamily: "Comfortaa" }}
          >
            Поддържани градини
          </Typography>
        </FlexBox>
        <Line />
        <FlexBox>
          <OtherCounter end={6} duration={5} />
          <Typography
           variant={isMobile?"h5":"h4"}
            sx={{ color: "#fff", fontFamily: "Comfortaa" }}
          >
           Поливни системи
          </Typography>
        </FlexBox>
      </OthersContainer>
      </>
      }
    </Container>
  );
}
