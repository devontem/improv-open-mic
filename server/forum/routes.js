var forumController = require('./forumController');
var checkAuth = require('./../helpers/helpers').checkAuth;

module.exports = function(app){
	app.get('/', forumController.getForumPosts);
	app.post('/', checkAuth, forumController.createPost);
	app.get('/:id', forumController.getForumPostById);
	app.put('/:id', forumController.editPost);
	app.delete('/:id', forumController.editPost);
	// app.post('/:id/like', forumController.likePost);
	app.post('/post-reply', checkAuth, forumController.createPostReply);
	app.put('/post-reply/:id', forumController.editPostReply);
}