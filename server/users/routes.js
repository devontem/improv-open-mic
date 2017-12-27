var ctrl = require('./usersController');
var checkAuth = require('./../helpers/helpers').checkAuth;

module.exports = function(app) {
	app.post('/', ctrl.createUser);
	app.get('/:id/following', checkAuth, ctrl.getFollowing);
	app.post('/follow', checkAuth, ctrl.followUser);
	app.post('/unfollow', checkAuth, ctrl.unfollowUser);
	app.get('/:id', ctrl.getUserById);
	app.put('/:id', checkAuth, ctrl.editUser);
	app.get('/search', ctrl.searchUsers);
}