import ErrorHandler from '../utils/errorHandler';

/**
 * @description validates users input
 */
const ValidateInputs = {
  /**
   * @description validates inputs
   */
  inputValidation: (req, res, next) => {
    req.checkBody('name', 'location name is required').trim().notEmpty();
    req.checkBody('totalMale', 'total male is required').trim().notEmpty();
    req.checkBody('totalMale', 'total male must be an integer').isNumeric();
    req.checkBody('totalFemale', 'total female is required').trim().notEmpty();
    req.checkBody('totalFemale', 'total female must be an integer').isNumeric();

    ErrorHandler(req, res, next)
  },

  updateValidation: (req, res, next) => {
    req.check('locationId', 'Location ID is not a valid MongoID').isMongoId();
    req.checkBody('name', 'Location is required').optional().isString();
    req.checkBody('totalMale', 'Male value should be numeric').optional().isNumeric();
    req.checkBody('totalFemale', 'Female value should be numeric').optional().isNumeric();

    ErrorHandler(req, res, next)
  }
}

export default ValidateInputs;
