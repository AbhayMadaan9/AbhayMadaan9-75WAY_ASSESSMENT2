import express from 'express';


import drawings from './drawingroutes';

const router = express.Router();

export default (): express.Router => {

  drawings(router);

  return router;
};