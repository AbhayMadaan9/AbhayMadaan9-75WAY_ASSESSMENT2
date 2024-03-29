import React, { useContext, useState } from "react";
import { StyleOptionsContext } from "../../context/StyleOptionsContext";


import './stylebutton.scss'
import PencilStyleOptions from "./pencil-option-panel";
import RectangleStyleOptions from "./rectangle";
import LineStyleOptions from "./line-option-panel";

const BurgerButton = () => {
  const [toggle, setToggle] = useState(false);
  const { toolType } = useContext(StyleOptionsContext);

  const toggleHandler = () => {
    setToggle((prevState) => !prevState);
  };

  return (
    <>
      <div className="container--burger-button position-fixed">
        <button
          className={
            toggle
              ? "flex flex-jcenter flex-acenter burger active"
              : "flex flex-jcenter flex-acenter burger"
          }
          onClick={toggleHandler}
        >
          <img src="/assets/burger-icon.svg" alt="burger" />
        </button>
      </div>

      {toggle && toolType === "pencil" ? <PencilStyleOptions /> : null}
      {toggle && toolType === "rectangle" ? <RectangleStyleOptions /> : null}
      {toggle && toolType === "line" ? <LineStyleOptions /> : null}
    </>
  );
};

export default BurgerButton;