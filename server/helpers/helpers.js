var bcrypt = require('bcrypt');
var fs = require('fs');
var path = require('path');
var MIME_TYPES = {
	'image/gif': '.gif', 
	'image/png': '.png', 
	'image/jpeg': '.jpeg', 
	'image/bmp': '.bpmp', 
	'image/webp': '.webp'
};

module.exports.hashPassword = function(password){
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(password, salt);

	return hash;
}

module.exports.checkPassword = function(password, database_hash){
	var correct_password = bcrypt.compareSync(password, database_hash);

	return correct_password;
}

module.exports.uploadImages = function(req){

	return new Promise(function(resolve, reject){
		if (!req.files){
	        reject(null);
	    }

	    // The name of the input field for the file
	    var file = req.files.photo;
	    var file_name = getHash() + getFileType(file.mimetype);
	    var destination_path = '/image_uploads/' + file_name;

	    // Use the mv() method to place the file somewhere on your server
	    file.mv('./public' + destination_path, function(err) {
	        if (err)
	          reject(null);

	        resolve(destination_path);
	    });
	});

}

function getFileType(item){
	if (MIME_TYPES[item]){
		return MIME_TYPES[item];
	}
	return '';
}

function getHash() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 8; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}