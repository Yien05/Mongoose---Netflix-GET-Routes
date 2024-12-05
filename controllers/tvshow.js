// load the models
const Tvshow = require("../models/tvshow");

// CRUD functions
// get all tvshows
const getTvshows = async (genre, rating, director) => {
  // create a container for filter
  let filter = {};
  // if genre exists, pass it to the filter container
  if (genre) {
    filter.genre = genre;
  }
  // if rating exist, pass it into the filter container
  if (rating) {
    filter.rating = { $gt: rating };
  }
  // if director exist, pass into the filter container
  if (director) {
    filter.director = director;
  }

  // apply filter in .find()
  const tvshows = await Tvshow.find(filter);
  return tvshows;
};

// get one tvshow
const getTvshow = async (id) => {
  const tvshow = await Tvshow.findById(id);
  return tvshow;
};

// add new tvshow
const addNewTvshow = async (title,
    creator,
    premiere_year,
    end_year,
    seasons,
    genre,
    rating) => {
  // create new tvshow
  const newTvshow = new Tvshow({
    title: title,
    creator,
    premiere_year,
    end_year,
    seasons,
    genre,
    rating,
  });
  // save the new tvshow into mongodb
  await newTvshow.save();
  return newTvshow;
};

// update tvshow
const updateTvshow = async (
  id,
  title,
  director,
  release_year,
  genre,
  rating
) => {
  const updatedTvshow = await Tvshow.findByIdAndUpdate(
    id,
    {
      title,
      director,
      release_year,
      genre,
      rating,
    },
    {
      new: true, // return back the updated data
    }
  );
  return updatedTvshow;
};

// delete tvshow
const deleteTvshow = async (id) => {
  return await Tvshow.findByIdAndDelete(id);
};

// export all the functions
module.exports = {
  getTvshows,
  getTvshow,
  addNewTvshow,
  updateTvshow,
  deleteTvshow,
};
