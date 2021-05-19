const mongoose=require('mongoose');
const {Customer,validateCustomer}=require('../models/customer');
const express=require('express');
const router=express.Router();


//route handler to fetch all customers available in our application
router.get('/', async (req, res) => {
    const customers=await Customer.find().sort('name');
    res.send(customers);
  });

//route handler to fetch only a single customer based on the id passed
router.get('/:id',async (req, res) => {
    //try and find customer corresponding to the id provided
    const customer = await Customer.findById(req.params.id);
    //if customer doesn't exist rasie a 404 error
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    //otherwise return the customer to the client
    res.send(customer);
  });

//route handler to add customer to the app 
router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer=await customer.save();
    res.send(customer);
  });

// route handler to update customer in the app
router.put('/:id', async (req, res) => {
    //validate whether data sent by client is valid
    const { error } = validateCustomer(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    //try and update the new value
     const customer= await Customer.findByIdAndUpdate(req.params.id,{name:req.body.name, 
        phone:req.body.phone, 
        isGold:req.body.isGold }
        ,{new:true});
    //if customer is not found raise 404 error
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    //if all went well return the updated customer to the client
    res.send(customer);
  });

// route handler to delete a customer from app 
router.delete('/:id',async (req, res) => {
    //try removing customer using it's id from DB
    const customer=await Customer.findByIdAndRemove(req.params.id);
    //if customer is not present then raise a 404 error
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  //if deletion is successful then return the customer which was just deleted to the client
    res.send(customer);
  });
  

  module.exports=router;