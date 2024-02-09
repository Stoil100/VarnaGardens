import React from "react";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { ContactButton } from "../Components/ContactButton";
import { ReactComponent as PriceLogo } from "../Assets/HowItWorksIcons/price.svg";
import { ReactComponent as LawnMowerLogo } from "../Assets/HowItWorksIcons/lawnmower.svg";
import { ReactComponent as DoneLogo } from "../Assets/HowItWorksIcons/done.svg";
import { Title } from "../Components/Title";

const FlexContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  gap: 40px;
  box-sizing: border-box;
  padding: 10px;
  background-color: #fff;
  position: relative;
  z-index: 10;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 20px;
  }
`;

const ImagesContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;

@media (max-width: 768px) {
  width: 20%;
  flex-direction: column;
  gap: 20px;
}
@media (max-width: 500px) {
  display: none;
}
`;

const ImageBox = styled(Box)`
width: 144px;
height: 144px;
background-color: #e3f9e5;
border: 3px solid #0e5814;
border-radius: 50%;
box-sizing: border-box;
padding: 20px;

@media (max-width: 768px) {
  width: 96px;
  height: 96px;
}
`;

const ImagesResponsive = styled(Box)`
width: 96px;
height: 96px;
background-color: #e3f9e5;
border: 3px solid #0e5814;
border-radius: 50%;
box-sizing: border-box;
padding: 20px;
display: none;

@media (max-width: 500px) {
  display: inline;
}
`;

const TextContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 900px;
  gap: 10px;
  @media (max-width:910px){
    width: 750px;
  }

  @media (max-width: 768px) {
    width: 80%;
    flex-direction: column;
    gap: 20px;
  }
  @media(max-width: 500px) {
    justify-content: center;
    text-align: center;
  }
`;

const TextBox = styled(Box)`
  width: 33%;
  text-align: center;

  @media (max-width:910px){
    width: 25%;
  }
  @media (max-width: 768px) {
    width: 100%;
    text-align: left;
  }
  @media(max-width: 500px) {
    text-align: center;
  }
`;

const LineDiv = styled.div`
  width: 155px;
  height: 0px;
  border: 2px solid #0e5814;
  @media (max-width:910px){
    width: 100px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const About: React.FC = () => {
  return (
    <FlexContainer>
      <Title title="Как" span="Работим" />
      <ContentContainer>
        <ImagesContainer>
          <ImageBox>
            <PriceLogo width="100%" height="100%" />
          </ImageBox>
          <LineDiv />
          <ImageBox>
            <LawnMowerLogo width="100%" height="100%" />
          </ImageBox>
          <LineDiv />
          <ImageBox>
            <DoneLogo width="100%" height="100%" />
          </ImageBox>
        </ImagesContainer>
        <TextContainer>
          <ImagesResponsive>
            <PriceLogo width="100%" height="100%" />
          </ImagesResponsive>
          <TextBox>
            <Typography variant="h5">Направете запитване</Typography>
            <Typography>
            Уведомете ни от какви услуги се нуждаете и ние ще ви дадем незабавна обратна връзка и оценка на цената.
            </Typography>
          </TextBox>
          <ImagesResponsive>
            <LawnMowerLogo width="100%" height="100%" />
          </ImagesResponsive>
          <TextBox>
            <Typography variant="h5">Получаване на обслужване</Typography>
            <Typography>
            След уговорена дата и час, подбрани специално според вашата нужда градинари започват незабавна работа.
            </Typography>
          </TextBox>
          <ImagesResponsive>
            <DoneLogo width="100%" height="100%" />
          </ImagesResponsive>
          <TextBox>
            <Typography variant="h5">Готови сте!</Typography>
            <Typography variant="body2">
            Лесно управлявайте всичко от телефона си като получавате директна връзка.
            </Typography>
          </TextBox>
        </TextContainer>
      </ContentContainer>
      <ContactButton>Направи Запитване</ContactButton>
    </FlexContainer>
  );
};

export default About;
