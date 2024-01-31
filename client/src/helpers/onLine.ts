import distance from "./distanceCalculator";
type Props = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x: number;
  y: number;
  maxDistance: number;
};
const onLine = ({ x1, y1, x2, y2, x, y, maxDistance = 1 }: Props) => {
  const a = { x: x1, y: y1 };
  const b = { x: x2, y: y2 };
  const c = { x, y };
  const offset = distance(a, b) - (distance(a, c) + distance(b, c));
  return Math.abs(offset) < maxDistance ? "inside" : null; // We are giving some offset so that we can easily click on the line.
};

export default onLine;
