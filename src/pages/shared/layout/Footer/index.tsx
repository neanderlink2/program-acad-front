import React from "react";
import logoIFB from "../../../../assets/logo_ifb.png";
import { Credits, Logo, SpacedBox } from "./styles";


export const Footer = () => {
  return (
    <footer>
      <SpacedBox>
        <Logo src={logoIFB} alt="Logo do IFB (Instituto Federal de Brasília)" />
        <Credits>Program.Acad - {new Date().getFullYear()}</Credits>
      </SpacedBox>
    </footer>
  );
};
