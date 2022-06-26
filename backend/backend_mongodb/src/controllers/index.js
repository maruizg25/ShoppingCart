const mongoose = require('mongoose');
const Citie = require('../models/cities');
const State = require('../models/states');
const connectDB = async () =>{
  try {
    await mongoose.connect('mongodb+srv://jorge98:1234carcelen@cluster0.uwzt5kg.mongodb.net/people')
    console.log('mongodb connection established');
  } catch (error) {
    console.log(error)
  }
}

connectDB()

const getCities = async(req ,res) =>{
    const cities = await Citie.find()
    res.json(cities)
}

const getStates = async(req ,res) =>{
    const states = await State.find()
    res.json(states)
}
module.exports ={
 getStates,
 getCities
}