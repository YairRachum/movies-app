const moviesLogic = require("../logic/movies-logic");
const express = require("express");
const { request, response } = require("express");
const router = express.Router();

//handeling the search request by the user
router.post("/search", async (request, response) => {
    try {
        let searchValue = request.body.searchValue;
        let moviesData = await moviesLogic.searchMovie(searchValue);
        response.json(moviesData.data.Search);
    }
    catch (error) {
        console.log(error)
        response.status(500).json({ message: 'error' });
    }
});

//handeling the click on one specific card to get more information about the movie
router.post("/search/:id", async (request, response) => {
    try {
        let movieId = request.params.id
        let movieData = await moviesLogic.getMovie(movieId);
        response.json(movieData.data);
    }
    catch (error) {
        console.log(error)

        response.status(500).json({ message: 'error' });
    }
});

module.exports = router;