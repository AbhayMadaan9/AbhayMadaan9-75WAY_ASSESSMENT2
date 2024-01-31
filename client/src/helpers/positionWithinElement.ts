import nearPoint from "./nearPoint";
import onLine from "./onLine";

// type OnlineType = {
//   x1: number;
//   y1: number;
//   x2: number;
//   y2: number;
//   x: number;
//   y: number;
//   maxDistance: number;
// };
// isWithinElement function allows us to get the point where we clicked between the max min values of x and y.
const positionWithinElement = (x: number, y: number, element: {
    x1: number;
    y1: number;
    x2:  number;
    y2: number;
    type: string;
    points: any;
}) => {
  const { type, x1, x2, y1, y2 } = element;
  switch (type) {
    case "line":
      // This is for capturing the line
      const on = onLine({x1: x1, y1, x2, y2, x, y, maxDistance: 1});
      const start = nearPoint({x, y, x1, y1, name: "start"});
      const end = nearPoint({x, y, x1: x2, y1: y2, name: "end"});
      return start || end || on;
    case "rectangle":
      // This is for capturing the rectangle
      const topLeft = nearPoint({x, y, x1, y1, name: "topLeft"});
      const topRight = nearPoint({x, y, x1: x2, y1, name: "topRight"});
      const bottomLeft = nearPoint({x, y, x1, y1: y2, name: "bottomLeft"});
      const bottomRight = nearPoint({x, y, x1: x2, y1: y2, name: "bottomRight"});
      const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
      return topLeft || topRight || bottomLeft || bottomRight || inside;
    case "pencil":
      const betweenAnyPoint = element.points.some((point: {x: number; y: number;}, index: number) => {
        const nextPoint: {x: number; y: number;} = element.points[index + 1];
        if (!nextPoint) return false;
        return (
          onLine({x1: point.x, y1: point.y, x2: nextPoint.x, y2: nextPoint.y, x, y, maxDistance: 20}) != null
        );
      });
      return betweenAnyPoint ? "inside" : null; // We don't need the start and end points because the resize function won't be implemented on free hand skecth.
    case "text":
      return x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
    default:
      throw new Error(`Type not recognised: ${type}`);
  }
};

export default positionWithinElement;