var database = require('./../db/database');

module.exports.getForumPosts = function(req, res){
    // async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('SELECT * FROM `forum_posts`', function(error, results, fields) {
            if (error) {
                res.status(400).send({ data: error });
                return;
            }

            res.status(200).send({ data: results });
        });
    }).catch(catchErrors);

    function catchErrors(err){ res.status(400).send({ data: err }); return; }
}

module.exports.getForumPostById = function(req, res){
	var id = req.params.id;

    database.then(function(connection){
    	connection.query('SELECT * FROM forum_posts f, users u INNER JOIN forum_posts ON forum_posts.author_id = u.id WHERE forum_posts.id =' + id, function(err, forum_post, forum_post_fields) {
            if (err) {
                res.status(400).send({ data: err });
                return;
            }

            connection.query('SELECT * FROM forum_replies f, users u INNER JOIN forum_replies ON forum_replies.author_id = u.id WHERE forum_replies.parent_post_id =' + id+' group by forum_replies.id', function(error, forum_replies, fields) { 
            	if (error) {
                res.status(400).send({ data: error });
                return;
            }

            	res.status(200).send({ 
            		data: {
            			forum_post: forum_post[0] || {},
            			forum_replies: forum_replies
            		}
            	});
            });
        }).catch(catchErrors);

        function catchErrors(err){ res.status(400).send({ data: err }); return; }
    });
}

module.exports.createPost = function(req, res){
	var data = req.body;
    data.author_id = req.userId; // pulling user id from auth middleware
    data.date = new Date();

    database.then(function(connection){

    	connection.query('INSERT INTO `forum_posts` SET ?', data , function(err, results, fields) {
            if (err) { 
                res.status(400).send({ data: err });
                return;
            }

            res.status(200).send({ data: results });
        });
    }).catch(catchErrors);

    function catchErrors(err){ res.status(400).send({ data: err }); return; }
}

module.exports.deletePost = function(req, res){
	var data = req.body;

    database.then(function(connection){

    	connection.query('INSERT INTO `A2_OPEN_MICS` SET ?', data , function(err, results, fields) {
            if (err) { 
                res.status(400).send({ data: err });
                return;
            }

            res.status(200).send({ data: results });
        });
    }).catch(catchErrors);

    function catchErrors(err){ res.status(400).send({ data: err }); return; }
}

module.exports.editPost = function(req, res){
	var data = req.body;
	var changes = [data.title, data.body, data.id];
 
    database.then(function(connection){

    	connection.query('UPDATE `forum_posts` SET `title` = ?, `body` = ? WHERE id = ?', changes , function(err, results, fields) {
            if (err) { 
                res.status(400).send({ data: err });
                return;
            }

            res.status(200).send({ data: results });
        });
    }).catch(catchErrors);

    function catchErrors(err){ res.status(400).send({ data: err }); return; }
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
    data.author_id = req.userId; // pulling user id from auth middleware

    // handle type errors from frontend
    if (typeof data.parent_post_id === 'string') data.parent_post_id = parseInt(data.parent_post_id);
    data.date = new Date();

    database.then(function(connection){

    	connection.query('INSERT INTO `forum_replies` SET ?', data , function(err, results, fields) {
            if (err) { 
                res.status(400).send({ data: err });
                return;
            }

            res.status(200).send({ data: results });
        });
    }).catch(catchErrors);

    function catchErrors(err){ res.status(400).send({ data: err }); return; }
}

module.exports.editPostReply = function(req, res){
	var data = req.body;
	var changes = [data.body, data.id];

    database.then(function(connection){ 
    	connection.query('UPDATE `forum_replies` SET body = ? WHERE id = ?', changes, function(err, results, fields) {
            if (err) { 
                res.status(400).send({ data: err });
                return;
            }

            res.status(200).send({ data: results });
        });
    }).catch(catchErrors);

    function catchErrors(err){ res.status(400).send({ data: err }); return; }
}