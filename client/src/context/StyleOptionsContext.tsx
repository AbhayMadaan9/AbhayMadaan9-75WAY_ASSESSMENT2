import React, { useState, createContext, ReactNode } from "react";
import { useHistory } from "../hooks/useHistory";
import { LineStyleType, PencilStyleType, RectangleStyleType, StyleOptionsContextType } from "../../global";

type Props = {
  children: ReactNode;
};



export const StyleOptionsContext = createContext<StyleOptionsContextType>({
  toolType: "",
  setToolType: () => {},
  trashBinModalOpen: false,
  setTrashBinModalOpen: () => {},
  elements: [], // Assuming elements is an array, adjust based on your implementation
  setElements: () => {},
  undo: () => {},
  redo: () => {},
  pencilSize: 0,
  setPencilSize: () => {},
  pencilThinning: 0,
  setPencilThinning: () => {},
  pencilStreamline: 0,
  setPencilStreamline: () => {},
  pencilSmoothing: 0,
  setPencilSmoothing: () => {},
  pencilTaperStart: 0,
  setPencilTaperStart: () => {},
  pencilTaperEnd: 0,
  setPencilTaperEnd: () => {},
  pencilColor: "black",
  setPencilColor: () => {},
  pencilAllStyles: {
    size: 0,
    thinning: 0,
    streamline: 0,
    smoothing: 0,
    start: {
      cap: false,
      taper: 0,
    },
    end: {
      cap: false,
      taper: 0,
    },
  },
  rectangleStrokeWidth: 0,
  setRectangleStrokeWidth: () => {},
  rectangleRoughness: 0,
  setRectangleRoughness: () => {},
  rectangleBowing: 0,
  setRectangleBowing: () => {},
  rectangleHachureGap: 0,
  setRectangleHachureGap: () => {},
  rectangleHachureAngle: 0,
  setRectangleHachureAngle: () => {},
  rectangleStrokeColor: "black",
  setRectangleStrokeColor: () => {},
  rectangleFill: "transparent",
  setRectangleFill: () => {},
  rectangleStyleOptions: {
    strokeWidth: 0,
    roughness: 0,
    bowing: 0,
    hachureGap: 0,
    hachureAngle: 0,
    stroke: "black",
    fill: "transparent",
  },
  lineStrokeWidth: 0,
  setLineStrokeWidth: () => {},
  lineRoughness: 0,
  setLineRoughness: () => {},
  lineBowing: 0,
  setLineBowing: () => {},
  lineStrokeColor: "black",
  setLineStrokeColor: () => {},
  lineStyleOptions: {
    strokeWidth: 0,
    roughness: 0,
    bowing: 0,
    stroke: "black",
  },
  
});

export const StyleOptionsProvider = ({ children }: Props) => {
  const [toolType, setToolType] = useState<string>("pencil");
  const [trashBinModalOpen, setTrashBinModalOpen] = useState<boolean>(false);
  // Assuming you have a useHistory implementation
   const [elements, setElements, undo, redo] = useHistory([]);

  const [pencilSize, setPencilSize] = useState<number>(40);
  const [pencilThinning, setPencilThinning] = useState<number>(20);
  const [pencilStreamline, setPencilStreamline] = useState<number>(50);
  const [pencilSmoothing, setPencilSmoothing] = useState<number>(50);
  const [pencilTaperStart, setPencilTaperStart] = useState<number>(50);
  const [pencilTaperEnd, setPencilTaperEnd] = useState<number>(50);
  const [pencilColor, setPencilColor] = useState<string>("black");

  const [rectangleStrokeWidth, setRectangleStrokeWidth] = useState<number>(16);
  const [rectangleRoughness, setRectangleRoughness] = useState<number>(1);
  const [rectangleBowing, setRectangleBowing] = useState<number>(1);
  const [rectangleHachureGap, setRectangleHachureGap] = useState<number>(8);
  const [rectangleHachureAngle, setRectangleHachureAngle] = useState<number>(1);
  const [rectangleStrokeColor, setRectangleStrokeColor] = useState<string>("black");
  const [rectangleFill, setRectangleFill] = useState<string>("transparent");

  const [lineStrokeWidth, setLineStrokeWidth] = useState<number>(16);
  const [lineRoughness, setLineRoughness] = useState<number>(1);
  const [lineBowing, setLineBowing] = useState<number>(1);
  const [lineStrokeColor, setLineStrokeColor] = useState<string>("black");

  const pencilAllStyles: PencilStyleType = {
    size: pencilSize / 2.5,
    thinning: pencilThinning / 50,
    streamline: pencilStreamline / 100,
    smoothing: pencilSmoothing / 100,
    start: {
      cap: true,
      taper: pencilTaperStart,
    },
    end: {
      cap: true,
      taper: pencilTaperEnd,
    },
  };

  const rectangleStyleOptions: RectangleStyleType = {
    strokeWidth: rectangleStrokeWidth / 5,
    roughness: rectangleRoughness / 10,
    bowing: rectangleBowing / 10,
    hachureGap: rectangleHachureGap,
    hachureAngle: rectangleHachureAngle,
    stroke: rectangleStrokeColor,
    fill: rectangleFill,
  };

  const lineStyleOptions: LineStyleType = {
    strokeWidth: lineStrokeWidth / 5,
    roughness: lineRoughness / 10,
    bowing: lineBowing / 10,
    stroke: lineStrokeColor,
  };

  
const value: StyleOptionsContextType = {

        
    toolType,
    setToolType,
    trashBinModalOpen,
    setTrashBinModalOpen,
    elements,
    setElements,
    undo,
    redo,

    // Pencil States
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
    pencilAllStyles,

    // Rectangle States
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
    rectangleStyleOptions,

    // Line States
    lineStrokeWidth,
    setLineStrokeWidth,
    lineRoughness,
    setLineRoughness,
    lineBowing,
    setLineBowing,
    lineStrokeColor,
    setLineStrokeColor,
    lineStyleOptions,
}
  return (
    <StyleOptionsContext.Provider value={value}
    >
      {children}
    </StyleOptionsContext.Provider>
  );
};