import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import React from "react";
import { Title } from "../Components/Title";
import facebookIcon from "../Assets/SocialMediaIcons/facebook.svg";
import instagramIcon from "../Assets/SocialMediaIcons/instagram.svg";
import tiktokIcon from "../Assets/SocialMediaIcons/tiktok.svg";

const FlexFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 0 0;
  background-color: #191a1b;
  height: 45vh;
  color: #fff;
  font-family: Montserrat Alternates;
  box-sizing: border-box;
  padding: 20px;
  flex-wrap: wrap;

  @media (max-width: 570px) {
    justify-content: center;
  }
`;

const SocialIcon = styled.img`
  height: auto;
  width: 48px;
  fill: #fff;
`;

const TextBox = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex:1;

  @media (max-width: 768px) {
    text-align: center !important; 
    align-items: center !important;
  }
`;

export const Footer = () => {
  return (
    <FlexFooter>
      <TextBox>
        <Typography variant="h4" sx={{ fontFamily: "Montserrat Alternates" }}>
          Свържете се с нас
        </Typography>
        <Typography
          variant="button"
          sx={{ fontFamily: "Montserrat Alternates" }}
        >
          <a href="mailto:test@example.com" style={{ color: "#fff" }}>
            varnagardens@gmail.com
          </a>
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontFamily: "Montserrat Alternates" }}
        >
          <a href="tel:0889431671" style={{ color: "#fff" }}>
            (+359)88-943-1671
          </a>
        </Typography>
      </TextBox>
      <Box>
        <Title title="Varna" span="Gardens" />
      </Box>
      <TextBox
        sx={{
          textAlign: "right",
          alignItems: "end",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontFamily: "Montserrat Alternates"}}
        >
          Намерете ни в социалните мрежи
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "50px",
          }}
        >
          <SocialIcon src={facebookIcon}></SocialIcon>
          <SocialIcon src={instagramIcon}></SocialIcon>
          <SocialIcon src={tiktokIcon}></SocialIcon>
        </Box>
      </TextBox>
      <Typography variant="body1" sx={{ width: "100%", textAlign: "center" }}>
        &copy; {new Date().getFullYear()} Varna Gardens
      </Typography>
    </FlexFooter>
  );
};
