const axios = require("axios");
const { Dog, Temperaments } = require("../db");
const dogsDb = require("../Tools/DogsDb");
const { API_KEY } = process.env;

const getDogsID = async (req, res) => {
  try {
    const { id } = req.params;

    if (id <= 264) {
      const { data } = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );

      const dataFind = data.find((ele) => {
        return ele.id == id;
      });

      if (!dataFind.name) {
        res.status(404).json({ messaje: "ID de raza incorrecto" });
      } else {
        const { name, id, weight, image, height, life_span, temperament } = dataFind;

        res.status(200).json({
          id,
          name,
          weight: weight.metric,
          image: image.url,
          height: height.metric,
          life_span,
          temperaments : temperament
        });
      }
    } else {
      const dog = await Dog.findByPk(id, {
        include: {
          model: Temperaments,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      const dogMap = []
      dogsDb([dog], dogMap)
      if (dog.dataValues.name) {
        res.status(200).json(dogMap);
      } else {
        res.status(404).json({ messaje: "ID de raza incorrecto" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.messaje });
  }
};

module.exports = getDogsID;

