var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');
var db = mongojs('mongodb://admin:admin@ds117899.mlab.com:17899/mean_guestbook', ['users']);

// Get Todos
router.get('/users', function(req, res, next) {
    db.users.find(function(err, todos) {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
            console.log("admin check");
        }
    });
});

//register user
router.post('/register', function(req, res, next) {
    var user = req.body;

    bcrypt.hash(req.body.pwd, 10, function(err, hash) {
        if (err) {
            if (res.status(500)) {
                res.send({
                    'error': true,
                    'message': 'INTERNAL SERVER ERROR'
                });
            } else if (res.status(400)) {
                res.send({
                    'error': true,
                    'message': 'SESSION EXPIRED'
                });
            } else {
                res.send({
                    'error': true,
                    'message': 'Server error occured'
                });
            }

        } else {

        }

        db.users.save({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            pwd: hash
        }, function(err, result) {
            if (err) {
                res.send("Error occured. User not registered.");
            } else {
                res.json("User is registered");
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
});


// For login
router.post('/login', function(req, res, next) {
    var user = req.body;

    db.users.findOne({ email: req.body.email },
        function(err, result) {
            if (err) {
                res.json("User not found");
            } else if (!result) {
                res.json("User not found");
            } else {
                bcrypt.compare(req.body.password, result.pwd, function(err, users) {
                    if (err) {
                        console.log("Wrong pass 1");
                        res.json("User not found");
                    } else if (!users) {
                        res.json("User not found");
                    } else {
                        //console.log("Server position");
                        res.send(result);
                    }
                });
            }
        });
});

module.exports = router;