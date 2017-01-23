var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds117899.mlab.com:17899/mean_guestbook', ['users']);

// Get Todos
router.get('/users', function(req, res, next) {
    db.users.find(function(err, todos) {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});


router.post('/user', function(req, res, next) {
    var user = req.body;
    console.log("It reached here");

    db.users.save(user, function(err, result) {
        if (err) {
            res.send("Error occured. User not registered.");
        } else {
            res.json(result);
        }
    });
});

router.get('/user/:id', function(req, res, next) {
    db.users.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, user) {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
});

router.post('/find', function(req, res, next) {
    db.users.findOne({ email: req.body.email, pwd: req.body.password },


        function(err, result) {
            if (err) {
                console.log("Reached Here...if");
                res.json(err);
            } else {
                console.log("Reached Here...else");
                res.json(result);
            }
        });
});

module.exports = router;