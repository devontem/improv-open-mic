module.exports.getReviews = function(req, res){
	var data = req.body;
    // async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('INSERT INTO `A2_OPEN_MICS` SET ?', data , function(error, results, fields) {
            if (error) {
                console.log(error);
                res.status(400).send({ data: error });
                return;
            }
            console.log('results', results);

            res.status(200).send({ data: results });
        });
    });
}

module.exports.getReviewById = function(req, res){
	// get reviewReplies
	var data = req.body;
    // async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('INSERT INTO `A2_OPEN_MICS` SET ?', data , function(error, results, fields) {
            if (error) {
                console.log(error);
                res.status(400).send({ data: error });
                return;
            }
            console.log('results', results);

            res.status(200).send({ data: results });
        });
    });
}

module.exports.deleteReview = function(req, res){
	var data = req.body;
    // async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('INSERT INTO `A2_OPEN_MICS` SET ?', data , function(error, results, fields) {
            if (error) {
                console.log(error);
                res.status(400).send({ data: error });
                return;
            }
            console.log('results', results);

            res.status(200).send({ data: results });
        });
    });
}

module.exports.createReview = function(req, res){
	var data = req.body;
    // async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('INSERT INTO `A2_OPEN_MICS` SET ?', data , function(error, results, fields) {
            if (error) {
                console.log(error);
                res.status(400).send({ data: error });
                return;
            }
            console.log('results', results);

            res.status(200).send({ data: results });
        });
    });
}

module.exports.editReview = function(req, res){
	var data = req.body;
    // async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('INSERT INTO `A2_OPEN_MICS` SET ?', data , function(error, results, fields) {
            if (error) {
                console.log(error);
                res.status(400).send({ data: error });
                return;
            }
            console.log('results', results);

            res.status(200).send({ data: results });
        });
    });
}

module.exports.likeReview = function(req, res){
	var data = req.body;
    // async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('INSERT INTO `A2_OPEN_MICS` SET ?', data , function(error, results, fields) {
            if (error) {
                console.log(error);
                res.status(400).send({ data: error });
                return;
            }
            console.log('results', results);

            res.status(200).send({ data: results });
        });
    });
}

module.exports.createReviewReply = function(req, res){
	var data = req.body;
    // async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('INSERT INTO `A2_OPEN_MICS` SET ?', data , function(error, results, fields) {
            if (error) {
                console.log(error);
                res.status(400).send({ data: error });
                return;
            }
            console.log('results', results);

            res.status(200).send({ data: results });
        });
    });
}

module.exports.editReviewReply = function(req, res){var data = req.body;
    // async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('INSERT INTO `A2_OPEN_MICS` SET ?', data , function(error, results, fields) {
            if (error) {
                console.log(error);
                res.status(400).send({ data: error });
                return;
            }
            console.log('results', results);

            res.status(200).send({ data: results });
        });
    });
}



