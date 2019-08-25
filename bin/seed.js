const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');

mongoose.connect('mongodb://localhost/movies', { useNewUrlParser: true });

const celebrities = [
    {
        name: "Tom Cruise",
        occupation: "Actor",
        catchPhrase: "Is impossible"
    },
    {
        name: "Leo Messi",
        occupation: "Soccer player",
        catchPhrase: "Boludo!"
    },
    {
        name: "Shakira",
        occupation: "Singer",
        catchPhrase: "loca loca loca"
    }
]

Celebrity.collection
    .drop()
    .then(() => {
        console.log('deleted db');
    })
    .catch((err) => {
        console.log(err);
    })
    .then(() => Celebrity.insertMany(celebrities))
    .then(() => {
        console.log('inserted data');
        mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
        mongoose.connection.close();
    });