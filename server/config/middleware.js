var morgan = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config');
var promise = require('bluebird');
var mongoose = require('mongoose');

module.exports = function(app, express){

	// setting application variables
	app.set('secret', config.secret);

	// serving static files
	app.use(express.static(__dirname + '/../../public'));

	// colored/detailed server logs
	app.use(morgan('dev'));

	// parses x-www-form-urlencoded (form) data on request
	app.use(bodyParser({ urlencoded: true }));

	// parses json data on request
	app.use(bodyParser.json());

	var db = require('./../db/database');
	app.get('/hi', function(req, res){
		console.log('hitting /')
		console.log(db)
		db.then(function(connection){
			console.log(connection);
			res.send(connection.toString());
		});
	});

	// routers
	var openMicRouter = express.Router();
	var userRouter = express.Router();
	var authRouter = express.Router();
	var reviewsRouter = express.Router();
	var forumRouter = express.Router();

	// routes
	app.use('/api/open-mics', openMicRouter);
	app.use('/api/users', userRouter);
	app.use('/api/authenticate', authRouter);
	app.use('/api/reviews', reviewsRouter);
	app.use('/api/forum', forumRouter);

	// initialize routes
	var openMicRoutes = require('../openMic/routes');
	openMicRoutes(openMicRouter);

	var userRoutes = require('../users/routes');
	userRoutes(userRouter);

	var authRoutes = require('../auth/routes');
	authRoutes(authRouter);

	var reviewsRoutes = require('../reviews/routes');
	reviewsRoutes(reviewsRouter);

	var forumRoutes = require('../forum/routes');
	forumRoutes(forumRouter);

}