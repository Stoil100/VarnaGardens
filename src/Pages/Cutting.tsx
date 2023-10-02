import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import grassCutting from "../Assets/GrassCutting.jpg";
import { ContactButton } from "../Components/ContactButton";
import { RevealDirection } from "../Components/RevealDirection";
import { RevealSection } from "../Components/RevealSection";

const Image = styled.div`
  width: 45vw;
  height: 55vh;
  background-image: url(${grassCutting});
  background-size: cover;
  background-position: 50%;
  border-radius: 20px;
`;

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const fieldNames = ["name", "email", "phone"];

export const Cutting: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can now access the form data in the formData object and perform your submission logic here.
    console.log(formData);
  };

  return (
    <RevealSection>
      <Box
        sx={{
          width: "100%",
          height: "88vh",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding:"10vh",
          marginBottom: "25vh",
        }}
      >
        <RevealDirection direction="left">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              height: "75vh",
              width: "fit-content",
            }}
          >
            <Typography
              variant="h3"
              sx={{ color: "#132a13", fontFamily: "Montserrat Alternates" }}
            >
              Косене на трева
            </Typography>
            <Image />
            <Typography
              variant="body1"
              sx={{ color: "#132a13", width: "45vw" }}
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
              aliquam iure, ducimus saepe quaerat velit molestias earum? Fuga,
              dolorum obcaecati. Rerum dolores temporibus doloremque, libero
              inventore commodi. Odit, enim eligendi!
            </Typography>
          </Box>
        </RevealDirection>
        <RevealDirection direction="right">
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                width: "30vw",
                height: "65vh",
                padding: "2.5vw",
                borderRadius: "10px",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "#A7C957",
                  fontFamily: "Montserrat Alternatives",
                }}
              >
                Направете запитване
              </Typography>
              {fieldNames.map((fieldName) => (
                <TextField
                  key={fieldName}
                  required={fieldName !== "phone"}
                  variant="outlined"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  color="success"
                  fullWidth
                  label={
                    fieldName === "name"
                      ? "Име"
                      : fieldName === "email"
                      ? "Email"
                      : "Телефон"
                  }
                  name={fieldName}
                  value={formData[fieldName as keyof FormData]}
                  onChange={handleChange}
                  sx={{
                    border: "none",
                    "& fieldset": { border: "none" },
                    backgroundColor: "#E9F2EA",
                    borderRadius: "10px",
                  }}
                />
              ))}
              <TextField
                color="success"
                fullWidth
                required
                multiline
                rows={4}
                label="Съобщение"
                name="message"
                value={formData.message}
                onChange={handleChange}
                sx={{
                  border: "none",
                  "& fieldset": { border: "none" },
                  backgroundColor: "#E9F2EA",
                  borderRadius: "10px",
                }}
              />
              <ContactButton>Изпрати</ContactButton>
            </Box>
          </form>
        </RevealDirection>
      </Box>
    </RevealSection>
  );
};
