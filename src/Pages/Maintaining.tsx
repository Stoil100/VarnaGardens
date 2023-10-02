import React from "react";
import { Box, Typography } from "@mui/material";
import { RevealDirection } from "../Components/RevealDirection";
import { ContactButton } from "../Components/ContactButton";
import bushBackground from "../Assets/bushesBackground.jpg";
import maintainImg from "../Assets/MaintainingShow.jpg";

const MaintenanceItems = [
  { title: "1. Дългогодишен опит", text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti nisi amet doloribus tempore! Nostrum architecto", image: bushBackground },
  { title: "2. Внимание към детайлите", text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti nisi amet doloribus tempore! Nostrum architecto", image: bushBackground },
  { title: "3. Бърза и ефикастна работа", text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti nisi amet doloribus tempore! Nostrum architecto", image: bushBackground },
];

export const Maintain = () => {
  return (
    <Box sx={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      backgroundColor: "#235243",
    }}>
      <Box sx={{ position: "absolute", top: -100 ,zIndex:1}}>
        <RevealDirection direction="up">
          <Box sx={{ display: "flex", width: "90vw", height: "60vh",padding:"10px",}}>
            <img src={maintainImg} style={{ height: "100%", width: "40%" }} alt="Maintain Img" />
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100%",
              width: "60%",
              paddingX: "40px",
              backgroundColor: "#6a994e",
              textAlign: "center",
            }}>
              <img alt="Image" />
              <Typography>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti nisi amet doloribus tempore! Nostrum architecto assumenda, voluptatem laudantium itaque eum dolorum ex illo autem est, expedita repellat provident natus sint?
              </Typography>
              <ContactButton>Направи Поръчка</ContactButton>
            </Box>
          </Box>
        </RevealDirection>
      </Box>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        width: "90vw",
        height:"90%",
        backgroundColor: "#fff",
        padding:"10px",
        paddingBottom: "75px",	
        marginBottom: "100px",
      }}>
        {MaintenanceItems.map((item, index) => (
          <Box key={index} sx={{
            width: "32%",
            height: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <img src={item.image} style={{ width: "150px", height: "100%", marginRight: "10px" }} alt="Item Img" />
            <Box>
              <Typography variant="h5">{item.title}</Typography>
              <Typography variant="body1">{item.text}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};