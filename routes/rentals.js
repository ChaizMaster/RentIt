const {Rental, validateRental} = require('../models/rental'); 
const {Movie} = require('../models/movie'); 
const auth=require('../middleware/auth');
const {Customer} = require('../models/customer'); 
const Fawn=require('fawn');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

//route handler to fetch all rentals issued by our application
router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

//route handler to fetch only a single rental based on the id passed
router.get('/:id', async (req, res) => {
    //try and fetch the rental corresp to the id
    const rental = await Rental.findById(req.params.id);
    //if no such rental found raise an error
    if (!rental) return res.status(404).send('The rental with the given ID was not found.');
    //if found then send the rental info back to client
    res.send(rental);
  });


//route handler to issue a new rental
router.post('/',auth ,async (req, res) => {
  //validate user input
  const { error } = validateRental(req.body); 
  //if error exists raise 400 error for bad request
  if (error) return res.status(400).send(error.details[0].message);
  //try and fetch customer who is trying to rent movie
  const customer = await Customer.findById(req.body.customerId);
  //if customer doesn't exist raise an error
  if (!customer) return res.status(400).send('Invalid customer.');
  //if customer found, find movie he is trying to rent is available in our app
  const movie = await Movie.findById(req.body.movieId);
  //if no movie was found raise error
  if (!movie) return res.status(400).send('Invalid movie.');
  //if movie is found check whether it is in stock else raise error not in stock
  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');
  //if found create a new rental object
  let rental = new Rental({ 
    customer: {
      _id: customer._id,
      name: customer.name, 
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });
  // creating an atomic task 
  try{
    new Fawn.Task()
      .save('rentals',rental)
      .update('movies',{_id:movie._id},{
        $inc:{numberInStock:-1}
      })
      .run();
  res.send(rental);
  }catch(error){
    res.status(500).send('Something Failed...')
  }
});


module.exports = router; 