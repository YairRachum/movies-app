const express = require("express");
const server = express();
const moviesController = require("./controllers/movies-controller");
const cors = require('cors');

//enable cors to be able to communicate with the server (browser blocks it if not)
server.use(cors({ origin: "http://localhost:3000" }));
server.use(express.json());
server.use("/movies", moviesController);

server.listen(3001, () => console.log("Listening on http://localhost:3001"));
