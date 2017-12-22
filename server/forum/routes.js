var forumController = require('./forumController');
// var checkAuth = require('./../helpers/authHelper');

module.exports = function(app){
	app.get('/', forumController.getForumPosts);
	app.post('/', forumController.createPost);
	app.get('/:id', forumController.getForumPostById);
	app.put('/:id', forumController.editPost);
	app.delete('/:id', forumController.editPost);
	// app.post('/:id/like', forumController.likePost);
	app.post('/post-reply', forumController.createPostReply);
	app.put('/post-reply/:id', forumController.editPostReply);
}