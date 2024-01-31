import { useContext } from "react";
import { StyleOptionsContext } from "../../../context/StyleOptionsContext";
import StylingOption from "../options-types/StylingOption";
import ColorOptions from "../options-types/ColorOptions";
import { rectangleColorsTypes } from "../../../helpers/rectangeColorsElement";




const RectangleStyleOptions = () => {
  const {
    rectangleStrokeWidth,
    setRectangleStrokeWidth,
    rectangleRoughness,
    setRectangleRoughness,
    rectangleBowing,
    setRectangleBowing,
    rectangleHachureGap,
    setRectangleHachureGap,
    rectangleHachureAngle,
    setRectangleHachureAngle,
    rectangleStrokeColor,
    setRectangleStrokeColor,
    rectangleFill,
    setRectangleFill,
  } = useContext(StyleOptionsContext);

  const rectangleStylingTypes = [
    {
      id: "Stroke Width",
      value: rectangleStrokeWidth,
      onChange: (event:React.ChangeEvent<HTMLInputElement> | any) => {
        setRectangleStrokeWidth(event.target.value);
      },
    },
    {
      id: "Roughness",
      value: rectangleRoughness,
      onChange: (event:React.ChangeEvent<HTMLInputElement> | any) => {
        setRectangleRoughness(event.target.value);
      },
    },
    {
      id: "Bowing",
      value: rectangleBowing,
      onChange: (event:React.ChangeEvent<HTMLInputElement> | any) => {
        setRectangleBowing(event.target.value);
      },
    },
    {
      id: "Hachure Gap",
      value: rectangleHachureGap,
      onChange: (event:React.ChangeEvent<HTMLInputElement> | any) => {
        setRectangleHachureGap(event.target.value);
      },
    },
    {
      id: "Hachure Angle",
      value: rectangleHachureAngle,
      onChange: (event:React.ChangeEvent<HTMLInputElement> | any) => {
        setRectangleHachureAngle(event.target.value);
      },
    },
  ];

  return (
    <div className="styling-panel--container position-fixed">
      {rectangleStylingTypes.map((type) => (
        <div key={type.id}>
          <StylingOption
            id={type.id}
            value={type.value}
            onChange={type.onChange}
          />
        </div>
      ))}

      <ColorOptions
        state={rectangleStrokeColor}
        setState={setRectangleStrokeColor}
        colorTypes={rectangleColorsTypes}
        label={"Stroke Colors"}
      />

      <ColorOptions
        state={rectangleFill}
        setState={setRectangleFill}
        colorTypes={rectangleColorsTypes}
        label={"Fill Colors"}
      />
    </div>
  );
};

export default RectangleStyleOptions;