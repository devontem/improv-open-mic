
module.exports.getOpenMics = function(req, res){
	// query param -- city, country, stars, etc.
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

module.exports.searchOpenMics = function(req, res){
	// search, return list of possible
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

module.exports.getOpenMicById = function(req, res){
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

module.exports.createOpenMic = function(req, res){
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

module.exports.editOpenMic = function(req, res){
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

module.exports.deleteOpenMic = function(req, res){
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


