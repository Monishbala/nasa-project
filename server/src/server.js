const http = require("http");
require('dotenv').config();
const mongoose = require('mongoose');
const app = require("./app.js")

const {loadPlanetData} =require("./model/planets_model.js")
const {mongoConnect}=require("./services/mongo.js")
const {loadLaunchData}=require("./model/launches_model.js")

const server = http.createServer(app);


const PORT =process.env.PORT || 8000;



async function startServer()
{
    await mongoConnect();
    await loadPlanetData();
    await loadLaunchData();
    server.listen(PORT,()=>{
        console.log(`Listening on port ${PORT}`);
        
    })
}





startServer();









