import { Router } from 'express';
import LocationController from '../controllers/location';
import Validation from '../middleware/validateInput';
import checkLocationExist from '../middleware/checkLocation';

const { create } = LocationController;
const { inputValidation } = Validation;
const route = Router();

route.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to population management system API!!!'
  })
});

route.post('/', inputValidation, checkLocationExist, create);

export default route;
