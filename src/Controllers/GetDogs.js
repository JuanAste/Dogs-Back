const dogsDb = require("../Tools/DogsDb");
const { Dog, Temperaments, DogTemperaments } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const getDogs = async (req, res) => {
  try {
    const dogs = await Dog.findAll({
      include: {
        model: Temperaments,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const { data } = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );

    if (data[0]) {
      const dogMap = data.map((dg) => {
        const dog = {
          id: dg.id,
          name: dg.name,
          temperaments: dg.temperament,
          weight: dg.weight.metric,
          image: dg.image.url,
          origen: dg.origin
        };
        return dog;
      });

      dogsDb(dogs, dogMap);

      res.status(200).json(dogMap);
    } else {
      res.status(404).json({ messaje: "missing dogs" });
    }
  } catch (error) {
    res.status(500).json({ error: error.messaje });
  }
};

module.exports = getDogs;
