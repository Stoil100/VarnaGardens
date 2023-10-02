import React from "react";
import mainLogo from "../Assets/Logos/VarnaGardensLogo.svg";
import { Typography,Box } from "@mui/material";

interface Props {
  title: string;
  span: string;
}

export const Title= ({ title, span }: Props) => {
  return (
    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
      <img src={mainLogo} width="100px" alt="Company Logo" style={{border:"1px solid #6a994e",borderRadius:"50%",backgroundColor:"#fff"}}/>
      <Typography variant="h3" sx={{fontFamily:"Lobster",maxWidth:"500px",textAlign:"center"}}>
        {title}
        <span style={{ color: "#6a994e" }}> {span}</span>
      </Typography>
    </Box>
  );
};
