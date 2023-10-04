import React from "react";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { ContactButton } from "../Components/ContactButton";
// import { ReactComponent as GrassLogo } from "../Assets/Logos/grass.svg";
// import { ReactComponent as TreeLogo } from "../Assets/Logos/tree.svg";
// import { ReactComponent as LawnMowerLogo } from "../Assets/Logos/lawnmower.svg";
// import { ReactComponent as ToolsLogo } from "../Assets/Logos/tools.svg";
import { ReactComponent as PriceLogo } from "../Assets/HowItWorksIcons/price.svg";
import { ReactComponent as LawnMowerLogo } from "../Assets/HowItWorksIcons/lawnmower.svg";
import { ReactComponent as DoneLogo } from "../Assets/HowItWorksIcons/done.svg";
import { Title } from "../Components/Title";

console.log(process.env);

const GridBox = styled(Box)`
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 20px 30px;
  grid-template-areas:
    ". title title ."
    ". title title ."
    "box1 description description box3"
    "box2 description description box4";
  text-align: center;
  @media (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-template-areas:
      " title "
      " box1"
      "box2 "
      "description"
      "description"
      " box3"
      " box4 ";
    padding: 0;
  }
`;
const FlexContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  gap: 40px;
`;

const FlexBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 200px;
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
const BoxesDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
const About: React.FC = () => {
  return (
    // <GridBox sx={{ paddingX: "50px", paddingY: "30px" }}>
    //   <FlexBox sx={{ backgroundColor: "#f3f3f3", gridArea: "box1" }}>
    //     <GrassLogo fill="#6a994e" style={{ width: "40%", height: "auto" }} />
    //     <TextBox>Специализирани В Сферата</TextBox>
    //   </FlexBox>
    //   <FlexBox sx={{ backgroundColor: "#f3f3f3", gridArea: "box2" }}>
    //     <LawnMowerLogo
    //       fill="#6a994e"
    //       style={{ width: "40%", height: "auto" }}
    //     />
    //     <TextBox>Честни и Надеждни</TextBox>
    //   </FlexBox>
    //   <FlexBox sx={{ backgroundColor: "#f3f3f3", gridArea: "box3" }}>
    //     <TreeLogo fill="#6a994e" style={{ width: "40%", height: "auto" }} />
    //     <TextBox>Дългогодишен Опит</TextBox>
    //   </FlexBox>
    //   <FlexBox sx={{ backgroundColor: "#f3f3f3", gridArea: "box4" }}>
    //     <ToolsLogo fill="#6a994e" style={{ width: "40%", height: "auto" }} />
    //     <TextBox>Винаги На Линия</TextBox>
    //   </FlexBox>
    //   <FlexBox
    //     sx={{
    //       gridArea: "description",
    //       justifyContent: "space-between !important",
    //       paddingY: "20px",
    //     }}
    //   >
    //     <Typography variant="body1">
    //       Изберете Varna Gardens за професионална грижа за вашата градина.
    //       Нашият квалифициран екип и първокласно оборудване гарантират
    //       безупречни резултати върху вашият двор.
    //     </Typography>
    //     <Typography variant="body1">
    //       Varna Gardens предлага персонализирани, ориентирани към клиента
    //       решения за грижа за тревните площи и градинарството. Ние работим в
    //       тясно сътрудничество с вас, за да реализираме визията ви за външния
    //       двор, като гарантираме пълното ви удовлетворение.
    //     </Typography>
    //     <ContactButton>Свържете се с нас</ContactButton>
    //   </FlexBox>
    //   <FlexBox sx={{ gridArea: "title" }}>
    //     <Title title="Кои Сме" span="Ние" />
    //     <Typography variant="body2">
    //       В Varna Gardens ние не сме просто фирма за косене на тревни площи, а
    //       любители на градината, които се стремят да превърнат вашето външно
    //       пространство в райски кът.
    //     </Typography>
    //   </FlexBox>
    // </GridBox>
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
              Уведомете ни за какви услуги се нуждаете от помощ и ние ще ви
              дадем незабавна оценка на цената.
            </Typography>
          </TextBox>
          <ImagesResponsive>
            <LawnMowerLogo width="100%" height="100%" />
          </ImagesResponsive>
          <TextBox>
            <Typography variant="h5">Получаване на обслужване</Typography>
            <Typography>
              Ще ви подберем специалист по тревни площи, който ще изпълни
              работата.
            </Typography>
          </TextBox>
          <ImagesResponsive>
            <DoneLogo width="100%" height="100%" />
          </ImagesResponsive>
          <TextBox>
            <Typography variant="h5">Готови сте!</Typography>
            <Typography variant="body2">
              Лесно управлявайте всичко от телефона или компютъра си. Можете да
              резервирате допълнителни услуги само с няколко кликвания.
            </Typography>
          </TextBox>
        </TextContainer>
      </ContentContainer>
      <ContactButton>Направи Запитване</ContactButton>
      {/* <BoxesDiv>
        <FlexBox>
          <ImageBox>
            <PriceLogo width="100%" height="100%"/>
          </ImageBox>
          <TextBox>Направете запитване</TextBox>
          <TextBox></TextBox>
        </FlexBox>
        <LineDiv></LineDiv>
        <FlexBox>
          <ImageBox>
            <LawnMowerLogo width="100%" height="100%"/>
          </ImageBox>
          <TextBox>Получаване на обслужване</TextBox>
          <TextBox></TextBox>
        </FlexBox>
        <LineDiv></LineDiv>
        <FlexBox>
          <ImageBox>
            <DoneLogo width="100%" height="100%"/>
          </ImageBox>
          <TextBox>Готови сте!</TextBox>
          <TextBox></TextBox>
        </FlexBox>
      </BoxesDiv> */}
    </FlexContainer>
  );
};

export default About;
