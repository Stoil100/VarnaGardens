// src/App.tsx
import React, { useEffect, useState } from "react";
import { Nav } from "./Components/Nav";
import { LandingSection } from "./Pages/LandingSection";
import About from "./Pages/About";
import { Services } from "./Pages/Services";
import { Gallery } from "./Pages/Gallery";
import { Form } from "./Pages/Form";
import { Quotes } from "./Pages/Quotes";
import { Contact } from "./Pages/Contact";
import { Footer } from "./Pages/Footer";
import { Fab, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { RevealSection } from "./Components/RevealSection";
import { ScrollBar } from "./Components/ScrollBar";


const App: React.FC = () => {
  return (
    <>
    <ScrollBar/>
      <LandingSection />
      <RevealSection>
        <About />
      </RevealSection>
      <Services />
      <RevealSection>
        <Gallery />
      </RevealSection>
      <Form />
      <Quotes />
      <RevealSection>
        <>
          <Contact />
          <Footer />
        </>
      </RevealSection>
    </>
  );
};

export default App;
