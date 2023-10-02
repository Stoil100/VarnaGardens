import React from "react";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { ContactButton } from "../Components/ContactButton";
import contactBG from "../Assets/contactBG.jpg";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  height: 40vh;
  width: 100%;
  text-align: center;
  background-color: #59a608c2;
  color: #fff;
`;

export const Contact = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${contactBG})`,
        backgroundSize: "cover",
      }}
    >
      <FlexBox sx={{ px: "10%", py:"10px"}}>
        <Typography variant="h4">
          Харесвате нашите услуги и искате да ни наемете?
        </Typography>
        <Typography variant="body1">
          Имате въпроси, запитвания или сте готови да преобразите своята
          градина? Ние сме тук, за да ви помогнем! 
          Независимо дали искате да насрочите услуга, да поискате оферта или
          просто да разговаряте за нуждите си в областта на градинарството, ние
          сме само на едно съобщение или обаждане.
        </Typography>
        <ContactButton>Свържете се с нас</ContactButton>
      </FlexBox>
    </Box>
  );
};
