const express = require("express");
//create a router for tvshows
const router = express.Router();

// import functions from controller
const {
  getTvShows,
  getTvShow,
  addNewTvShow,
  updateTvShow,
  deleteTvShow,
} = require("../controllers/tvshow");

/* 
  create the routes (CRUD)
  GET /tvshows - get all the tvshows
  GET /tvshows/:id - get one tvshow by id
  POST /tvshows - add new tvshow
  PUT /tvshows/:id - update tvshow
  DELETE /tvshows/:id - delete tvshow
*/

// get all the tvshows. Pointing to /tvshows
router.get("/", async (req, res) => {
  try {
    const genre = req.query.genre;
    const rating = req.query.rating;
    const director = req.query.director;
    // use the getTvshows from the controller to laod the tvshows data
    const tvshows = await getTvShows(genre, rating, director);
    res.status(200).send(tvshows);
  } catch (error) {
    console.log(error)
    res.status(400).send({
      error: error._message,
    });
  }
});

// get one tvshow by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const tvshow = await getTvshow(id);
    res.status(200).send(tvshow);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// add tvshow
// POST http://localhost:5555/tvshows
router.post("/", async (req, res) => {
  try {
    // retrieve the data from req.body
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons
    const genre = req.body.genre;
    const rating = req.body.rating;

    // check for error
    if (!title || !creator || !premiere_year || !end_year || !seasons || !genre || !rating) {
      return res.status(400).send({
        error: "Required data is missing",
      });
    }

    // pass in all the data to addNewTvshow function
    const newTvshow = await addNewTvshow(
      title,
      creator,
      premiere_year,
      end_year,
      seasons,
      genre,
      rating
    );
    res.status(200).send(newTvshow);
  } catch (error) {
    // if there is an error, return the error code
    res.status(400).send({
      error: error._message,
    });
  }
});

// update tvshow
// PUT http://localhost:5555/tvshows/9kdm40ikd93k300dkd3o
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const director = req.body.director;
    const release_year = req.body.release_year;
    const genre = req.body.genre;
    const rating = req.body.rating;
    // pass in the data into the updateTvshow function
    const updatedTvshow = await updateTvshow(
      id,
      title,
      director,
      release_year,
      genre,
      rating
    );
    res.status(200).send(updatedTvshow);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// delete tvshow
// DELETE http://localhost:5555/tvshows/9kdm40ikd93k300dkd3o
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // trigger the deleteTvshow function
    await deleteTvshow(id);
    res.status(200).send({
      message: `Tvshow with the provided id #${id} has been deleted`,
    });
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

module.exports = router;
