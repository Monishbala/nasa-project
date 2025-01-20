const express = require("express");

const planetsRouter = express.Router();
const {httpGetAllPlanets}  = require("./planets_controller")

planetsRouter.get('/',httpGetAllPlanets);


module.exports =planetsRouter;