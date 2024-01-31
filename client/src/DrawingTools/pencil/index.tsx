import React, { useContext } from "react";

import { StyleOptionsContext } from "../../context/StyleOptionsContext";
import { StyleOptionsContextType } from "../../../global";
import { Button } from "@mui/material";

const Pencil = () => {
    const { toolType, setToolType } = useContext<StyleOptionsContextType>(StyleOptionsContext);
  return (
    <Button
      onClick={() => setToolType("pencil")}
      id={"pencil"}
      className={toolType === "pencil" ? "flex flex-acenter flex-jcenter tool active" : "flex flex-acenter flex-jcenter tool"}
    >
      <img src="/assets/pencil-icon.svg" alt="pencil" />
    </Button>
  );
};

export default Pencil;