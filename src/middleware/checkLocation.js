import Location from '../models/location';

/**
 * @description checks if location exist
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next middleware next
 *
 * @returns {json} returns error if contact exist
 */
const checkLocationExist = async (req, res, next) => {
  const { name } = req.body;

  const location = await Location.findOne({ [name] : name })

  return location
  ? res.status(401).json({error: 'location is already existing'})
  : next();
}

export default checkLocationExist;
