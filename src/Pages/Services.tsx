import React from "react";
import { Box, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Title } from "../Components/Title";
import mainBG from "../Assets/mainBackground.png";
import { ReactComponent as GrassServiceIcon } from "../Assets/ServicesLogos/GrassServicesIcon.svg";
import { ReactComponent as BushServiceIcon } from "../Assets/ServicesLogos/BushServicesIcon.svg";
import { ReactComponent as LawnMowingServiceIcon } from "../Assets/ServicesLogos/LawnMowingServicesIcon.svg";
import { ReactComponent as PlanningServiceIcon } from "../Assets/ServicesLogos/PlanningServicesIcon.svg";
import { ReactComponent as RecyclingServiceIcon } from "../Assets/ServicesLogos/RecyclingServicesIcon.svg";
import { ReactComponent as TreeServiceIcon } from "../Assets/ServicesLogos/TreeServicesIcon.svg";
import bushesBG from "../Assets/bushesBackground.jpg";

const GridBox = styled(Box)`
  background-image: url(${mainBG});
  min-height: 100vh;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 20px 30px;
  grid-template-areas:
    " title title "
    " box1 box2 "
    " box3 box4 "
    " box5 box6 ";
  text-align: center;
  box-sizing: border-box;
  @media (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-template-areas:
      " title "
      " box1"
      "box2 "
      " box3"
      " box4 "
      " box5"
      " box6 ";
    padding: 10px;
    margin-top: 50px;
  }
`;
const BoxParent = styled(Box)`
  display: block;
  height: 275px;
  outline: 3px dotted #6a994e;
  box-sizing: border-box;
  background-image: url(${bushesBG});
  background-size: cover;
`;

const BoxItem = styled(Box)`
  background-color: #fff;
  height: 255px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.35s;
  padding: 10px;
  gap: 10px;
  &:hover {
    color: #fff;
    fill: #fff;
    background-color: #00000050;
  }
`;

const TextBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  text-align: left;
`;

export const Services: React.FC = () => {
  return (
    <GridBox sx={{ paddingY: "40px", paddingX: "60px" }}>
      <Box sx={{ gridArea: "title" }}>
        <Title title="Какво" span="Предлагаме" />
      </Box>
      <BoxParent>
        <BoxItem sx={{ gridArea: "box1" }}>
          <LawnMowingServiceIcon width="124px" height="auto" />
          <TextBox>
            <Typography variant="h5">Косене на трева</Typography>
            <Typography variant="body1">
              Нашата услуга за косене на трева гарантира перфектно поддържан
              двор с професионално оборудване и опит.
            </Typography>
          </TextBox>
        </BoxItem>
      </BoxParent>
      <BoxParent>
        <BoxItem sx={{ gridArea: "box2" }}>
          <BushServiceIcon width="124px" height="auto" />
          <TextBox>
            <Typography variant="h5">Рязане на дървета</Typography>
            <Typography variant="body1">
              Режем,оформяме и също така подрязваме дървета или дръвчета.
            </Typography>
          </TextBox>
        </BoxItem>
      </BoxParent>
      <BoxParent>
        <BoxItem sx={{ gridArea: "box3" }}>
          <GrassServiceIcon width="124px" height="auto" />
          <TextBox>
            <Typography variant="h5">Почистване на дворове</Typography>
            <Typography variant="body1">
             Предлагаме и напълно почистване на изостсвени дворове и ливади.
            </Typography>
          </TextBox>
        </BoxItem>
      </BoxParent>
      <BoxParent>
        <BoxItem sx={{ gridArea: "box4" }}>
          <TreeServiceIcon width="124px" height="auto" />
          <TextBox>
            <Typography variant="h5">Подрязване на храсти</Typography>
            <Typography variant="body1">
              Нашето експертно подрязване вдъхва нов живот на вашите храсти и
              дървета, като насърчава здравословния растеж за добре поддържана
              градина.
            </Typography>
         
          </TextBox>
        </BoxItem>
      </BoxParent>
      <BoxParent>
        <BoxItem sx={{ gridArea: "box5" }}>
          <PlanningServiceIcon width="124px" height="auto" />
          <TextBox>
            <Typography variant="h5">Точност</Typography>
            <Typography variant="body1">
              Обръщаме внимание на детайлите във всеки аспект на вашата градина.
              
            </Typography>
          </TextBox>
        </BoxItem>
      </BoxParent>
      <BoxParent>
        <BoxItem sx={{ gridArea: "box6" }}>
          <RecyclingServiceIcon width="124px" height="auto" />
          <TextBox>
            <Typography variant="h5">Грижа</Typography>
            <Typography variant="body1">
              Отнасяме се с изключителна грижа към вашите растения и тревни
              площи.
            </Typography>
          </TextBox>
        </BoxItem>
      </BoxParent>
    </GridBox>
  );
};
