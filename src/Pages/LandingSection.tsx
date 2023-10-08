// src/components/About.tsx
import { Box, Typography } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import backgroundImg from "../Assets/homeBackground.jpg";
import { ContactButton } from "../Components/ContactButton";
import grassBG from "../Assets/grassBG.svg";

const ImageBox = styled(Box)`
  background: url(${backgroundImg}) no-repeat fixed 50% 0px;
  position: relative;
  background-size: cover;
  height: 100vh;
`;

const TextBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  text-align: center;
  background-color: rgba(126, 153, 2, 0.4);
  font-family: Lobster;
  color: #fff;
  gap: 20px;
`;

const GrassDiv = styled.div`
display:none;
@media (max-width:768px){
  display:inline;
  position: absolute;
  bottom: 0;
  background-image: url(${grassBG});
  width: 100%;
  height: 40px;
  background-postion-x: 10px;
}
`;

export const LandingSection: React.FC = () => {
  return (
    <ImageBox>
      <TextBox>
        <Typography variant="h1" sx={{ fontFamily: "Lobster" }}>
          Varna Gardens
        </Typography>
        <Typography variant="h5" sx={{ fontFamily: "Montserrat Alternates" }}>
        Заедно във всяка стъпка към красива градина
        </Typography>
        <ContactButton hasAnimation={true}>Запазете час</ContactButton>
      </TextBox>
      <GrassDiv />
    </ImageBox>
  );
};
