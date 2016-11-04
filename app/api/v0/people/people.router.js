module.exports = function (app) {
    var people = require('./people.controller');
    
    //app.route('/v0/people').post(people.create);
    app.route('/v0/peopleAll').post(people.createAll);
    app.route('/v0/people').get(people.retrieve);
    app.route('/v0/people/:id').get(people.detail);
    app.route('/v0/people/:id').put(people.update);
    app.route('/v0/people/:id').delete(people.delete);
};