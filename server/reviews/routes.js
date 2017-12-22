var reviewsController = require('./reviewsController');

module.exports = function(app){
	app.get('/', reviewsController.getReviews);
	app.post('/', reviewsController.createReview);
	app.get('/:id', reviewsController.getReviewById);
	app.put('/:id', reviewsController.editReview);
	app.delete('/:id', reviewsController.deleteReview);
	// app.post('/:id/like', reviewsController.likeReview);
	app.post('/review-reply', reviewsController.createReview);
	app.put('/review-reply/:id', reviewsController.editReviewReply)
}