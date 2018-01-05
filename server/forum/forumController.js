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
    var id = parseInt(req.params.id);
    var userId = parseInt(req.userId);

    database.then(function(connection){
        connection.query('SELECT * FROM `forum_posts` where id = ' + id , function(error, results, fields) {
            if (error) {
                console.log(error);
                res.status(400).send({ data: error });
                return;
            }
            var post = results[0];

            // checking if logged in user is deleting their own post
            if (post && post.author_id === userId){
                deletePost();
            } else {
                res.status(400).send({error: 'Access forbidden. Only author creator can delete their posts.'});
            }

            function deletePost(){
                connection.query('DELETE from `forum_posts` where id = '+ id, function(error1, results1, fields1) {
                    if (error1) {
                        console.log(error1);
                        res.status(400).send({ data: error1 });
                        return;
                    }

                    res.status(200).send({ data: results1 });
                });
            }
        });
    });
}

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

module.exports.deletePostReply = function(req, res){
    var id = parseInt(req.params.id);
    var userId = parseInt(req.userId);

    database.then(function(connection){
        connection.query('SELECT * FROM `forum_replies` where id = ' + id , function(error, results, fields) {
            if (error) {
                console.log(error);
                res.status(400).send({ data: error });
                return;
            }
            var post = results[0];

            // checking if logged in user is deleting their own post
            if (post && post.author_id === userId){
                deletePost();
            } else {
                res.status(400).send({error: 'Access forbidden. Only author creator can delete their posts.'});
            }

            function deletePost(){
                connection.query('DELETE from `forum_replies` where id = '+ id, function(error1, results1, fields1) {
                    if (error1) {
                        console.log(error1);
                        res.status(400).send({ data: error1 });
                        return;
                    }

                    res.status(200).send({ data: results1 });
                });
            }
        });
    });
}