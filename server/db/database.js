var mysql = require('mysql2');
var Client = require('ssh2').Client;
var ssh = new Client();
var keys = (process.env && process.env.password) ? process.env : require('./../config/config');
var db_env = (process.env && process.env.DB_ENV) ? process.env.DB_ENV : 'herts';
var db;

if (db_env === 'local'){

	// localhost database for dev environment
	db = new Promise(function(resolve, reject){
		connection = mysql.createConnection({
		  host     : '127.0.0.1',
		  user     : 'root',
		  password : '',
		  database : 'test'
		});

		resolve(connection);
	});

}

if (db_env === 'herts'){
		// University of Hertfordshire Database
		db = new Promise(function(resolve, reject){
			ssh.on('ready', function() {
			  ssh.forwardOut(
			    // source address, this can usually be any valid address
			    '127.0.0.1',
			    // source port, this can be any valid port number
			    12345,
			    // destination address (localhost here refers to the SSH server)
			    '127.0.0.1',
			    // destination port
			    3306,
			    function (err, stream) {
			    	// send rejection promise on SSH error
					if (err){
						reject(err);
					}

					// use `sql` connection as usual
					connection = mysql.createConnection({
						host     : '127.0.0.1',
						user     : keys.user,
						password : keys.password, // stored in a file not in version management
						database : keys.database,
						stream   : stream
					});

					// send rejection promise on mysql error
					connection.connect(function(err){
						if (err){
							// send rejection promise on mysql error
							console.log('Error:', err)
							reject(err);
						} else {
							// send connection back in variable on success
							resolve(connection);
						}
						
					});
			  });
			}).connect({
			  host: keys.host, // host on different server
			  port: keys.port,
			  username: keys.user,
			  password: keys.password // stored in a file not in version management
			});
			
		});
}

module.exports = db;

