const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({ extended: false }));

function api_call(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_f1ce8aa6d2fb475c826b41edbfa4cb26', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        if (res.statusCode === 200) { finishedAPI(body) }
    });
}

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get('/', function(req, res) {
    api_call(function(doneAPI) {
        res.render('home', {
            stock: doneAPI
        });
    }, "fb");
});

app.post('/', function(req, res) {
    api_call(function(doneAPI) {
        // post_stock = req.body.stock_finder
        res.render('home', {
            stock: doneAPI,
        });
    }, req.body.stock_finder);
});

app.get('/about', function(req, res) {
    res.render('about')
})

app.use(express.static(path.join(__dirname, 'public')));
// app.get('/index', function(req, res) {
//     res.render('index');
// });

// app.get('/about', function(req, res) {
//     res.render('about');
// })


app.listen(PORT, () => console.log("Server listening on port " + PORT));