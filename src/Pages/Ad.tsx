import styled from "@emotion/styled";
import { NotificationsActive, NotificationsNone } from "@mui/icons-material";
import { Fab, Typography, Badge, Alert, Snackbar,Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { RevealDirection } from "../Components/RevealDirection";
import { isMobile } from "react-device-detect";
const audio = require('../Assets/sounds/ding.mp3');
const Sound = new Audio(audio)


const theme = createTheme({
  palette: {
    primary: {
      main: "#6a994e",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f0b429",
      contrastText: "#fff",
    },
  },
});

const FabContainer = styled.div`
position: fixed;
left: 20px;
bottom: 20px;
z-index: 1000;
display: flex;
justify-content: center;
align-items: center;
gap: 10px;
`;
export default function Ad() {
  const [hasFinnishedAnimation, setHasFinnishedAnimation] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState<undefined|boolean>(undefined);

  useEffect(()=>{
    Sound.load();
    if(hasFinnishedAnimation){
      var resp = Sound.play();

if (resp!== undefined) {
    resp.then(_ => {
        // autoplay starts!
    }).catch(error => {
      throw error
    });
}
    }
  },[hasFinnishedAnimation])

  return (
    <ThemeProvider theme={theme}>
      {hasFinnishedAnimation ? (
        <FabContainer>
          <Fab color="primary" onClick={()=>{setIsOpen(true)}}>
            <Badge variant={hasOpened===undefined?"dot":undefined} color="secondary">
              <NotificationsActive />
            </Badge>
          </Fab>
          {!isMobile&&
          <Snackbar
            open={isOpen}
            autoHideDuration={20000}
            onClose={() => {
              setIsOpen(false);
            }}
          >
            <Alert
              onClose={() => {
                setIsOpen(false);
              }}
              severity="success"
              sx={{ marginLeft:"60px",
              maxWidth:"300px",
              borderRadius:"20px",
              color:"gray",
              fontFamily:"Comfortaa"
            }}
            >
             Поради разрастване на нашата дейност специално за Ноември ако желаете дългосрочен абонамент можете да спечелите безплатна поддръжка за до един месец 
            </Alert>
          </Snackbar>
}
        </FabContainer>
      ) : (
        <FabContainer>
          <RevealDirection
            direction="up"
            onAnimationEnd={() => {
              setHasFinnishedAnimation(true);
              setIsOpen(true);
            }}
          >
            <Fab color="primary">
              <NotificationsNone />
            </Fab>
          </RevealDirection>
        </FabContainer>
      )}
      <Dialog open={hasOpened===undefined?false:hasOpened} onClose={()=>{setHasOpened(false)}}>

      </Dialog>
    </ThemeProvider>
  );
}
