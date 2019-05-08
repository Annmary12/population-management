import Location from '../models/location';


/**
 * @description LocationController
 * @class LocationController
 */
class LocationController {
  /**
   * @description creates new location
   *
   * @param {Object} req request object
   * @param {Object} res response object
   *
   * @returns {json} status code, message and newly created location
   */
  static async create(req, res) {
    try {
      const { name, totalMale, totalFemale } = req.body;
      const options = {
        name,
        totalMale,
        totalFemale,
        totalPopulation: Number(totalFemale) + Number(totalMale)
      };
      const data = await Location.create(options);

      return res.status(201).json({
        message: 'successfully Created',
        data
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Error occured',
        error
      })
    }
  }

   /**
   * @description gets all location
   *
   * @param {Object} req request object
   * @param {Object} res response object
   *
   * @returns {json} status code, message or data
   */
  static async get(req, res) {
    try {
      const options = {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: 5
      };
      const data = await Location.paginate({}, options);

      if (data.docs.length < 0)
        return status(400).json({ message: 'Location not found!'});

      return res.status(200).json({
        data,
        message: 'List of all locations'
      });

    } catch (error) {
      return res.status(500).json({
        message: 'Error occured',
        error
      })
    }
  }
}

export default LocationController;
