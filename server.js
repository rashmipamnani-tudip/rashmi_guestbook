var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var todos = require('./routes/todos');
<<<<<<< HEAD
var users = require('./routes/register');
=======

>>>>>>> 9960c63b40ead78871121a681940aeea0bfe3dd4
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());
<<<<<<< HEAD
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/api/v1/', todos);
app.use('/api/v1/', users);

app.listen(3000, function() {
    console.log('Server started on port 3000...');
});
=======
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api/v1/', todos);

app.listen(3000, function(){
    console.log('Server started on port 3000...');
});
>>>>>>> 9960c63b40ead78871121a681940aeea0bfe3dd4
