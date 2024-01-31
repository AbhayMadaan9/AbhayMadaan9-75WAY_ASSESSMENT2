import { TwoPointCoordinates } from "../../global";

// clientX and clientY are the mouses position.
const resizedCoodinates = (clientX: number, clientY: number, position: string, coordinates: TwoPointCoordinates) => {
    const { x1, y1, x2, y2 } = coordinates;
    switch (position) {
      case "topLeft":
      case "start":
        return { x1: clientX, y1: clientY, x2: Number, y2: Number };
      case "topRight":
        return { x1, y1: clientY, x2: clientX, y2: Number };
      case "bottomLeft":
        return { x1: clientX, y1: Number, x2: Number, y2: clientY };
      case "bottomRight":
      case "end":
        return { x1: Number, y1: Number, x2: clientX, y2: clientY };
      default:
        return null;
    }
  };
  
  export default resizedCoodinates;