var jwt = require('jsonwebtoken');
var checkPassword = require('./../helpers/helpers').checkPassword;
var hashPassword = require('./../helpers/helpers').hashPassword;
var uploadImages = require('./../helpers/helpers').uploadImages;
var database = require('./../db/database');
var config = require('./../config/config');

module.exports.login = function(req, res){
	var email = req.body.email;
	var pw = req.body.password;

	// async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('SELECT * FROM `users` WHERE email = ' + email, function(error, results, fields) {
            if (error) {
                res.status(400).send({ data: error });
                return;
            }
            console.log(results)

            // get user
            var user = results[0];

            // user doesn't exist
            if (!user || !user.id) {
            	res.status(400).send({
					error: true,
					errorMessage: 'User does not exist.'
				});
            	return;
            }

            var dbHashPassword = user.password;
            delete user.password;
            var token = jwt.sign(user.id, config.authKey);

            // correct password
            if (checkPassword(pw, dbHashPassword)) {
            	res.status(200).send({
            		message: 'User logged in.',
					token: token,
					user: user
            	});

            // wrong password
            } else {
            	res.status(403).send({
					error: true,
					errorMessage: 'Passwords do not match.'
				});
            }

        });
    }).catch(catchErrors);

    function catchErrors(err){ res.status(400).send({ data: err }); return; }
}

module.exports.signUp = function(req, res){
	var email = req.body.email;
	var data = req.body;
    console.log('req.body', req.body, req.files);

    // with image upload
    if (req.files){
        // upload image asynchronously
        uploadImages(req).then(function(image_path){
            processSignUp(image_path);
        })
        .catch(function(){
            res.status(400).send({error: 'Image upload failed, please try again or try another photo.'});
        });

    // without image upload
    } else {
        processSignUp();
    }

    function processSignUp(image_path){
    	database.then(function(connection){
    		// checking if email already exists
            console.log('SELECT * FROM `users` WHERE email = ' + email)
        	connection.query('SELECT * FROM `users` WHERE email =' + connection.escape(email), function(err, results, fields) {
                if (err) { 
                    console.log('first', err)
                    res.status(400).send({ data: err });
                    return;
                }
                console.log('results',results, results[0])
                // get user
                var user = results[0];

                // user already exists
                if (user) {
                	res.status(400).send({
    					error: true,
    					errorMessage: 'User already exists.'
    				});
                	return;
                }

                // adjusting fields
                data.email = connection.escape(data.email);
                data.password = hashPassword(data.password);
                data.join_date = new Date();
                if (image_path) data.photo = image_path;
                console.log('data clean', data);


                // signing up user
                connection.query("INSERT INTO `users` SET ?", data, function(err2, results2, fields2) {
    	            if (err2) { 
                        console.log('')
    	                res.status(400).send({ data: err2 });
    	                return;
    	            }

                    // appending id
                    data.id = results2.insertId;
                    delete data.password; // remove password field

                    // creating token to log in user
    	            var token = jwt.sign(data.id, 'improv-app');

    	            res.status(200).send({ 
    	            	message: 'User signed up.',
    					token: token,
    					user: data
    	            });
    	        });
            });
        }).catch(catchErrors);
    }

    function catchErrors(err){ res.status(400).send({ data: err }); return; }
}