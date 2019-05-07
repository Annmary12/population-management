import Location from '../models/location';

class LocationController {
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
}

export default LocationController;