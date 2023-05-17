const { Dog, Temperaments } = require("../db");
const postDog = async (req, res) => {
  try {
    const { id, name, image, height, weight, life_span, temperaments } =
      req.body;

    const foundTemps = await Temperaments.findAll({
      where: { name: temperaments },
    });

    if (
      id &&
      name &&
      image &&
      height &&
      weight &&
      life_span &&
      foundTemps.length === temperaments.length
    ) {
      const newDog = await Dog.create({
        id,
        name,
        image,
        height,
        weight,
        life_span,
      });

      for (const foundTemp of foundTemps) {
        await newDog.addTemperament(foundTemp);
      }

      res.status(200).json({
        message: "Dog created",
        dog: newDog,
        temperaments: temperaments,
      });
    } else {
      res
        .status(404)
        .json({ message: `not found temperament in database` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postDog;
