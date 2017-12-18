var ctrl = require('./usersController');

module.exports = function(app) {
	app.post('/', ctrl.createUser);
	app.get('/:id', ctrl.getUserById);
	app.put('/:id', ctrl.editUser);
	app.get('/search', ctrl.searchUsers);
}