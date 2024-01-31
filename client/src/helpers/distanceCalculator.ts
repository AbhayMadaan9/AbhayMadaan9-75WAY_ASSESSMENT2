// distance function allows us to calculate the differences between the x,y values.
type coordinatetype = {
    x:  number; y: number;
}
const distance = (a: coordinatetype, b: coordinatetype) =>
  Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

  export default distance;