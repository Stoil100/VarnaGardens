// src/App.tsx
import React from "react";
import { LandingSection } from "./Pages/LandingSection";
import About from "./Pages/About";
import { Services } from "./Pages/Services";
import { Gallery } from "./Pages/Gallery";
import { Form } from "./Pages/Form";
import { Quotes } from "./Pages/Quotes";
import { Contact } from "./Pages/Contact";
import { Footer } from "./Pages/Footer";
import { RevealSection } from "./Components/RevealSection";
import { ScrollBar } from "./Components/ScrollBar";
import { isMobile } from "react-device-detect";
import Ad from "./Pages/Ad";
import Clients from "./Pages/Clients";

console.log(isMobile);

const App: React.FC = () => {
  return (
    <div>
      <Ad />
      <ScrollBar />
      <LandingSection />
      <RevealSection>
        <About />
      </RevealSection>
      <Services />
      <Clients />
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
    </div>
  );
};

export default App;
