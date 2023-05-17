const axios = require("axios");
const { Dog, Temperaments } = require("../db");
const { Op } = require("sequelize");
const dogsDb = require("../Tools/DogsDb");
const { API_KEY } = process.env;

const getDogsName = async (req, res) => {
  try {
    const { q } = req.query;

    const { data } = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );

    const dogs = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${q}%`,
        },
      },
      include: {
        model: Temperaments,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const filteredDogs = data.filter((dog) => {
      return dog.name.toLowerCase().includes(q.toLowerCase());
    });
    if (filteredDogs.length || dogs.length) {
      const dogMap = filteredDogs.map((dg) => {
        const { name, id, weight, image, temperament} = dg;

        return {
          name,
          id,
          weight: weight.metric,
          image: image.url,
          temperaments:temperament
        };
      });

      dogsDb(dogs, dogMap);

      res.status(200).json(dogMap);
    }
     else {
      res.status(404).json({ messaje: "No se encuentra esa raza" });
    }
  } catch (error) {
    res.status(500).json({ error: error.messaje });
  }
};

module.exports = getDogsName;
