var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds117899.mlab.com:17899/mean_guestbook', ['visitors']);

//for showing dashboard page
router.get('/', function(req, res, next) {
    res.render('index.html');
});



// Get Todos
router.get('/visitors', function(req, res, next) {
    console.log("Hello");
    db.visitors.find(function(err, visitors) {
        if (err) {
            console.log("error");
            res.send(err);
        } else {
            res.json(visitors);
            console.log("sending todos");
        }
    });
});

// Get Single Todo
router.get('/visitor/:id', function(req, res, next) {
    db.visitors.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, visitor) {
        if (err) {
            res.send(err);
        } else {
            res.json(visitor);
        }
    });
});

// Save visitor
router.post('/visitor/store', function(req, res, next) {
    var visitor = req.body;
    console.log("It reached here");

    db.visitors.save(visitor, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });

});
/*
// Update Todo
router.put('/todo/:id', function(req, res, next) {
    var visitor = req.body;
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
*/

// Delete Visitor

router.delete('/visitors/:id', function(req, res, next) {
    db.visitors.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

router.post('/visitors', function(req, res, next) {
    if (req.body.hmail == "admin@tudip.com") {
        db.visitors.find(function(err, visitors) {
            if (err) {

                console.log("error");
                res.send(err);
            } else {
                res.json(visitors);
            }
        });
    } else {

        db.visitors.find({ hmail: req.body.hmail }, function(err, visitors) {
            if (err) {
                res.send(err);
            } else {
                res.json(visitors);
            }
        });
    }
});

module.exports = router;