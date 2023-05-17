const dogsDb = (dogs, dogMap) => {
  dogs.forEach((element) => {
    const { id, image, name, weight, temperaments, height, life_span } =
      element;
    const tem = temperaments.map((dg) => {
      return dg.name;
    });
    const junt = tem.join(", ");
      const dog = {
        id: id,
        name: name,
        temperaments: junt,
        weight: weight,
        image: image,
        height,
        life_span,
      };
      dogMap.push(dog);
  });
};

module.exports = dogsDb;
