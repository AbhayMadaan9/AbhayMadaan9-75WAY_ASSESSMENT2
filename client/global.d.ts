export type StyleOptionsContextType = {
    toolType: string;
    setToolType: React.Dispatch<React.SetStateAction<string>>;
  
    trashBinModalOpen: boolean;
    setTrashBinModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    
    elements: any; // Adjust the type based on your actual implementation
    setElements: any;
    undo: () => void; // Adjust the type based on your actual implementation
    redo: () => void; // Adjust the type based on your actual implementation
  
    // Pencil States
    pencilSize: number;
    setPencilSize: React.Dispatch<React.SetStateAction<number>>;
    pencilThinning: number;
    setPencilThinning: React.Dispatch<React.SetStateAction<number>>;
    pencilStreamline: number;
    setPencilStreamline: React.Dispatch<React.SetStateAction<number>>;
    pencilSmoothing: number;
    setPencilSmoothing: React.Dispatch<React.SetStateAction<number>>;
    pencilTaperStart: number;
    setPencilTaperStart: React.Dispatch<React.SetStateAction<number>>;
    pencilTaperEnd: number;
    setPencilTaperEnd: React.Dispatch<React.SetStateAction<number>>;
    pencilColor: string;
    setPencilColor: React.Dispatch<React.SetStateAction<string>>;
    pencilAllStyles: PencilStyleType; // Assuming PencilStyleType is properly defined
  
    // Rectangle States
    rectangleStrokeWidth: number;
    setRectangleStrokeWidth: React.Dispatch<React.SetStateAction<number>>;
    rectangleRoughness: number;
    setRectangleRoughness: React.Dispatch<React.SetStateAction<number>>;
    rectangleBowing: number;
    setRectangleBowing: React.Dispatch<React.SetStateAction<number>>;
    rectangleHachureGap: number;
    setRectangleHachureGap: React.Dispatch<React.SetStateAction<number>>;
    rectangleHachureAngle: number;
    setRectangleHachureAngle: React.Dispatch<React.SetStateAction<number>>;
    rectangleStrokeColor: string;
    setRectangleStrokeColor: React.Dispatch<React.SetStateAction<string>>;
    rectangleFill: string;
    setRectangleFill: React.Dispatch<React.SetStateAction<string>>;
    rectangleStyleOptions: RectangleStyleType; // Assuming RectangleStyleType is properly defined
  
    // Line States
    lineStrokeWidth: number;
    setLineStrokeWidth: React.Dispatch<React.SetStateAction<number>>;
    lineRoughness: number;
    setLineRoughness: React.Dispatch<React.SetStateAction<number>>;
    lineBowing: number;
    setLineBowing: React.Dispatch<React.SetStateAction<number>>;
    lineStrokeColor: string;
    setLineStrokeColor: React.Dispatch<React.SetStateAction<string>>;
    lineStyleOptions: LineStyleType; // Assuming LineStyleType is properly defined
  };
  export type PencilStyleType = {
    size: number;
    thinning: number;
    streamline: number;
    smoothing: number;
    start: {
      cap: boolean;
      taper: number;
    };
    end: {
      cap: boolean;
      taper: number;
    };
  };
 export type RectangleStyleType = {
      strokeWidth: number;
      roughness: number;
      bowing: number;
      hachureGap: number;
      hachureAngle: number;
      stroke: string;
      fill: string;
  }
 export type LineStyleType = {
      strokeWidth: number;
      roughness: number;
      bowing: number;
      stroke: string;
  }
  
export interface TwoPointCoordinates{
    x1: string;
    x2: string;
    y1: string;
    y2: string;
}
export interface OnePointCoordinates{
  x?: string | null;
  y?: string | null;

}