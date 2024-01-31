import positionWithinElement from "./positionWithinElement";

const getElementAtPosition = (x: number, y: number, elements: any) => {
  return elements
    .map((element: any) => ({
      ...element,
      position: positionWithinElement(x, y, element),
    }))
    .find((element: any) => element.position !== null);
};

export default getElementAtPosition;