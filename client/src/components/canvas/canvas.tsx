import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import rough from 'roughjs'
import "./canvasstyle.scss";
import { OnePointCoordinates, StyleOptionsContextType } from "../../../global";
import { StyleOptionsContext } from "../../context/StyleOptionsContext";
import getElementAtPosition from "../../helpers/getElementAtPosition";
import cursorChangerForPositions from "../../helpers/cursorChangeForPosition";
import TextArea from "../../DrawingTools/text/textarea";
import BurgerButton from "../../DrawingTools/burger/button";
import Tools from "../../DrawingTools/tools";
import RedoUndoButtons from "../../DrawingTools/redo-undo/redoundobuttons";
import drawElement from "../../helpers/drawElement";
import resizedCoordinates from "../../helpers/resizedCoordinates";
import adjustmentRequired from "../../helpers/adjustmentRequired";
import adjustElementCoordinates from "../../helpers/adjustElementCoordinates";
import createElement from "../../helpers/createElement";
import { Button } from "@mui/material";
import { useSaveDrawingMutation } from "../../services/drawing";

const Canvas = () => {
  
  const [action, setAction] = useState("none");
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const textAreaRef = useRef();
  const {
    pencilColor,
    pencilAllStyles,
    rectangleStyleOptions,
    lineStyleOptions,
    toolType,
    elements,
    setElements,
  } = useContext<StyleOptionsContextType>(StyleOptionsContext);

  ////////////////////////////////////////////////////////////////////////////////////
  var canvas, context: CanvasRenderingContext2D | null;
  const canvasRef = useRef(null);
  useLayoutEffect(() => {
    canvas = document.getElementById('canvas') as HTMLCanvasElement;
   
    context = canvas.getContext("2d")
    context?.clearRect(0, 0, canvas.width, canvas.height); // This cleans the previous draws. (x:0, y:0, canvas width, canvas height)

    const roughCanvas = rough.canvas(canvas); // Initializing the RoughJS
    elements.forEach((element: any) => {
      if (action === "writing" && selectedElement.id === element.id) return;
      drawElement(roughCanvas, context, element);
    });
  }, [elements, action, selectedElement]);

  // This is for text area focusing.
  useEffect(() => {
    const textArea: any = textAreaRef.current;
    if (action === "writing") {
      textArea?.focus();
      textArea.value = selectedElement.text;
    }
  }, [action, selectedElement]);

  // updateElement function allows us to update the x and y coodinates for moving elements.
  const copyElementsState: any = [...elements];


  const updateElement = (
    id: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    type: string,
    options?: any,
    lineStyle?: any,
    rectStyle?: any,
    pencilAllStyles?: any,
    pencilStyles?: any
  ) => {


    switch (type) {
      case "line":
      case "rectangle":
        copyElementsState[id] = createElement({
          id,
          x1: x1,
          y1,
          x2,
          y2,
          type,
          lineStyleOptions,
          rectangleStyleOptions,
          pencilColor,
          pencilStyles
        }
        );
        break;
      case "pencil":
        copyElementsState[id].points = [
          ...copyElementsState[id].points,
          { x: x2, y: y2 },
        ];
        copyElementsState[id].color = pencilColor;
        copyElementsState[id].pencilStyles = pencilAllStyles;
        break;
      default:
        throw new Error(`Type not recognized: ${type}`);
    }

    setElements(copyElementsState, true);
  };


  // ////////////////////////////////////////////////////////////////////////////////////

  const mouseDownHandler = (event: any) => {

    if (action === "writing") return;

    const { clientX, clientY } = event;
    if (toolType === "selection") {
      const element: any = getElementAtPosition(clientX, clientY, elements);

      if (element) {
        if (element.type === "pencil") {
  
          const xOffsets = element.points.map((point: any) => clientX - point.x);
          const yOffsets = element.points.map((point: any) => clientY - point.y);

          setSelectedElement({ ...element, xOffsets, yOffsets });
        } else {
          const offsetX = clientX - element.x1; // Need them to stop jumping coordinates when we select the item.
          const offsetY = clientY - element.y1; // Need them to stop jumping coordinates when we select the item.
          setSelectedElement({ ...element, offsetX, offsetY });
        }
        setElements((prevState: any) => prevState); // Need this to fix redo-undo logic. Taking the prevState snapshots.

        // This makes us sure that if the cursor inside of the drawing, the drawing is moving, if it is on the corners, the drawing is resizing.
        if (element.position === "inside") {
          setAction("moving");
        } else {
          setAction("resizing");
        }
      }
    } else if (toolType === "eraser") {
      if (elements.length === 0) {
        return;
      }
      const element = getElementAtPosition(clientX, clientY, elements);
      if (element) {
        const copyElements = [...elements];
        const selectedDrawing = copyElements[element.id];
        if (element.type === "line") {
          const deletedPointsOfSelectedDrawing = {
            ...selectedDrawing,
            x1: null,
            y1: null,
            x2: null,
            y2: null,
            roughElement: {
              ...selectedDrawing.roughElement,
              sets: [{ ops: [{ data: [], op: "" }], type: "path" }],
            },
          };
          copyElements.splice(element.id, 1, deletedPointsOfSelectedDrawing);
          setElements(copyElements);
        } else if (element.type === "rectangle") {
          const deletedPointsOfSelectedDrawing = {
            ...selectedDrawing,
            x1: null,
            y1: null,
            x2: null,
            y2: null,
            roughElement: {
              ...selectedDrawing.roughElement,
              sets: [
                { ops: [{ data: [], op: "" }], type: "fillSketch" },
                { ops: [{ data: [], op: "" }], type: "path" },
              ],
            },
          };
          copyElements.splice(element.id, 1, deletedPointsOfSelectedDrawing);
          setElements(copyElements);
        } else if (element.type === "pencil") {
          const deletedPointsOfSelectedDrawing = {
            ...selectedDrawing,
            points: [{ x: null, y: null }],
          };
          copyElements.splice(element.id, 1, deletedPointsOfSelectedDrawing);
          setElements(copyElements);
        } else if (element.type === "text") {
          const deletedPointsOfSelectedDrawing = {
            ...selectedDrawing,
            x1: null,
            y1: null,
            x2: null,
            y2: null,
            text: "",
          };
          copyElements.splice(element.id, 1, deletedPointsOfSelectedDrawing);
          setElements(copyElements);
        }
      }
    } else {
      const id = elements.length;
      // The reason that we are sending 2 times clientX and clientY is because when you click, you are creating all of your coordinates. After the creation,  we are updating the second clientX and clientY.
      const element = createElement(
        {id,
        x1: clientX,
        y1: clientY,
       x2:  clientX,
        y2: clientY,
        type: toolType,
         lineStyleOptions:  lineStyleOptions,
        rectangleStyleOptions: rectangleStyleOptions,
        pencilColor: pencilColor,
        pencilAllStyles: pencilAllStyles,
        
      }
      );
  
      setElements((prevState: any) => [...prevState, element]);
      setSelectedElement(element);

      setAction(toolType === "text" ? "writing" : "drawing");
      console.log()
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////

  const mouseMoveHandler = (event: any) => {

    const { clientX, clientY } = event;

    // Changing the cursor while moving an element.
    if (toolType === "selection") {
      const element = getElementAtPosition(clientX, clientY, elements);
      event.target.style.cursor = element
        ? cursorChangerForPositions(element.position)
        : "default";
    } else if (toolType === "eraser") {
      const element = getElementAtPosition(clientX, clientY, elements);
      event.target.style.cursor = element
        ? "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAARRJREFUOE/dlDFLxEAQhd+BVouFZ3vlQuwSyI+5a7PBRkk6k9KzTOwStJFsWv0xgaQzkNLWszim0kL2OOFc9oKRYHFTz37Lm/dmJhi5JiPzcBjAOYDz7WheADz3jalP8oIxds85P3Zd90RBqqpad133SUSXAJ5M4H3AhWVZd1EUzYQQP96VZYkkSV7btr02QY1Axtgqz/NTz/OM6qSUCMNwRURneoMJOLdt+7Gu643MfeU4zrppmgt9pibgjRBiWRRFb0R934eUcgngdrfxX4CjSwZj7C3Lsqnu8Lc05XQQBO9ENP2NKapnE5s4jme608rhNE2HxWb7qwr2A+f8SAv2BxFdDQ32rpLRVu9Pl+0wztcg6V/VPW4Vw1FsawAAAABJRU5ErkJggg==') 10 10, auto"
        : "default";
    }

    if (action === "drawing") {
      const index = elements.length - 1; // Last element of the array
      const { x1, y1, type } = elements[index];
      const lineStyle = type === "line" ? lineStyleOptions : {};
      const rectStyle = type === "rectangle" ? rectangleStyleOptions : {};
      const pencilStyles = type === "pencil" ? pencilAllStyles : {};
      updateElement(
        index,
        x1,
        y1,
        clientX,
        clientY,
        toolType,
        null,
        lineStyle,
        rectStyle,
        pencilStyles
      );
    } else if (action === "moving") {
      if (selectedElement.type === "pencil") {
        const newPoints = selectedElement.points.map((_: any, index: number) => ({
          x: clientX - selectedElement.xOffsets[index],
          y: clientY - selectedElement.yOffsets[index],
        }));
        // These three lines are kinda same as updateElement function but slightly different so it is better to update pencil points in this place.
        const copyElementsState = [...elements];
        copyElementsState[selectedElement.id] = {
          ...copyElementsState[selectedElement.id],
          points: newPoints,
        };
        setElements(copyElementsState, true);
      } else {
        const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement;
        const width = x2 - x1;
        const height = y2 - y1;
        const newX1 = clientX - offsetX;
        const newY1 = clientY - offsetY;
        const options =
          selectedElement.type === "text" ? { text: selectedElement.text } : {};
        const lineStyle =
          selectedElement.type === "line"
            ? selectedElement.roughElement.options
            : {};
        const rectStyle =
          selectedElement.type === "rectangle"
            ? selectedElement.roughElement.options
            : {};
        updateElement(
          id,
          newX1,
          newY1,
          newX1 + width,
          newY1 + height,
          type,
          options,
          lineStyle,
          rectStyle
        );
      }
    } else if (action === "resizing") {
      const { id, type, position, roughElement, ...coordinates } =
        selectedElement;
      const { x1, y1, x2, y2 }: any = resizedCoordinates(
        clientX,
        clientY,
        position,
        coordinates
      );
      const lineStyle = type === "line" ? roughElement.options : {};
      const rectStyle = type === "rectangle" ? roughElement.options : {};
      updateElement(id, x1, y1, x2, y2, type, null, lineStyle, rectStyle);
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////

  const mouseUpHandler = (event: any) => {
    const { clientX, clientY } = event;
    if (selectedElement) {
      if (
        selectedElement.type === "text" &&
        clientX - selectedElement.offsetX === selectedElement.x1 &&
        clientY - selectedElement.offsetY === selectedElement.y1
      ) {
        setAction("writing");
        return;
      }

      const index = selectedElement.id;
      const { id, type } = elements[index];
      if (action === "drawing" && adjustmentRequired(type)) {
        const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]); //If the adjustment is required then it will update the elements in place and adjust the coordinates. It is not required for the pencil tool.
        const lineStyle = type === "line" ? lineStyleOptions : {};
        const rectStyle = type === "rectangle" ? rectangleStyleOptions : {};
        const pencilStyles = type === "pencil" ? pencilAllStyles : {};
        updateElement(
          id,
          x1,
          y1,
          x2,
          y2,
          type,
          null,
          lineStyle,
          rectStyle,
          pencilStyles
        );
      } else if (action === "resizing" && adjustmentRequired(type)) {
        const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]); //If the adjustment is required then it will update the elements in place and adjust the coordinates. It is not required for the pencil tool.
        const lineStyle =
          selectedElement.type === "line"
            ? selectedElement.roughElement.options
            : {};
        const rectStyle =
          selectedElement.type === "rectangle"
            ? selectedElement.roughElement.options
            : {};
        updateElement(id, x1, y1, x2, y2, type, null, lineStyle, rectStyle);
      }
    }

    if (action === "writing") return;

    setAction("none");
    setSelectedElement(null);
  };

  const textAreaOnClickHandler = (event: any) => {
    const { id, x1, y1, type } = selectedElement;
    setAction("none");
    setSelectedElement(null);
    updateElement(id, x1, y1, 0, 0, type, { text: event.target.value});
  };

  const downloadDrawing = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const pngUrl = canvas?.toDataURL("image/png").replace("image/png", "image/octet-stream");
    if (pngUrl) {
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "drawing.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };
  const [saveDrawing, {error, isSuccess, }] = useSaveDrawingMutation();

  const savedb = async()=>{
    const confirmm: boolean = window.confirm("Do you want to save this drawing");

    if (confirmm) {
      try {
      const res: any =  await saveDrawing({color: pencilColor, toolType: toolType, coordinates: elements});
      } catch (error: any) {
        // Handle unexpected errors
        console.error('An unexpected error occurred:', error);
        alert('Unexpected error occurred');
      }
    }
  }
useEffect(()=>{
  if(isSuccess) {alert("Drawing saved successfully")}
  if(error) {alert("Drawing failed to save")}
}, [error, isSuccess])
  return (
    <div className="canvas-container">
      <div className="canvas-items">
        <RedoUndoButtons />
        <Tools />
  
        {toolType === "pencil" ||
          toolType === "rectangle" ||
          toolType === "line" ? (
            <BurgerButton />
          ) : null}
  
        <div className="button-container">
          <Button onClick={downloadDrawing}>Download Drawing</Button>
          <Button onClick={savedb}>save</Button>
        </div>
  
        {action === "writing" ? (
          <div className="text-area-container">
            <TextArea
              textAreaRef={textAreaRef}
              textAreaOnClickHandler={textAreaOnClickHandler}
              style={{
                top: selectedElement.y1 - 3,
                left: selectedElement.x1,
              }}
            />
          </div>
        ) : null}
  
        <canvas
          ref={canvasRef}
          id="canvas"
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={mouseDownHandler}
          onMouseMove={mouseMoveHandler}
          onMouseUp={mouseUpHandler}
        />
      </div>
    </div>
  );

};

export default Canvas;

