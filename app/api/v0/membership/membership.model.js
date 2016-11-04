var ObjectId = require('mongodb').ObjectID;
var autoIncrement = require("mongodb-autoincrement");
var collection = "membership";

module.exports.create = function(db, data, callback) {
  autoIncrement.getNextSequence(db, collection, function (err, id) {
      db.collection(collection).insertOne( {
          id              : id,
          user            : data.user,
          pass            : data.pass,
          name            : data.name,
          tocken          : '',
          status          : { active : true, description: "Active"},
          date            : new Date()
      }, function(err, result){
          module.exports.detail(db, id, function(err, result, status){
            callback(err, result, 201);
          });
      } );
  });
};

module.exports.retrieve = function(db, callback) {
   var result = [];
   var cursor = db.collection(collection).find({},{
    user: true,
    pass: true,
    name: true,
    tocken: true,
    status: true,
    id: true,
    _id: false
   });
   cursor.each(function(err, doc) {
      if (doc != null) {
          result.push(doc);
      } else {
         callback(err, result, 200);
      }
   });
};

module.exports.detail = function(db, id, callback) {
   var result = {};
   var cursor = db.collection(collection).findOne({ id : id },
    {
      user: true,
      pass: true,
      name: true,
      tocken: true,
      status: true,
      id: true,
      _id: false
    },function(err, result){
      callback(err, result, 200);
    });
};

module.exports.update = function(db, id, data, callback) {
  db.collection(collection).updateOne(
        { id : id },
        {
          $set: {
            user            : data.user,
            pass            : data.pass,
            name            : data.name
          },
          $currentDate: { "lastModified": true }
        },function(err, results) {
          module.exports.detail(db, id, function(err, result, status){
            callback(err, result, status);
          });
        }
    );
};

module.exports.delete = function(db, id, callback) {
  module.exports.detail(db, id, function(err, result, status){
      db.collection(collection).deleteMany(
        { id : id },
        function(err, results) {
            callback(err, result, status);
        }
    );
  });
   
};


module.exports.login = function(db, user, callback) {
   var result = false;
   var cursor = db.collection(collection).findOne({ user : user.user , pass : user.pass},
    {
      user: true,
      name: true,
      tocken: true,
      status: true,
      id: true,
      _id: false
    },function(err, result){
      callback(err, result, 200);
    });
};