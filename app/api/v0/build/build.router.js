module.exports = function (app) {
    var Build = require('./build.controller');
    
    app.route('/v0/build').post(Build.create);
    app.route('/v0/build').get(Build.retrieve);
};