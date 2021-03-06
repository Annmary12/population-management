import { Router } from 'express';
import LocationController from '../controllers/location';
import Validation from '../middleware/validateInput';
import checkLocationExist from '../middleware/checkLocation';

const { create, getAll, get, update, deleteLocation } = LocationController;
const { inputValidation, updateValidation } = Validation;
const route = Router();

route.post('/', inputValidation, checkLocationExist, create);
route.get('/', getAll);
route.get('/:locationId', get);
route.put('/:locationId', updateValidation, update);
route.delete('/:locationId', deleteLocation);

export default route;
