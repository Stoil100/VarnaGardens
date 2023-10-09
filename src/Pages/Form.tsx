import React from "react";
import { Box } from "@mui/material";
import { ContactForm } from "../Components/ContactForm";
import styled from "@emotion/styled";
import backgroundImg from "../Assets/toolsBackground.jpg";
import { RevealDirection } from "../Components/RevealDirection";

const FormBox = styled(Box)`
  background: url(${backgroundImg}) no-repeat fixed 50% 0px;
  background-size: cover;
  height:100vh;
  min-height:fit-content;
  @media (max-width: 570px) {
  min-height:100vh;
  }
`;

const FormBoxItem = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #000000c1;
`;

export const Form = () => {
  return (
    <FormBox>
      <FormBoxItem>
        <RevealDirection direction="up">
          <ContactForm />
        </RevealDirection>
      </FormBoxItem>
    </FormBox>
  );
};
