const Movie = require("../models/movie");
const TvShow = require("../models/tvshow");

const getGenres = async () => {
  // get all the movies
  const movies = await Movie.find();
  // get all the tv shows
  const tvshows = await TvShow.find();
  let genres = [];

  movies.forEach((movie) => {
    if (!genres.includes(movie.genre)) {
      genres.push(movie.genre);
    }
  });

  tvshows.forEach((tvshow) => {
    if (!genres.includes(tvshow.genre)) {
      genres.push(tvshow.genre);
    }
  });

  return genres;
};

module.exports = {
  getGenres,
};
