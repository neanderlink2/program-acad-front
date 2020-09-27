import React from "react";
import { Credits, SpacedBox } from "./styles";


export const Footer = () => {
  return (
    <footer>
      <SpacedBox>        
        <Credits>Program.Acad - {new Date().getFullYear()}</Credits>
      </SpacedBox>
    </footer>
  );
};
