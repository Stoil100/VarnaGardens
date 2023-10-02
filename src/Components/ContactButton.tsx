import React, { useState } from "react";
import styled from "@emotion/styled";
import { Backdrop, Button, Dialog } from "@mui/material";
import { ContactForm } from "./ContactForm";
import { CloseOutlined } from "@mui/icons-material";

const ButtonComponent = styled.button`
  background-color: #f0b429;
  width: 300px;
  height: 45px;
  color: #fff;
  border-radius: 50px;
  border: none;
  font-size: 20px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
  @media (max-width: 300px) {
    width: 100%;
  }
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ButtonAnimated = styled.button`
  background-color: #f0b429;
  width: 300px;
  height: 50px;
  color: #fff;
  border-radius: 50px;
  border: none;
  font-size: 20px;
  transition: 0.3s;
  cursor: pointer;
  // animation: bounce 0.7s infinite;

  &:hover {
    transform: scale(1.1);
    animation: none;
  }
  @media (max-width: 300px) {
    width: 100%;
  }
  @keyframes bounce {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.05);
    }

    100% {
      transform: scale(1);
    }
  }
`;

interface Props {
  children: JSX.Element | string;
  hasAnimation?: boolean;
}

export const ContactButton: React.FC<Props> = ({
  children,
  hasAnimation,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      {hasAnimation ? (
        <ButtonAnimated
          onClick={() => {
            setIsVisible(true);
          }}
        >
          {children}
        </ButtonAnimated>
      ) : (
        <ButtonComponent
          onClick={() => {
            setIsVisible(true);
          }}
        >
          {children}
        </ButtonComponent>
      )}
      <Dialog
        open={isVisible}
        onClose={() => {
          setIsVisible(false);
        }}
        sx={{
          "& .MuiPaper-root": {
            background: "transparent",
          },
        }}
      >
        <ContactForm />
        <CloseButton
          color="error"
          onClick={() => {
            setIsVisible(false);
          }}
          variant="contained"
        >
          <CloseOutlined />
        </CloseButton>
      </Dialog>
    </>
  );
};
