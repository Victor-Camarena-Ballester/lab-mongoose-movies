const mongoose = require('mongoose');
const Movie = require('../models/Movie');

mongoose.connect('mongodb://localhost/movies', { useNewUrlParser: true });

/* const celebrities = [
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
 */
const movies = [{
    title: 'Movie1',
    genre: 'Terror',
    plot: 'uuuu aaaaa eeee'
},
{
    title: 'Movie2',
    genre: 'Suspense',
    plot: 'uuuu aaaaa eeee2'
},
{
    title: 'Movie3',
    genre: 'Terror3',
    plot: 'uuuu aaaaa eeee3'
}]


Movie.collection
    .drop()
    .then(() => {
        console.log('deleted db');
    })
    .catch((err) => {
        console.log(err);
    })
    .then(() => Movie.insertMany(movies))
    .then(() => {
        console.log('inserted data');
        mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
        mongoose.connection.close();
    });