import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DrawingState {
    toolType: string;
    color: string;
    coordinates: [
        {
          x1: Number,
          y1: Number,
          x2: Number,
          y2: Number
        }
      ]
    }
    const initialState: DrawingState = {
      toolType: "",
      color: "",
      coordinates: [
        {x1: 0, y1: 0, x2: 0, y2: 0}
      ]
    };
export const drawingSlice = createSlice({
  name: "drawing",
  initialState,
  reducers: {}

});

// export const {  } = drawingSlice.actions;

export default drawingSlice.reducer;

