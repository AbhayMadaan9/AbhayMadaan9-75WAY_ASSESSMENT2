import { useContext } from "react";
import { StyleOptionsContext } from "../../../context/StyleOptionsContext";

import { lineColorsTypes } from "../../../helpers/lineColorsTypes";
import ColorOptions from "../options-types/ColorOptions";
import StylingOption from "../options-types/StylingOption";


const LineStyleOptions = () => {
  const {
    lineStrokeWidth,
    setLineStrokeWidth,
    lineRoughness,
    setLineRoughness,
    lineBowing,
    setLineBowing,
    lineStrokeColor,
    setLineStrokeColor,
  } = useContext(StyleOptionsContext);

  const lineStylingTypes = [
    {
      id: "Stroke Width",
      value: lineStrokeWidth,
      onChange: (event: any) => {
        setLineStrokeWidth(event.target.value);
      },
    },
    {
      id: "Roughness",
      value: lineRoughness,
      onChange: (event: any) => {
        setLineRoughness(event.target.value);
      },
    },
    {
      id: "Bowing",
      value: lineBowing,
      onChange: (event:  any) => {
        setLineBowing(event.target.value);
      },
    },
  ];

  return (
    <div className="styling-panel--container position-fixed">
      {lineStylingTypes.map((type) => (
        <div key={type.id}>
          <StylingOption
            id={type.id}
            value={type.value}
            onChange={type.onChange}
          />
        </div>
      ))}

      <ColorOptions
        state={lineStrokeColor}
        setState={setLineStrokeColor}
        colorTypes={lineColorsTypes}
        label={"Stroke Colors"}
      />
    </div>
  );
};

export default LineStyleOptions;