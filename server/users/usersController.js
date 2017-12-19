module.exports.getUserById = function(req, res){
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

module.exports.createUser = function(req, res){
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

module.exports.editUser = function(req, res){
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

module.exports.searchUsers = function(req, res){
	// query param
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