var database = require('./../db/database');
// add tags 
// add likes

module.exports.getOpenMics = function(req, res){
	// query params 
	var query = req.body.queries;
	// async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('SELECT * FROM `open_mics`', function(error, results, fields) {
            if (error) {
                res.status(400).send({ data: error });
                return;
            }

            res.status(200).send({ data: results });
        });
    });
}

module.exports.searchOpenMics = function(req, res){
	var search = req.body.search;
	// async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('SELECT * FROM `open_mics` WHERE title like %Mary%', function (error, results, fields) {
            if (error) {
                res.status(400).send({ data: error });
                return;
            }

            res.status(200).send({ data: results });
        });
    });
}

module.exports.getOpenMicById = function(req, res){
	var id = req.params.id;
	// async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('SELECT * FROM `open_mics` WHERE id = ' + id, function(error, results, fields) {
            if (error) {
                res.status(400).send({ data: error });
                return;
            }

            connection.query('SELECT * FROM `reviews` WHERE open_mic_id = ' + id, function(err, reviews, reviews_fields) {
                if (err) {
                    res.status(400).send({ data: err });
                    return;
                }
                res.status(200).send({
                    jam: results[0],
                    reviews: reviews 
                });
            });
        });
    });
}

module.exports.createOpenMic = function(req, res){
	var data = req.body;

    data.venue_id = parseInt(data.venue_id);
    data.active = 1;
    // async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('INSERT INTO `open_mics` SET ?', data, function(error, results, fields) {
            if (error) {
                res.status(400).send({ data: error });
                return;
            }

            res.status(200).send({ data: results });
        });
    });
}

module.exports.editOpenMic = function(req, res){
	var data = req.body;
	var changes = [ data['title'], 
					data['venue_id'], 
					data['day_of_week'], 
					data['start_time'], 
					data['end_time'], 
					data['city'], 
					data['country'], 
					data['active'], 
					data['id']];

    // async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('UPDATE `open_mics` SET title = ?, venue_id = ?, day_of_week = ?, start_time = ?, end_time = ?, city = ?, country = ?, active = ? WHERE id = ?', changes, function(error, results, fields) {
            if (error) {
                res.status(400).send({ data: error });
                return;
            }

            res.status(200).send({ data: results });
        });
    });
}

module.exports.deleteOpenMic = function(req, res){
	var id = req.body.id;
    // async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('DELETE FROM `open_mics` WHERE id = ' + id , function(error, results, fields) {
            if (error) {
                res.status(400).send({ data: error });
                return;
            }

            res.status(200).send({ data: results });
        });
    });
}


