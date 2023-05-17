const { Temperaments } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const getTemperaments = async (req, res) => {
  try {
    const allTemps = await Temperaments.findAll();
    if (allTemps.length) {
      res.status(200).json(allTemps);
    } else {
      const { data } = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );
      const temperaments = new Set();

      data.forEach((dog) => {
        const dogTemperaments = dog.temperament?.split(", ") ?? [];
        dogTemperaments.forEach((t) => temperaments.add(t));
      });

      const promises = Array.from(temperaments).map((name) =>
        Temperaments.create({ name })
      );

      await Promise.all(promises);

      const allTemperaments = await Temperaments.findAll();
      res.status(200).json(allTemperaments);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTemperaments;
