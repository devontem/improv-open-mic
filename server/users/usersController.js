var database = require('./.../db/database');
var hashPassword = require('./../helpers/helpers').hashPassword;
// add friends
// add memberships

module.exports.getUserById = function(req, res){
	var data = req.body;
    // async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('SELECT * FROM `users` WHERE id = ' + id, function(err, results, fields) {
            if (err) res.status(400).send({ data: err });

            res.status(200).send({ data: results });
        });
    });
}

module.exports.createUser = function(req, res){
	var data = req.body;
	data.password = hashPassword(data.password); // hashing password for storage

    database.then(function(connection){
        // query database 
    	connection.query('INSERT INTO `users` SET ?', data, function(error, results, fields) {
            if (err) res.status(400).send({ data: err });

            res.status(200).send({ data: results });
        });
    });
}

module.exports.editUser = function(req, res){
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

module.exports.searchUsers = function(req, res){
	var search = req.body.search;
	// async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('SELECT * FROM `users` WHERE email LIKE %?%', [search], function(error, results, fields) {
            if (err) res.status(400).send({ data: error });

            res.status(200).send({ data: results });
        });
    });
}