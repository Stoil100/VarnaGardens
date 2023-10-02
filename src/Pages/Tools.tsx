import React from "react";
import { RevealSection } from "../Components/RevealSection";
import { Box, Typography } from "@mui/material";
import { RevealDirection } from "../Components/RevealDirection";
import styled from "@emotion/styled";

import HusqVarnaLogo from "../Assets/HusqVarnaLogo.png";
import StihlLogo from "../Assets/StihlLogo.png";
import EchoLogo from "../Assets/EchoLogo.png";

import toolsBackground from "../Assets/toolsBackground.jpg";

const LogoImage = styled.img`
  height: 200px;
  width: 350px;
`;

const LogoBox = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Tools: React.FC = () => {
  return (
    <RevealSection>
      <Box
        sx={{
          height: "88vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          border: "1px solid",
          textAlign: "center",
          background: `url(${toolsBackground}) no-repeat fixed 50% 0px;`,
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            width: "90%",
            height: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "#ffffff99",
            borderRadius: "40px",
          }}
        >
          <RevealDirection direction="up">
            <>
              <Typography variant="h4">
                Професионална техникка от професионални марки
              </Typography>
              <LogoBox>
                <LogoImage src={StihlLogo} />
                <LogoImage src={HusqVarnaLogo} />
                <LogoImage src={EchoLogo} />
              </LogoBox>
            </>
          </RevealDirection>
        </Box>
      </Box>
    </RevealSection>
  );
};
