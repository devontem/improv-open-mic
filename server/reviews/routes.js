var reviewsController = require('./reviewsController');
var checkAuth = require('./../helpers/helpers').checkAuth;

module.exports = function(app){
	app.get('/', reviewsController.getReviews);
	app.post('/', checkAuth, reviewsController.createReview);
	app.get('/tags', reviewsController.getAllTags);
	app.get('/tags/used', reviewsController.getTagsFromReviews);
	app.get('/:id', reviewsController.getReviewById);
	app.delete('/:id', checkAuth, reviewsController.deleteReview);
	app.post('/review-reply', checkAuth, reviewsController.createReviewReply);
	app.delete('/review-reply/:id', checkAuth, reviewsController.deleteReviewReply);
}