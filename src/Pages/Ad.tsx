import styled from "@emotion/styled";
import { NotificationsActive, NotificationsNone } from "@mui/icons-material";
import { Alert, Badge, Dialog, Fab, Snackbar } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import { RevealDirection } from "../Components/RevealDirection";

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

const SnackAlert = styled(Alert)`
margin-left:60px;
max-width:300px;
border-radius:20px;
color:gray;
font-family:Comfortaa;

@media (max-width:600px){
  max-width:100vw;
  margin: 10px;
}
`;

export default function Ad() {
  const [hasFinnishedAnimation, setHasFinnishedAnimation] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  
  return (
    <ThemeProvider theme={theme}>
      {hasFinnishedAnimation ? (
        <FabContainer>
          <Fab color="primary" onClick={()=>{setIsOpen(true)}}>
            <Badge variant={hasOpened===undefined?"dot":undefined} color="secondary">
              <NotificationsActive />
            </Badge>
          </Fab>
         
          <Snackbar
            open={isOpen}
            autoHideDuration={20000}
            onClose={() => {
              setIsOpen(false);
            }}
          >
            <SnackAlert
              onClose={() => {
                setIsOpen(false);
              }}
              severity="success"
             
            >
             Нека нашите специалисти проведат безплатен оглед и ви предоставят всички необходими информации и съвети
              </SnackAlert>
          </Snackbar>

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
      <Dialog open={hasOpened===undefined?false:hasOpened} onClose={()=>{setHasOpened(false)}}/>
    </ThemeProvider>
  );
}
