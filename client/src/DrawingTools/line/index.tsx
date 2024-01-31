import React, { useContext } from "react";
import {StyleOptionsContextType } from "../../../global";
import { StyleOptionsContext } from "../../context/StyleOptionsContext";
import { Button } from "@mui/material";

const Line = () => {
  const { toolType, setToolType } = useContext<StyleOptionsContextType>(StyleOptionsContext);
  return (
    <Button
      onClick={() => setToolType("line")}
      id={"line"}
      className={toolType === "line" ? "flex flex-acenter flex-jcenter tool active" : "flex flex-acenter flex-jcenter tool"}
    >
      <img src="/assets/line-icon.svg" alt="line" />
    </Button>
  );
};

export default Line;