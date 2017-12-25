var ctrl = require('./authController');

module.exports = function(app) {
	app.post('/login', ctrl.login);
	app.post('/signup', ctrl.signUp);
}