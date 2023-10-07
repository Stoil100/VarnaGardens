import React, { useState } from "react";
import { Title } from "../Components/Title";
import { Box, Dialog, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Send } from "@mui/icons-material";
import { useForm } from "react-hook-form";

import styled from "@emotion/styled";
import quotesBG from "../Assets/quotesBG.png";

const GridBox = styled(Box)`
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1.2fr 0.8fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px 30px;
  grid-template-areas:
    "title title"
    "quote image";
  min-height: 100vh;
  box-sizing: border-box;

  @media (max-width:1000px){
    grid-template-areas:
    "title"
    "quote"
    "image";
    grid-template-columns: 1fr;
    grid-template-rows: 0.4fr 0.3fr 0.3fr;
  }
`;

const BackgroundImg = styled.img`
  grid-area: image;
  height: 100%;
  width: 100%;
`;

const QuoteButton = styled.button`
  background-color: #6a994e;
  border: 0px;
  border-radius: 50px;
  width: 500px;
  height: 50px;
  color: #fff;
  font-size: 20px;
  font-family: Montserrat Alternates;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 20px;

  &:hover {
    transform: scale(1.05);
  }

  @media(max-width:550px){
    width: 100%;
  }
`;

const MessageBox = styled(Box)`
  padding: 10px;
`;

interface SubmitQuoteTexts {
  name: string;
  message: string;
}

export const Quotes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<SubmitQuoteTexts>();

  const sendQuote = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsLoading(false);
    }, 2000);
  };
  return (
    <GridBox>
      <Box gridArea="title" sx={{ pt: "30px" ,display:"flex",justifyContent:"center",alignItems:"start"}}>
        <Title title="Какво Мислят" span="Клиентите Ни" />
      </Box>
      <Box gridArea="quote" sx={{ px: "40px" }}>
        <Box>
          <Typography variant="body1" sx={{fontSize:"20px"}}>Преди 1 седмица</Typography>
          <Typography variant="h5" sx={{ color: "#666666", my:"20px"}}>
            "Не мога да изразя колко съм развълнуван от услугата за грижа за
            тревните площи на Varna Gardens. Градината ми никога не
            е изглеждала по-добре, а професионализмът на екипа и вниманието към
            детайлите са наистина похвални."
          </Typography>
          <Typography variant="body2" sx={{fontWeight:"bold" ,fontSize:"20px"}}>
            -Димитър Петров
          </Typography>
        </Box>
        <QuoteButton
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Споделете Вашето Мнение
        </QuoteButton>
        <Dialog
          open={isOpen!}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <MessageBox component="form" onSubmit={handleSubmit(sendQuote)}>
            <Typography variant="h4" sx={{ fontFamily: "Lobster" }}>
              Споделете какво мислите за нас
            </Typography>
            <TextField
              margin="normal"
              color="secondary"
              required
              fullWidth
              id="name"
              label="Име"
              {...register("name", { required: "Required" })}
              sx={{
                backgroundColor: "#D0F1BF",
                borderRadius: "5px",
                "& fieldset": { border: "none" },
              }}
            />
            <TextField
              multiline
              color="secondary"
              rows={4}
              margin="normal"
              required
              fullWidth
              label="Съобщение"
              type="message"
              id="message"
              {...register("message", { required: "Required" })}
              sx={{
                backgroundColor: "#D0F1BF",
                borderRadius: "5px",
                "& fieldset": { border: "none" },
              }}
            />
            <LoadingButton
              type="submit"
              color="success"
              variant="contained"
              fullWidth
              loading={isLoading}
              endIcon={<Send />}
            >
              Изпрати
            </LoadingButton>
          </MessageBox>
        </Dialog>
      </Box>
      <BackgroundImg src={quotesBG} />
    </GridBox>
  );
};
