var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds117899.mlab.com:17899/mean_guestbook', ['todos']);

//for showing dashboard page
router.get('/', function(req, res, next) {
    res.render('index.html');
});



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
router.put('/todo/:id', function(req, res, next) {
    var todo = req.body;
    var updObj = {};

    if (todo.isCompleted) {
        updObj.isCompleted = todo.isCompleted;
    }

    if (todo.text) {
        updObj.text = todo.text;
    }

    if (!updObj) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todos.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updObj, {}, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

// Delete Todo
router.delete('/delete/:id', function(req, res, next) {
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

router.post('/host', function(req, res, next) {
    db.todos.find({ hmail: req.body.hmail }, function(err, todos) {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});

module.exports = router;