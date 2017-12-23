var morgan = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config');
var path = require('path');
var fileUpload = require('express-fileupload');

module.exports = function(app, express){
	// set headers to prevent CORS issue
	app.use(function (req, res, next) {
		    // Website you wish to allow to connect
		    res.setHeader('Access-Control-Allow-Origin', '*');

		    // Request methods you wish to allow
		    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

		    // Request headers you wish to allow
		    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

		    // Set to true if you need the website to include cookies in the requests sent
		    // to the API (e.g. in case you use sessions)
		    res.setHeader('Access-Control-Allow-Credentials', true);

	    // Pass to next layer of middleware
	    next();
	});

	// setting application variables
	app.set('secret', config.secret);

	// // file upload module
	app.use(fileUpload());

	// serving static files
	app.use(express.static(path.resolve(__dirname, '..', '..' , 'build')));
	app.use(express.static(path.resolve(__dirname, '..', '..' , 'public')));

	// colored/detailed server logs
	app.use(morgan('dev'));

	// parses x-www-form-urlencoded (form) data on request
	app.use(bodyParser({ urlencoded: true }));

	// parses json data on request
	app.use(bodyParser.json());

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

	// render the react app
	app.get('/', function(req, res){
		res.sendFile(path.resolve(__dirname, '..', '..', 'build', 'index.html'));
	});
}