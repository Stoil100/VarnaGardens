import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import mainLogo from "../Assets/Logos/VarnaGardensLogo.svg";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import emailjs from "emailjs-com";
import { isMobile } from "react-device-detect";

const {REACT_APP_SERVICE_ID,REACT_APP_TEMPLATE_ID,REACT_APP_KEY_ID}=process.env;

const theme = createTheme({
  palette: {
    primary: {
      main: "#f0b429",
      contrastText: "#fff",
    },
    secondary: {
      main: "#000",
      contrastText: "#fff",
    },
  },
});

const FormBox = styled(Box)`
  width: 550px;
  height: 600px;
  max-height:90vh;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  background-color: #6a994e;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  z-index: 2;

  @media (max-width: 570px) {
    width:300px;
    height:700px;
  }

  @media (max-width:320px){
    width:200px;
  }
};`;

const TitleBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const TitleImg = styled.img`
  width: 100px;
  border: 1px solid #6a994e;
  border-radius: 50%;
  background-color: #fff;

  @media (max-width: 570px) {
    width: 60px;
  }
`;
const ContactBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
  @media (max-width: 570px) {
    flex-direction: column;
    text-align: center;
  }
`;

interface FormValues {
  name: string;
  email: string;
  telephone?: string;
  message: string;
}

export const ContactForm = () => {
  const formRef = useRef();
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const handleInfo = async (data: FormValues) => {
    const formData = {
      name: data.name,
      email: data.email,
      telephone: data.telephone,
      message: data.message,
    };

    try {
      await emailjs.send(
        REACT_APP_SERVICE_ID!,
        REACT_APP_TEMPLATE_ID!,
        formData,
        REACT_APP_KEY_ID!
      );
    } catch (error) {
      console.error("Error sending email:", error);
    }
    reset();
  };
  return (
    <ThemeProvider theme={theme}>
      <FormBox
        component="form"
        onSubmit={handleSubmit(handleInfo)}
        ref={formRef}
        sx={{ mt: 1 }}
      >
        <TitleBox>
          <TitleImg src={mainLogo} alt="Company Logo" />
          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{
              color: "#A7C957",
              fontFamily: "Montserrat Alternates",
            }}
          >
            Направете запитване
          </Typography>
        </TitleBox>
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
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
            margin="normal"
            color="secondary"
            required
            fullWidth
            id="email"
            label="Имейл"
            autoComplete="email"
            {...register("email", { required: "Required" })}
            sx={{
              backgroundColor: "#D0F1BF",
              borderRadius: "5px",
              "& fieldset": { border: "none" },
            }}
          />
          <TextField
            margin="normal"
            color="secondary"
            fullWidth
            label="Телефон (optional)"
            type="telephone"
            id="telephone"
            autoComplete="telephone"
            {...register("telephone", { required: false })}
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
            {...register("message", { required: true })}
            sx={{
              backgroundColor: "#D0F1BF",
              borderRadius: "5px",
              "& fieldset": { border: "none" },
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <ContactBox>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, flex: 1 }}
              >
                Изпрати
              </Button>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography sx={{ fontFamily: "Montserrat Alternates" }}>
                  Или ни се обадете (+359)882 8828
                </Typography>
              </Box>
            </ContactBox>
          </Box>
        </Box>
      </FormBox>
    </ThemeProvider>
  );
};
