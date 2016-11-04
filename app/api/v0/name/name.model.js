var ObjectId = require('mongodb').ObjectID;
var autoIncrement = require("mongodb-autoincrement");
var collection = "name";

module.exports.create = function(db, data, callback) {
  autoIncrement.getNextSequence(db, collection, function (err, id) {
      db.collection(collection).insertOne( {
          id:id,
          name            : data.name,
          sex            : data.sex,
          date            : new Date()
      }, function(err, result){
          module.exports.retrieve(db, function(err, result, status){
            callback(err, result, 201);
          });
      } );
  });
};

module.exports.createAll = function(db, data, callback) {
  db.collection(collection).insert(data, function(err, result){
    module.exports.retrieve(db, function(err, result, status){
      callback(err, result, 201);
    });
  });
};

module.exports.retrieve = function(db, callback) {
   var result = [];
   var cursor = db.collection(collection).find({},{
    name: true,
    sex: true,
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

module.exports.retrieveBySex = function(db, callback) {
   var result = {};
   var resultH = [];
   var resultM = [];
   var cursorH = db.collection(collection).find({sex:'H'},{
    name: true,
    sex: true,
    id: true,
    _id: false
   });

    var cursorM = db.collection(collection).find({sex:'M'},{
      name: true,
      sex: true,
      id: true,
      _id: false
     });
   cursorH.each(function(err, doc) {
      if (doc != null) {
          resultH.push(doc);
      } else {
         result.H = resultH;
         cursorM.each(function(err, doc) {
            if (doc != null) {
                resultM.push(doc);
            } else {
                result.M = resultM;
               callback(err, result, 200);
            }
         });

      }
   });
};

module.exports.detail = function(db, id, callback) {
   var result = {};
   var cursor = db.collection(collection).findOne({ id : id },
    {
      _id: false,
      id: true,
      name: true,
      sex: true
    },function(err, result){
      callback(err, result, 200);
    });
};

module.exports.update = function(db, id, data, callback) {
  db.collection(collection).updateOne(
        { id : id },
        {
          $set: {
            name : data.name,
            sex : data.sex
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