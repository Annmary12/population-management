import { Router } from 'express';
import LocationController from '../controllers/location';

const { create } = LocationController;
const route = Router();

route.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to population management system API!!!'
  })
});

route.post('/', create);

export default route;
