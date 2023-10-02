import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import lawnMowerIcon from "../Assets/Logos/lawnmower.svg";
import toolsIcon from "../Assets/Logos/tools.svg";
import grassIcon from "../Assets/Logos/grass.svg";
import treeIcon from "../Assets/Logos/tree.svg";
import styled from "@emotion/styled";
import VarnaGardensLogo from "../Assets/Logos/VarnaGardensLogo.svg";
import { transform } from "typescript";

const NavIcon = styled.img`
  height: 70%;
`;

const NavItem = styled(Box)`
  height:10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: Lobster;
  font-weight:400;
  font-size:20px;
  transition:0.3s;
  cursor:pointer;

  &:hover{
    transform: scale(1.1)
  }
`;

export const Nav: React.FC = () => {
  const [value, setValue] = useState();

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        height: "12vh",
        width:"100vw",
        maxWidth: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#0E5814",
        color:"#f4f3ee",
        zIndex:"30",
        boxSizing: "border-box",
        padding:"10px",
      }}
    >
        <img src={VarnaGardensLogo} alt="logo" style={{borderRadius:"50%" , height:"100%",backgroundColor:"#fff"}}/>
      <NavItem>
        <NavIcon src={lawnMowerIcon}/>
        <span>Косене</span>
      </NavItem>
      <NavItem>
        <NavIcon src={grassIcon} />
        <span>Поддръжка</span>
      </NavItem>
      <NavItem>
        <NavIcon src={toolsIcon} />
        <span>Оборудване</span>
      </NavItem>
    </Box>
  );
};
