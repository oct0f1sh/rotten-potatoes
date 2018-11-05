const express = require('express')
const app = express()
var exphbs = require('express-handlebars')
const mongoose = require('mongoose')

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

mongoose.connect('mongodb://localhost/rotten-potatoes');

const Review = mongoose.model('Review', {
    title: String,
    movieTitle: String
});

// let reviews = [ {title: "Bad review", movieTitle: "Lame" },
//                 {title: "another review", movieTitle: "Swag" }]

app.get('/', (req, res) => {
    Review.find().then(reviews => {
        res.render('reviews-index', {reviews: reviews });
    }).catch(err => {
        console.log(err);
    });
});

app.listen(3000, () => {
    console.log('look at me listening on port 3000')
})