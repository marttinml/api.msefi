module.exports = function (app) {
    var Membership = require('./membership.controller');
    
    app.route('/v0/membership').post(Membership.create);
    app.route('/v0/membership').get(Membership.retrieve);
    app.route('/v0/membership/:id').get(Membership.detail);
    app.route('/v0/membership/:id').put(Membership.update);
    app.route('/v0/membership/:id').delete(Membership.delete);

    app.route('/v0/login').post(Membership.login);
};