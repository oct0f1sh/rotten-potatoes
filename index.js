const express = require('express')
const app = express()
var exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home', { msg: 'Handlebars are lame'})
})

app.listen(3000, () => {
    console.log('look at me listening on port 3000')
})