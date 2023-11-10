import React,{useState,useEffect} from "react";
import styled from "@emotion/styled";
import grassBG from "../Assets/ScrollImages/grassBGrotated.svg";
import lawnmower from "../Assets/ScrollImages/lawnmowerScrollRotated.svg";

const ScrollBarBody = styled.div`
  position: fixed;
  right: 0;
  background-image: url("${grassBG}");
  background-position-x: -8px;
  background-color: #0E5814;
 height: 100vh;
  width:24px;
  z-index: 100;

  @media (max-width: 768px){
    display: none;
  }
`;

const ScrollBarTrack = styled.div`
width: 20px;
height: 100%;
background-image: url("${lawnmower}");
background-repeat: no-repeat;
background-position-y:bottom;
background-color:#0E5814;
background-size: contain;

@media (max-width: 768px){
  display: none;
}
`;



export const ScrollBar = () => {

  const [scrollPercentage, setScrollPercentage] = useState<number>(99);

  const handleScroll = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledHeight = window.scrollY;
    const percentage = (scrolledHeight / scrollableHeight) * 100;
    setScrollPercentage(99-percentage);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <ScrollBarBody>
      <ScrollBarTrack style={{transform:`translateY(-${scrollPercentage!.toFixed(2)}%)`}}/>
    </ScrollBarBody>
  );
};
