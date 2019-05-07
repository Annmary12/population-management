import Location from '../models/location';
import Services from '../services/location';

class Location {
  static async create(req, res) {
    try {
      const { name, totalMale, totalFemale } = req.body;
      const options = {
        name,
        totalMale,
        totalFemale,
        totalPopulation: totalFemale + totalMale
      };
      console.log(options);
      const data = Location.create(options);

      return res.status(201).json({
        message: 'successfully Created',
        data
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}

export default Location;