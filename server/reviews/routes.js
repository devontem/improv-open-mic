var reviewsController = require('./reviewsController');
var checkAuth = require('./../helpers/helpers').checkAuth;

module.exports = function(app){
	app.get('/', reviewsController.getReviews);
	app.post('/', checkAuth, reviewsController.createReview);
	app.get('/:id', reviewsController.getReviewById);
	app.put('/:id', checkAuth, reviewsController.editReview);
	app.delete('/:id', reviewsController.deleteReview);
	// app.post('/:id/like', reviewsController.likeReview);
	app.post('/review-reply', checkAuth, reviewsController.createReviewReply);
	app.put('/review-reply/:id', reviewsController.editReviewReply)
}