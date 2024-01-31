import React, { useContext } from "react";

import {StyleOptionsContext} from '../../context/StyleOptionsContext'
import { Button } from "@mui/material";

const Eraser: React.FC = () => {
  const { toolType, setToolType } = useContext<any>(StyleOptionsContext);
  return (
    
    <Button
      onClick={() => setToolType("eraser")}
      id={"eraser"}
      className={toolType === "eraser" ? "flex flex-acenter flex-jcenter tool active" : "flex flex-acenter flex-jcenter tool"}
    >
      <img src="/assets/eraser-icon.svg" alt="eraser" />
    </Button>
  
  )
};

export default Eraser;

