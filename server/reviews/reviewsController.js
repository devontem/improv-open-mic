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
    	connection.query('SELECT reviews.title, reviews.body, reviews.photo, reviews.author_id, reviews.id, reviews.open_mic_id, reviews.date, r.id, u.username, u.photo as userPhoto, o.title as jamTitle, o.city FROM reviews r, users u INNER JOIN reviews ON reviews.author_id = u.id INNER JOIN open_mics o ON o.id = reviews.open_mic_id where reviews.id = '+id+' group by reviews.id', function(err, review, review_fields) {
            if (err) {
                res.status(400).send({ data: err });
                console.log('first error', err)
                return;
            }

            connection.query('SELECT review_comments.date, review_comments.review_id, review_comments.body, review_comments.author_id, u.username, u.photo, u.id FROM review_comments r, users u INNER JOIN review_comments ON review_comments.author_id = u.id WHERE review_comments.review_id = '+ id +' group by review_comments.id', function(error, review_replies, fields) { 
                if (error) {
                    res.status(400).send({ data: error });
                    console.log('second error', error)
                    return;
                }
                if (review && review[0] && review[0].password) delete review[0].password; // removing password

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
    data.author_id = req.userId; // pulling user id from auth middleware
    console.log(data)

    // if image is supplied
    if (req.files){
        uploadImages(req).then(function(image_path){
            processReview(image_path);
        })
        .catch(function(){
            res.status(400).send({error: 'Image upload failed, please try again or try another photo.'});
        });

    // if no image is supplied
    } else {
        processReview();
    }

    function processReview(image_path){
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
    }
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
    data.author_id = req.userId; // pulling user id from auth middleware
    console.log('data is', data);

    database.then(function(connection){
        data.date = new Date();
    	connection.query('INSERT INTO `review_comments` SET ?', data , function(error, results, fields) {
            if (error) {
                console.log(error);
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
