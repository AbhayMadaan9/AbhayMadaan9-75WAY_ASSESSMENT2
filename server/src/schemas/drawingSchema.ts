import { Idrawing } from 'interfaces';
import mongoose from 'mongoose';

// User Config
const DrawingSchema = new mongoose.Schema({
  toolType: { type: String, required: true },
  color: { type: String, required: true },
  coordinates: { type: [
    {
      x1: Number,
      y1: Number,
      x2: Number,
      y2: Number
    }
  ], required: true },

  createdDate: { type: Date, default: Date.now },

});

export const DrawingModel = mongoose.model<Idrawing>('Drawing', DrawingSchema);
  
// User Actions
export const getDrawings = () => DrawingModel.find();

export const getDrawingById = (id: string) => DrawingModel.findById(id);
