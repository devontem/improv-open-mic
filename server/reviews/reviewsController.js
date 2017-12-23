var database = require('./../db/database');
var uploadImages = require('./../helpers/helpers').uploadImages;

module.exports.getReviews = function(req, res){
	// add query param to get for a specific venue_id and for all (homepage)
	// async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('SELECT * FROM `reviews`', function(error, results, fields) {
            if (error) {
                res.status(400).send({ data: error });
                return;
            }

            res.status(200).send({ data: results });
        });
    });
}

module.exports.getReviewById = function(req, res){
	var id = req.params.id;

    database.then(function(connection){
    	connection.query('SELECT * FROM `reviews` WHERE id = ' + id, function(err, review, review_fields) {
            if (err) {
                res.status(400).send({ data: err });
                console.log('first error', err)
                return;
            }

            connection.query('SELECT * FROM `review_comments` WHERE `review_id` = ' + id, function(error, review_replies, fields) { 
            if (error) {
                res.status(400).send({ data: error });
                console.log('second error', error)
                return;
            }

            	res.status(200).send({ 
            		data: {
            			review: review[0],
            			review_replies: review_replies
            		}
            	});
            });
        });
    });
}

module.exports.deleteReview = function(req, res){
	var id = req.body.id;
    // async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('DELETE FROM `reviews` WHERE id = ' + id , function(error, results, fields) {
            if (error) {
                res.status(400).send({ data: error });
                return;
            }

            res.status(200).send({ data: results });
        });
    });
}

module.exports.createReview = function(req, res){
	var data = req.body;
    console.log(data)
    // upload image asynchronously
    uploadImages(req).then(function(image_path){
        // format fields
        data.photo = image_path;
        data.open_mic_id = parseInt(data.open_mic_id);
        data.author_id = parseInt(data.author_id);
        data.date = new Date();
        // add to database 
        database.then(function(connection){
            connection.query('INSERT INTO `reviews` SET ?', data , function(error, results, fields) {
                if (error) {
                    res.status(400).send({ data: error });
                    return;
                }

                res.status(200).send({ data: results });
            });
        });
    })
    .catch(function(){
        res.status(400).send({error: 'Image upload failed, please try again or try another photo.'});
    });
}

module.exports.editReview = function(req, res){
	var data = req.body;
	var changes = [data.title, data.body, data.photo, data.id];
 
    database.then(function(connection){

    	connection.query('UPDATE `forum_posts` SET `title` = ?, `body` = ?, `photo` = ? WHERE id = ?', changes , function(error, results, fields) {
            if (error) {
                res.status(400).send({ data: error });
                return;
            }

            res.status(200).send({ data: results });
        });
    });
}

// module.exports.likeReview = function(req, res){
// 	var data = req.body;
//     // async connection to database
//     database.then(function(connection){
//         // query database 
//     	connection.query('INSERT INTO `A2_OPEN_MICS` SET ?', data , function(error, results, fields) {
//             if (error) {
//                 console.log(error);
//                 res.status(400).send({ data: error });
//                 return;
//             }
//             console.log('results', results);

//             res.status(200).send({ data: results });
//         });
//     });
// }

module.exports.createReviewReply = function(req, res){
	var data = req.body;

    database.then(function(connection){

    	connection.query('INSERT INTO `review_comments` SET ?', data , function(error, results, fields) {
            if (error) {
                res.status(400).send({ data: error });
                return;
            }

            res.status(200).send({ data: results });
        });
    });
}

module.exports.editReviewReply = function(req, res){
	var data = req.body;
    var data = req.body;
	var changes = [data.body, data.id];
 
    database.then(function(connection){

    	connection.query('UPDATE `review_comments` SET `body` = ? WHERE id = ?', changes , function(error, results, fields) {
            if (error) {
                res.status(400).send({ data: error });
                return;
            }

            res.status(200).send({ data: results });
        });
    });
}
