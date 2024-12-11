const Tvshow = require("../models/tvshow");

const getTvShows = async (genre, rating, premiere_year) => {
  let filter = {};
  if (genre) {
    filter.genre = genre;
  }
  if (rating) {
    filter.rating = { $gt: rating };
  }
  if (premiere_year) {
    filter.premiere_year = { $gt: premiere_year };
  }

  return await Tvshow.find(filter);
};

const getTvShow = async (id) => {
  return await Tvshow.findById(id);
};

//add new tvshow
const addNewTvShow = async (
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) => {
  const newTvshow = new Tvshow({
    title,
    creator,
    premiere_year,
    end_year,
    seasons,
    genre,
    rating,
  });
  await newTvshow.save();
  return newTvshow;
};

const updateTvShow = async (
  id,
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) => {
  return await Tvshow.findByIdAndUpdate(
    id,
    {
      title,
      creator,
      premiere_year,
      end_year,
      seasons,
      genre,
      rating,
    },
    {
      new: true,
    }
  );
};

// delete tvshow
const deleteTvShow = async (id) => {
  return await Tvshow.findByIdAndDelete(id);
};

module.exports = {
  getTvShows,
  getTvShow,
  addNewTvShow,
  updateTvShow,
  deleteTvShow,
};
