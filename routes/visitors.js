var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds117899.mlab.com:17899/mean_guestbook', ['visitors']);

// Get visitors
router.get('/visitors', function(req, res, next) {
    db.visitors.find(function(err, visitors) {
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
            res.json(visitors);

        }
    });
});

// Get Single visitor
router.get('/visitor/:id', function(req, res, next) {
    db.visitors.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, visitor) {
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
            res.json(result);
        }
    });

});

// Delete Visitor

router.delete('/visitors/:id', function(req, res, next) {
    db.visitors.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function(err, result) {
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
                });
            }

        } else {
            res.json(result);
        }
    });
});

//To display visitors
router.post('/visitors', function(req, res, next) {
    if (req.body.role == "Admin") {
        db.visitors.find(function(err, visitors) {
            if (err) {
                if (res.status(500)) {
                    res.send({
                        'error': true,
                        'message': 'INTERNAL SERVER ERROR'
                    });
                    b
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

//update visitors
router.post('/visitors/edit', function(req, res, err) {
    db.visitors.update({
        email: req.body.email
    }, {
        $set: req.body
    });
});

module.exports = router;