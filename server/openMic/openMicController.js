var database = require('./.../db/database');

module.exports.getOpenMics = function(req, res){
	// query params 
	var query = req.body.queries;
	// async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('SELECT * FROM `open_mics`', function(error, results, fields) {
            if (err) res.status(400).send({ data: error });

            res.status(200).send({ data: results });
        });
    });
}

module.exports.searchOpenMics = function(req, res){
	var search = req.body.search;
	// async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('SELECT * FROM `open_mics` WHERE title LIKE %?%', [search], function(error, results, fields) {
            if (err) res.status(400).send({ data: error });

            res.status(200).send({ data: results });
        });
    });
}

module.exports.getOpenMicById = function(req, res){
	var id = req.body.id;
	// async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('SELECT * FROM `open_mics` WHERE id = ' + id, function(error, results, fields) {
            if (err) res.status(400).send({ data: error });

            res.status(200).send({ data: results });
        });
    });
}

module.exports.createOpenMic = function(req, res){
	var data = req.body;
    // async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('INSERT INTO `open_mics` SET ?', data, function(error, results, fields) {
            if (err) res.status(400).send({ data: error });

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
            if (err) res.status(400).send({ data: error });

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
            if (err) res.status(400).send({ data: error });

            res.status(200).send({ data: results });
        });
    });
}


