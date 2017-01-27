var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var visitors = require('./routes/visitors');
//var dashboard = require('./routes/dashboard_display');
//var register = require('./routes/register_display')
var users = require('./routes/register');

var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);

app.use('/dashboard', function(req, res, next) {
    res.render('index.html');
});

app.use('/signup', function(req, res, next) {
    res.render('index.html');
});

app.use('/api/', visitors);
app.use('/api/auth/', users);

app.listen(3000, function() {
    console.log('Server started on port 3000...');
});

app.use(bodyParser.urlencoded({ extended: false }));