import React, { useContext } from "react";

import { StyleOptionsContext } from "../../context/StyleOptionsContext";
import { StyleOptionsContextType } from "../../../global";
import { Button } from "@mui/material";

const Rectangle = () => {
    const { toolType, setToolType } = useContext<StyleOptionsContextType>(StyleOptionsContext);
  return (
    <Button
      onClick={() => setToolType("rectangle")}
      id={"rectangle"}
      className={toolType === "rectangle" ? "flex flex-acenter flex-jcenter tool active" : "flex flex-acenter flex-jcenter tool"}
    >
      <img src="/assets/rectangle-icon.svg" alt="rectangle" />
    </Button>
  );
};

export default Rectangle;