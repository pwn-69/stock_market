const express = require('express');
const app = express();
// const path = require('path');
var exphbs = require('express-handlebars');

const PORT = process.env.PORT || 5000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherStuff = "This is another stuff";

app.get('/', function(req, res) {
    res.render('home', {
        stuff: otherStuff
    });
});

// app.use(express.static(path.join(__dirname, 'public')));
app.get('/index', function(req, res) {
    res.render('index');
});

app.get('/about', function(req, res) {
    res.render('about');
})


app.listen(PORT, () => console.log("Server listening on port " + PORT));