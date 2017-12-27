var database = require('./../db/database');
var hashPassword = require('./../helpers/helpers').hashPassword;
// add friends
// add memberships

module.exports.getUserById = function(req, res){
	var id = req.params.id;
    // async connection to database
    database.then(function(connection){
        // query database for user data
    	connection.query('SELECT * FROM `users` WHERE id = ' + id, function(error, data, fields) {
            if (error) {
                res.status(400).send({ data: error });
                return;
            }
            // querying database for who user is following
            connection.query('SELECT * FROM users u INNER JOIN following ON following.followee = u.id  WHERE following.follower =' + id, function(error1, following, fields1) {
                if (error1) {
                    res.status(400).send({ data: error1 });
                    return;
                }
                // querying database for who is following user
                connection.query('SELECT * FROM users u INNER JOIN following ON following.follower = u.id  WHERE following.followee =' + id, function(error2, followers, fields2) {
                    if (error2) {
                        res.status(400).send({ data: error2 });
                        return;
                    }
                    // querying database for users reviews
                    connection.query('SELECT reviews.id, reviews.title as reviewTitle, reviews.photo, reviews.body, reviews.date, o.title as jamTitle FROM reviews r, open_mics o INNER JOIN reviews ON reviews.open_mic_id = o.id WHERE reviews.author_id =' + id +' group by reviews.id', function(error3, reviews, fields3) {
                        if (error3) {
                            res.status(400).send({ data: error3 });
                            return;
                        }

                        res.status(200).send({ 
                            data: data[0],
                            followers: followers,
                            following: following,
                            reviews: reviews
                        });
                    });
                });
            });
        });
    });
}

module.exports.createUser = function(req, res){
	var data = req.body;

    // upload image asynchronously
    uploadImages(req).then(function(image_path){

        // formatting fields
        data.photo = image_path;
        data.join_date = new Date();
        data.password = hashPassword(data.password);
        console.log('data',data);
        database.then(function(connection){
            // query database 
        	connection.query('INSERT INTO `users` SET ?', data, function(error, results, fields) {
                if (err) res.status(400).send({ data: err });

                res.status(200).send({ data: results });
            });
        });
    })
    .catch(function(){
        res.status(400).send({error: 'Image upload failed, please try again or try another photo.'});
    });

}

module.exports.getFollowing = function (req, res) {
    var id = req.params.id;
    id = req.userId;

    database.then(function(connection){
        // query database 
        connection.query('SELECT * FROM `following` WHERE follower = ' + id, function(error, results, fields) {
            if (error) res.status(400).send({ data: error });

            res.status(200).send({ data: results });
        });
    });
};

module.exports.followUser = function (req, res) {
    var data = req.body;
    console.log('data1',data);
    data.followee = parseInt(data.followee);
    data.follower = parseInt(req.userId);
    console.log('data2',data)

    database.then(function(connection){
        // query database 
        connection.query('INSERT INTO `following` SET ?', data, function(error, results, fields) {
            if (error) {
                console.log(error);
                res.status(400).send({ data: error });
                return;
            }

            res.status(200).send({ data: results });
        });
    });
};

module.exports.unfollowUser = function (req, res) {
    var data = req.body;
    data.followee = parseInt(data.followee);
    data.follower = parseInt(req.userId);

    database.then(function(connection){
        // query database 
        connection.query('DELETE FROM `following` WHERE follower = '+data.follower+' AND followee ='+data.followee, function(error, results, fields) {
            if (error) {
                console.log(error);
                res.status(400).send({ data: error });
                return;
            }

            res.status(200).send({ data: results });
        });
    });
};

module.exports.editUser = function(req, res){
    var id = parseInt(req.userId);
    var data = req.body;
    // hashing password for storage
    data.password = hashPassword(data.password);
    var changes = [data.username, data.email, data.password];

    // async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('UPDATE `users` SET username = ?, email = ?, password = ? WHERE id = ' + id, changes, function(error, results, fields) {
            if (error) {
                console.log(error);
                res.status(400).send({ data: error });
                return;
            }

            res.status(200).send({ data: results });
        });
    });
}

module.exports.searchUsers = function(req, res){
	var search = req.body.search;
	// async connection to database
    database.then(function(connection){
        // query database 
    	connection.query('SELECT * FROM `users` WHERE email LIKE %?%', [search], function(error, results, fields) {
            if (err) res.status(400).send({ data: error });

            res.status(200).send({ data: results });
        });
    });
}