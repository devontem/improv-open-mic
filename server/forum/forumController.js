var database = require('./.../db/database');

module.exports.getForumPosts = function(req, res){
    // async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('SELECT * FROM `forum_posts`', function(error, results, fields) {
            if (err) res.status(400).send({ data: error });

            res.status(200).send({ data: results });
        });
    });
}

module.exports.getForumPostById = function(req, res){
	var id = req.body.id;

    database.then(function(connection){
    	connection.query('SELECT * FROM `forum_posts` WHERE id = ' + id, function(err, forum_post, forum_post_fields) {
            if (err) res.status(400).send({ data: err });

            connection.query('SELECT * FROM `forum_replies` WHERE `parent_post_id` = ' + id, function(error, forum_replies, fields) { 
            	if (error) res.status(400).send({ data: error });

            	res.status(200).send({ 
            		data: {
            			forum_post: forum_post,
            			forum_replies: forum_replies
            		}
            	});
            });
        });
    });
}

module.exports.createPost = function(req, res){
	var data = req.body;

    database.then(function(connection){

    	connection.query('INSERT INTO `forum_posts` SET ?', data , function(error, results, fields) {
            if (err) res.status(400).send({ data: error });

            res.status(200).send({ data: results });
        });
    });
}

module.exports.deletePost = function(req, res){
	var data = req.body;

    database.then(function(connection){

    	connection.query('INSERT INTO `A2_OPEN_MICS` SET ?', data , function(error, results, fields) {
            if (err) res.status(400).send({ data: error });

            res.status(200).send({ data: results });
        });
    });
}

module.exports.editPost = function(req, res){
	var data = req.body;
	var changes = [data.title, data.body, data.id];
 
    database.then(function(connection){

    	connection.query('UPDATE `forum_posts` SET `title` = ?, `body` = ? WHERE id = ?', changes , function(error, results, fields) {
            if (err) res.status(400).send({ data: error });

            res.status(200).send({ data: results });
        });
    });
}

// module.exports.likePost = function(req, res){
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

module.exports.createPostReply = function(req, res){
	var data = req.body;

    database.then(function(connection){

    	connection.query('INSERT INTO `forum_replies` SET ?', data , function(error, results, fields) {
            if (err) res.status(400).send({ data: error });

            res.status(200).send({ data: results });
        });
    });
}

module.exports.editPostReply = function(req, res){
	var data = req.body;
	var changes = [data.body, data.id];

    database.then(function(connection){ 
    	connection.query('UPDATE `forum_replies` SET body = ? WHERE id = ?', changes, function(error, results, fields) {
            if (err) res.status(400).send({ data: error });

            res.status(200).send({ data: results });
        });
    });
}