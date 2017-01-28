var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var error = require('../Helper/helper');
var path = require('../database/data_path');
var db = mongojs(path.path, ['visitors']);

// Get visitors
router.get('/visitors', function(req, res, next) {
    db.visitors.find(function(err, visitors) {
        if (err) {
            error.error_function(err);
        }
        if (!visitors) {
            res.send({
                'error': true,
                'message': error.NOT_FOUND
            });
        } else {
            res.status(200).send({ visitors });
        }
    });
});

// Get Single visitor
router.get('/visitor/:id', function(req, res, next) {
    db.visitors.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, visitor) {
        if (err) {
            error.error_function(err);
        }
        if (!visitors) {
            res.send({
                'error': true,
                'message': error.NOT_FOUND
            });
        } else {
            res.status(200).send({ visitor });
        }
    });
});

// Save visitor
router.post('/visitor/store', function(req, res, next) {
    var visitor = req.body;

    db.visitors.save(visitor, function(err, result) {
        if (err) {
            error.error_function(err);
        } else {
            res.status(200).send({ result });
        }
    });

});

// Delete Visitor

router.delete('/visitors/:id', function(req, res, next) {
    db.visitors.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function(err, result) {
        if (err) {
            error.error_function(err);
        }
        if (!result) {
            res.send({
                'error': true,
                'message': error.NOT_FOUND
            });
        } else {
            res.status(200).send({ result });
        }
    });
});

//To display visitors
router.post('/visitors', function(req, res, next) {
    if (req.body.role == "Admin") {
        db.visitors.find(function(err, visitors) {
            if (err) {
                res.status(500).send({
                    'error': true,
                    'message': error.INTERNAL_SERVER_ERROR
                });
                res.status(!200).send({
                    'error': true,
                    'message': error.UNDEFINED
                });

            } else {
                console.log("data");
                res.status(200).send(visitors);
            }
        });
    } else {

        db.visitors.find({ hmail: req.body.hmail }, function(err, visitors) {
            if (err) {
                error.error_function(err);
            } else {
                res.status(200).send(visitors);
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