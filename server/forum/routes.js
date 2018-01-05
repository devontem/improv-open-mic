var forumController = require('./forumController');
var checkAuth = require('./../helpers/helpers').checkAuth;

module.exports = function(app){
	app.get('/', forumController.getForumPosts);
	app.post('/', checkAuth, forumController.createPost);
	app.get('/:id', forumController.getForumPostById);
	app.delete('/:id', checkAuth, forumController.deletePost);
	app.post('/post-reply', checkAuth, forumController.createPostReply);
	app.delete('/post-reply/:id', checkAuth, forumController.deletePostReply);
}