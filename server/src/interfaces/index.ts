export interface Idrawing{
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