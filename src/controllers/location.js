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
        name: name.trim(),
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
        message: 'An error occured',
        error
      })
    }
  }

  /**
   * @description get one location
   *
   * @param {Object} req request object
   * @param {Object} res response object
   *
   * @returns {json} status code, message and data
   */
  static async get(req, res) {
    try {
      const { locationId } = req.params;
      const location = await Location.findById(locationId);

      if (!location)
        return res.status(400).json({ message: 'Location not found!' });

      return res.status(200).json({
        location
      })
    } catch (error) {
      return res.status(500).json({
        message: 'An error occured',
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
  static async getAll(req, res) {
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
        message: 'An error occured',
        error
      })
    }
  }

  /**
   * @description updates a location
   *
   * @param {Object} req request object
   * @param {Object} res response object
   *
   * @returns {json} status code, message or data
   */
  static async update(req, res) {
    try {
      const { locationId } = req.params;
      const { name, totalMale, totalFemale } = req.body;
      const location = await Location.findById(locationId);

      if (!location)
        return res.status(400).json({ message: 'Location not found!' });

      const options = {
        name: name.trim(),
        totalMale: totalMale,
        totalFemail: totalFemale,
        totalPopulation: Number(totalFemale) + Number(totalMale)
      }
      const updatedLocation = await Location.findOneAndUpdate({ _id: location._id }, options, { new: true });

      return res.status(200).json({
        message: 'Location updated succeffully',
        updatedLocation
      })
    } catch (error) {
      return res.status(500).json({
        message: 'An error occured',
        error
      });
    }
  }

  /**
   * @description deletes a location
   *
   * @param {Object} req request object
   * @param {Object} res response object
   *
   * @returns {json} status code, message or data
   */
  static async deleteLocation(req, res) {
    try {
      const { locationId } = req.params;
      const location = await Location.findById(locationId);

      if (!location)
        return res.status(400).json({ message: 'Location not found!' });

      await Location.findByIdAndRemove(location._id);

      return res.status(200).json({
        message: 'Location deleted succeffully',
      })
    } catch (error) {
      return res.status(500).json({
        message: 'An error occured',
        error
      });
    }
  }
}

export default LocationController;
