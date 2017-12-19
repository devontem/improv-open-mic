var bcrypt = require('bcrypt');

module.exports.hashPassword = function(password){
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(password, salt);

	return hash;
}

module.exports.checkPassword = function(password, database_hash){
	var correct_password = bcrypt.compareSync(password, database_hash);

	return correct_password;
}