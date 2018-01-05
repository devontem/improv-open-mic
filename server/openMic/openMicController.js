var database = require('./../db/database');

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

            connection.query('SELECT reviews.body, reviews.date, reviews.id, reviews.author_id, reviews.photo, u.username FROM reviews r, users u INNER JOIN reviews ON reviews.author_id = u.id WHERE reviews.open_mic_id =' + id +' group by reviews.id', function(err, reviews, reviews_fields) {
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

module.exports.getHomepage = function(req, res){
    var id = req.body.id;
    // async connection to database
    database.then(function(connection){
        // query database 
        connection.query('SELECT * FROM `users` LIMIT 10' , function(error, users, fields) {
            if (error) {
                console.log(error)
                res.status(400).send({ data: error });
                return;
            }

            connection.query('SELECT reviews.title, reviews.body, reviews.date, reviews.id, reviews.author_id, reviews.photo, u.username FROM reviews r, users u INNER JOIN reviews ON reviews.author_id = u.id group by reviews.id LIMIT 10', function(error1, reviews, fields1) {
            if (error1) {
                console.log(error1)
                res.status(400).send({ data: error1 });
                return;
            }

            res.status(200).send({ 
                reviews: reviews,
                users: users
            });
        });
        });
    });
}


