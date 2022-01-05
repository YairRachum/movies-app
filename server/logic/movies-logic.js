const axios = require('axios');

//The real communicaion with the API is here (Search by ID)
async function getMovie(movieId) {
    const url = (`http://www.omdbapi.com/?i=${movieId}&apikey=35e89b00`);
    let response = await axios.get(url);
    return response;
}

//Search by name
async function searchMovie(searchValue) {
    const url = (`http://www.omdbapi.com/?s=${searchValue}&apikey=35e89b00`);
    let response = await axios.get(url);
    return response;
}

module.exports = { getMovie, searchMovie }