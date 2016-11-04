module.exports = function (app) {
    var Name = require('./name.controller');
    
    //app.route('/v0/name').post(Name.create);
    app.route('/v0/nameAll').post(Name.createAll);
    app.route('/v0/name').get(Name.retrieve);
    app.route('/v0/name/:id').get(Name.detail);
    app.route('/v0/name/:id').put(Name.update);
    app.route('/v0/name/:id').delete(Name.delete);
};