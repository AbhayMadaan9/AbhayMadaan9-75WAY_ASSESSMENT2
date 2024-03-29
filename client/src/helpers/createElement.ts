// import rough from "roughjs/bundled/rough.esm";

import rough from "roughjs";


const elementGenerator = rough.generator();
type Props =  {
    id: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    type: string;
    lineStyleOptions?: any;
    rectangleStyleOptions?: any;
    pencilColor?: string;
    pencilStyles?: any;
    lineStyle?: any;
    rectStyle?: any;
    pencilAllStyles?: any;
    
}
const createElement = (
  {id,
  x1,
  y1,
  x2,
  y2,
  type,
  lineStyleOptions,
  rectangleStyleOptions,
  pencilColor,
  pencilStyles,
  
}: Props) => {
  switch (type) {
    case "line":
    case "rectangle":
      const roughElement =
        type === "line"
          ? elementGenerator.line(x1, y1, x2, y2, lineStyleOptions)
          : elementGenerator.rectangle(
              x1,
              y1,
              x2 - x1,
              y2 - y1,
              rectangleStyleOptions
            );
      return { id, x1, y1, x2, y2, type, roughElement };
    case "pencil":
      return {
        id,
        type,
        points: [{ x: x1, y: y1 }],
        color: pencilColor,
        pencilStyles: pencilStyles,
      };
    case "text":
      return { id, type, x1, y1, x2, y2, text: "" };
    default:
      throw new Error(`Type not recognised: ${type}`);
  }
};

export default createElement;