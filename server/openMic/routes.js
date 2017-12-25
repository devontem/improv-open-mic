var ctrl = require('./openMicController');
var checkAuth = require('./../helpers/helpers').checkAuth;

module.exports = function(app){
	app.get('/', ctrl.getOpenMics);
	app.post('/', checkAuth, ctrl.createOpenMic);
	app.post('/search', ctrl.searchOpenMics);
	app.get('/:id', ctrl.getOpenMicById);
	app.put('/:id', ctrl.editOpenMic);
	app.delete('/:id', ctrl.deleteOpenMic);

}