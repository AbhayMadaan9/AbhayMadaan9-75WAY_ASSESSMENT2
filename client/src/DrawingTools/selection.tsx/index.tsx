import React, { useContext } from "react";

import { StyleOptionsContext } from "../../context/StyleOptionsContext";
import { StyleOptionsContextType } from "../../../global";
import { Button } from "@mui/material";

const Selection = () => {
    const { toolType, setToolType } = useContext<StyleOptionsContextType>(StyleOptionsContext);
  return (
    <Button
      onClick={() => setToolType("selection")}
      id={"selection"}
      className={toolType === "selection" ? "flex flex-acenter flex-jcenter tool active" : "flex flex-acenter flex-jcenter tool"}
    >
      <img src="/assets/mouse-icon.svg" alt="selection" />
    </Button>
  );
};

export default Selection;