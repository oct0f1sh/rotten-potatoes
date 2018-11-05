const express = require('express')
var exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

const reviews = require('./controllers/reviews')(app);

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('look at me listening on port 3000')
});

module.exports = app;