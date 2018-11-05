const express = require('express')
const app = express()
var exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

let reviews = [ {title: "Bad review", movieTitle: "Lame" },
                {title: "another review", movieTitle: "Swag" }]

app.get('/', (req, res) => {
    res.render('reviews-index', {reviews: reviews })
})

app.listen(3000, () => {
    console.log('look at me listening on port 3000')
})