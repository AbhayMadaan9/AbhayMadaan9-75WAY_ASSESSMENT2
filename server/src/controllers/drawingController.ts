import express from 'express';
import { Idrawing } from 'interfaces';
import { DrawingModel, getDrawingById } from '../schemas/drawingSchema'
export const savedrawing =async (req: express.Request, res: express.Response) => {
    const {color, toolType, coordinates}: Idrawing= req.body
    if (!color || !toolType 
        || !toolType || !coordinates) {
        return res.status(400).json({"message": "empty fields"});
      }
  try {
    const drawing =  new DrawingModel({
        toolType, color, coordinates
    });
  await drawing.save()
      return res.status(200).json({"message": "Drawing saved successfully"}).end();
  } catch (error: any) {
    return res.status(500).json({"message": error.message});

  }
}
export const getdrawing =async (req: express.Request, res: express.Response) => {
    const {id} = req.params;
    try {
        if(!id)
        {
            return res.status(400).json({"message": "Id not found"})
        }
        let drawing = await getDrawingById(id);
        if(!drawing)
        {
            return res.status(400).json({"message": "Drawing not found"})
        }
    } catch (error) {
        return res.status(500).json({"message": error.message});
    }
   
 }