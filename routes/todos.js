var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds117899.mlab.com:17899/mean_guestbook', ['todos']);

// Get Todos
router.get('/todos', function(req, res, next) {
    db.todos.find(function(err, todos) {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});

// Get Single Todo
router.get('/todo/:id', function(req, res, next) {
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, todo) {
        if (err) {
            res.send(err);
        } else {
            res.json(todo);
        }
    });
});

// Save Todo
router.post('/todo', function(req, res, next) {
    var todo = req.body;
    console.log("It reached here");

    db.todos.save(todo, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });

});

// Update Todo


// Delete Todo
router.delete('/todo/:id', function(req, res, next) {
    db.todos.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;