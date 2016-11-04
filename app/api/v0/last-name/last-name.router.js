module.exports = function (app) {
    var LastName = require('./last-name.controller');
    
    //app.route('/v0/last-name').post(LastName.create);
    app.route('/v0/last-nameAll').post(LastName.createAll);
    app.route('/v0/last-name').get(LastName.retrieve);
    app.route('/v0/last-name/:id').get(LastName.detail);
    app.route('/v0/last-name/:id').put(LastName.update);
    app.route('/v0/last-name/:id').delete(LastName.delete);
};