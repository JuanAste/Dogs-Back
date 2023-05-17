const { Router } = require("express");
const getDogs = require("../Controllers/GetDogs");
const getDogsID = require("../Controllers/GetDogsID");
const getDogsName = require("../Controllers/GetDogsName");
const postDog = require("../Controllers/PostDogs");
const getTemperaments = require("../Controllers/GetTemperaments");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/dogs", getDogs);

router.get("/dogs/:id", getDogsID);

router.get("/name", getDogsName);

router.post("/dogs", postDog);

router.get("/temperaments", getTemperaments);

module.exports = router;
