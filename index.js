const express = require('express')
var exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

mongoose.connect('mongodb://localhost/rotten-potatoes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// ROUTES

const Review = mongoose.model('Review', {
    title: String,
    movieTitle: String,
    description: String
});

app.get('/', (req, res) => {
    Review.find().then(reviews => {
        res.render('reviews-index', {reviews: reviews });
    }).catch(err => {
        console.log(err);
    });
});

app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
});

app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
        console.log(review);
        res.redirect(`/reviews/${review._id}`);
    }).catch((err) => {
        console.log(err.message);
    })
});

app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).then((review) => {
        res.render('reviews-show', {review: review});
    }).catch((err) => {
        console.log(err.message);
    });
})

app.get('/reviews/:id/edit', (req, res) => {
    Review.findById(req.params.id, (err, review) => {
        res.render('reviews-edit', {review: review});
    })
})

app.put('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body).then(review => {
        res.redirect(`/reviews/${review._id}`)
    }).catch(err => {
        console.log(err.message);
    })
})

app.listen(3000, () => {
    console.log('look at me listening on port 3000')
});