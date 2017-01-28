var express = require('express');
var router = express.Router();


module.exports = {

    INTERNAL_SERVER_ERROR: "Internal server error",
    NOT_FOUND: " User Not found",
    UNDEFINED: "Error"

}

module.exports = {
    error_function: function(error) {
        res.status(500).send({
            'error': true,
            'message': error.INTERNAL_SERVER_ERROR
        });
        res.status(!200).send({
            'error': true,
            'message': error.UNDEFINED
        });

    }
}