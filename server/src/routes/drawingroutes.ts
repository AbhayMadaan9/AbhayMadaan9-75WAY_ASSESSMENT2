import express from 'express';

import { savedrawing, getdrawing } from '../controllers/drawingController'

export default (router: express.Router) => {
router.post('/savedrawing', savedrawing)
router.post('/drawing/:id', getdrawing)
};