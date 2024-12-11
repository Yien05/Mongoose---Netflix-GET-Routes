const express = require("express");
const router = express.Router();

const { getGenres } = require("../controllers/genre");

router.get("/", async (req, res) => {
  const genres = await getGenres();
  res.status(200).send(genres);
});

module.exports = router;
