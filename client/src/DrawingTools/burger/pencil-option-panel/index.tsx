import { useContext } from "react";
import { StyleOptionsContext } from "../../../context/StyleOptionsContext";

import { pencilColorsTypes } from "../../../helpers/pencilColorsTypes";
import ColorOptions from "../options-types/ColorOptions";
import StylingOption from "../options-types/StylingOption";


const PencilStyleOptions = () => {
  const {
    pencilSize,
    setPencilSize,
    pencilThinning,
    setPencilThinning,
    pencilStreamline,
    setPencilStreamline,
    pencilSmoothing,
    setPencilSmoothing,
    pencilTaperStart,
    setPencilTaperStart,
    pencilTaperEnd,
    setPencilTaperEnd,
    pencilColor,
    setPencilColor,
  } = useContext(StyleOptionsContext);

  const pencilStylingTypes = [
    {
      id: "Size",
      value: pencilSize,
      onChange: (event :React.ChangeEvent<HTMLInputElement> | any) => {
        setPencilSize(event.target.value);
      },
    },
    {
      id: "Thinning",
      value: pencilThinning,
      onChange: (event:React.ChangeEvent<HTMLInputElement> | any) => {
        setPencilThinning(event.target.value);
      },
    },
    {
      id: "Streamline",
      value: pencilStreamline,
      onChange: (event:React.ChangeEvent<HTMLInputElement> | any) => {
        setPencilStreamline(event.target.value);
      },
    },
    {
      id: "Smoothing",
      value: pencilSmoothing,
      onChange: (event:React.ChangeEvent<HTMLInputElement> | any) => {
        setPencilSmoothing(event.target.value);
      },
    },
    {
      id: "Taper Start",
      value: pencilTaperStart,
      onChange: (event:React.ChangeEvent<HTMLInputElement> | any) => {
        setPencilTaperStart(event.target.value);
      },
    },
    {
      id: "Taper End",
      value: pencilTaperEnd,
      onChange: (event:React.ChangeEvent<HTMLInputElement> | any) => {
        setPencilTaperEnd(event.target.value);
      },
    },
  ];

  return (
    <div className="styling-panel--container position-fixed">
      {pencilStylingTypes.map((type) => (
        <div key={type.id}>
          <StylingOption
            id={type.id}
            value={type.value}
            onChange={type.onChange}
          />
        </div>
      ))}

      <ColorOptions
        state={pencilColor}
        setState={setPencilColor}
        colorTypes={pencilColorsTypes}
        label={"Colors"}
      />
    </div>
  );
};

export default PencilStyleOptions;