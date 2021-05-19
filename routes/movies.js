const {Movie, validateMovie} = require('../models/movie'); 
const {Genre} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//route handler to fetch all movies available in our application
router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
});
//route handler to fetch only a single movie based on the id passed
router.get('/:id', async (req, res) => {
    //try and find movie corresponding to the id provided
    const movie = await Movie.findById(req.params.id);
    //if movie doesn't exist rasie a 404 error
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    //otherwise return the movie to the client
    res.send(movie);
  });
//route handler to add movie to the app
router.post('/', async (req, res) => {
  const { error } = validateMovie(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  let movie = new Movie({ 
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  movie = await movie.save();
  
  res.send(movie);
});

// route handler to update movie in the app
router.put('/:id', async (req, res) => {
//validate whether data sent by client is valid
  const { error } = validateMovie(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  //try and fetch the genre object to which the movie belongs to
  const genre = await Genre.findById(req.body.genreId);
  //if genre object is not found raise 404 error
  if (!genre) return res.status(400).send('Invalid genre.');
 //try and update movie 
  const movie = await Movie.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });
  //if movie is not found raise 404 error
  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  //if all went well return the updated movie to the client
  res.send(movie);
});

// route handler to delete a movie from app 
router.delete('/:id', async (req, res) => {
  //try removing movie using it's id from DB
  const movie = await Movie.findByIdAndRemove(req.params.id);
  //if movie is not present then raise a 404 error
  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  //if deletion is successful then return the movie which was just deleted to the client
  res.send(movie);
});


module.exports = router; 