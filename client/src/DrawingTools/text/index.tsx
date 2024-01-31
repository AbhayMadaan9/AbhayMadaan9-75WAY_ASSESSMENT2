import React, { useContext } from "react";

import { StyleOptionsContext } from "../../context/StyleOptionsContext";
import { StyleOptionsContextType } from "../../../global";
import { Button } from "@mui/material";

const Text = () => {
    const { toolType, setToolType } = useContext<StyleOptionsContextType>(StyleOptionsContext);
  return (
    <Button
      onClick={() => setToolType("text")}
      id={"text"}
      className={toolType === "text" ? "flex flex-acenter flex-jcenter tool active" : "flex flex-acenter flex-jcenter tool"}
    >
      <img src="/assets/text-icon.svg" alt="text" />
    </Button>
  );
};

export default Text;