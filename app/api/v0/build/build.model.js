var $scope = {};
    
var getID = function(){
    var id = $scope.baseAddress.section;
    var sectionLength = 13 - $scope.baseAddress.section.length;

    for(var i = 0; i < sectionLength; i++){
        id += Math.floor((Math.random() * 9) + 1);
    }
    
    return id;
};

var getSecondCons = function(word){
    var wordLength = word.length;

    for(var i = 1; i < wordLength; i++){
        var character = word.substring(i, (i + 1));
        if(character != 'A' && character != 'E' && character != 'I' && character != 'O' && character != 'U' ){
            return character;
        }
    }
    return 'ERROR: Appellido Invalido';
};


var getSecondVoc = function(word){
    var wordLength = word.length;

    for(var i = 1; i < wordLength; i++){
        var character = word.substring(i, (i + 1));
        if(character == 'A' || character == 'E' || character == 'I' || character == 'O' || character == 'U' ){
            return character;
        }
    }
    return 'ERROR: Appellido Invalido';
};

var prepareString = function(){
            
    // $scope.baseAddress.state   = JSON.parse($scope.baseAddress.state);
    // $scope.baseAddress.localN = JSON.parse($scope.baseAddress.localN);
    //$scope.sex                 = JSON.parse($scope.sex);

    //$scope.nameUp = $scope.name.toUpperCase();
    $scope.lastName1 = $scope.lastName1.toUpperCase();
    $scope.lastName2 = $scope.lastName2.toUpperCase();
    $scope.name = $scope.name.toUpperCase();
    $scope.street = $scope.street.toUpperCase()
    $scope.baseAddress.local = $scope.baseAddress.local.toUpperCase();
    $scope.baseAddress.del = $scope.baseAddress.del.toUpperCase();

    // $scope.lastNameUp = $scope.lastNameUp.trim()
    // var n = $scope.lastNameUp.indexOf(" ");
    // $scope.lastName1 = $scope.lastNameUp.substring(0,n)
    // $scope.lastName2 = $scope.lastNameUp.substring(n+1,$scope.lastNameUp.length)
};

var getCURP = function(){
    var curp = "";

    curp += $scope.lastName1.substring(0,1);
    curp += getSecondVoc($scope.lastName1)
    curp += $scope.lastName2.substring(0,1);
    curp += $scope.name.substring(0,1);
    curp += $scope.birthdate.year;
    curp += $scope.birthdate.month;
    curp += $scope.birthdate.day;
    curp += $scope.sex;
    curp += $scope.baseAddress.state.id;
    curp += getSecondCons($scope.lastName1);
    curp += getSecondCons($scope.lastName2);
    curp += getSecondCons($scope.name);
    curp += "0"+ Math.floor((Math.random() * 9) + 1);

    return curp.toUpperCase();
};

var getFolioIFE = function(){
    var folioIFE = "";

    folioIFE += $scope.lastName1.substring(0,1);
    folioIFE += $scope.lastName1.substring(2,3);
    folioIFE += $scope.lastName2.substring(0,1);
    folioIFE += $scope.lastName2.substring(2,3);
    folioIFE += $scope.name.substring(0,1);
    folioIFE += $scope.name.substring(2,3);
    folioIFE += $scope.birthdate.year;
    folioIFE += $scope.birthdate.month;
    folioIFE += $scope.birthdate.day;
    folioIFE += $scope.baseAddress.state.no;
    folioIFE += $scope.sex;
    folioIFE += Math.floor((Math.random() * 9) + 1) + ""+
                Math.floor((Math.random() * 9) + 1) + ""+
                Math.floor((Math.random() * 9) + 1);

    return folioIFE.toUpperCase();
};

var getFolio = function(){
    var folio = "";
    folio += "000" +
    Math.floor((Math.random() * 9) + 1) + ""+
    Math.floor((Math.random() * 9) + 1) + ""+
    Math.floor((Math.random() * 9) + 1) + ""+
    Math.floor((Math.random() * 9) + 1) + ""+
    Math.floor((Math.random() * 9) + 1) + ""+
    Math.floor((Math.random() * 9) + 1) + ""+
    Math.floor((Math.random() * 9) + 1) + ""+
    Math.floor((Math.random() * 9) + 1) + ""+
    Math.floor((Math.random() * 9) + 1) + ""+
    Math.floor((Math.random() * 9) + 1);

    return folio;
};


var factory = function(body){
  var d   = new Date();
    start   = d.getMilliseconds();
    and   = 0;
    data  = {};

    console.log('\nuser.controller > create()');
    console.log('············································································'+d);
    console.log('   D A T A B A S E');
    console.log('Schema:  sefi.build()');
    console.log('>>> Data Request');
    console.log(body);
    
    $scope = body;
    prepareString();

    $scope.birthdate.month = Math.floor(Math.random() * 11 + 1);
    $scope.birthdate.month = $scope.birthdate.month < 10 ? "0" + $scope.birthdate.month : $scope.birthdate.month;
    $scope.birthdate.day = Math.floor(Math.random() * 28 + 1);
    $scope.birthdate.day = $scope.birthdate.day < 10 ? "0" + $scope.birthdate.day : $scope.birthdate.day;
    $scope.birthdate.year = (2010-(Number($scope.old) + 5)) - 1900;

    data.name        = $scope.name;
    data.lastName1   = $scope.lastName1;
    data.lastName2   = $scope.lastName2;
    data.birthdate   = $scope.birthdate.day + '/' + $scope.birthdate.month + '/'+$scope.birthdate.year;
    data.old         = $scope.old;
    data.no          = $scope.baseAddress.state.no;
    data.local       = $scope.baseAddress.local;
    data.del         = $scope.baseAddress.del;
    // data.localN      = $scope.baseAddress.localN;
    // data.localN      = $scope.baseAddress.localN.id;
    data.localN      = "001";
    // data.delN        = $scope.baseAddress.delN;
    // data.delN        = "012";
    data.delN        = $scope.baseAddress.localN.id;
    data.cp          = $scope.baseAddress.cp;
    data.section     = $scope.baseAddress.section;
    data.registerYear= (Number($scope.birthdate.year) + 1918) + ' 00';
    data.sex         = $scope.sex.id;
    data.picture     = $scope.picture;
    data.pictureSign = $scope.pictureSign;

    data.address1    = $scope.street +" "+Math.floor(Math.random() * 9999);
    data.address2    = $scope.baseAddress.local + ' \t ' + $scope.baseAddress.cp;
    data.address3    = $scope.baseAddress.del+', '+$scope.baseAddress.state.id+'.';

    data.curp     = getCURP();
    data.folioIFE = getFolioIFE();
    data.folio    = getFolio();
    data.ID       = getID();

    return data;
};

var shuffle = function(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}

var fillData = function(peopleList, nameListBySex, lastNameList, data){
  var result = [];
  var nameH = shuffle(nameListBySex.H);
  var nameM = shuffle(nameListBySex.M);
  var lastNameList1 = shuffle(JSON.parse(JSON.stringify(lastNameList)));
  var lastNameList2 = shuffle(JSON.parse(JSON.stringify(lastNameList)));
  console.log("lastNameList1");
  console.log(lastNameList1);
  peopleList = shuffle(peopleList);
 
  var ih=0;
  var im=0;
  for(var i = 0; i < data.dataLength; i++){
    var dataTemp = JSON.parse(JSON.stringify(data));
    dataTemp.name = peopleList[i].sex === 'h' ? nameH[ih++].name : nameM[im++].name;
    dataTemp.lastName1 = lastNameList1[i].lastname;
    dataTemp.lastName2 = lastNameList2[i].lastname;
    dataTemp.sex = peopleList[i].sex;
    dataTemp.old = peopleList[i].old;
    dataTemp.picture = 'assets/img/pictures/'+peopleList[i].old+'-'+peopleList[i].sex+'/'+peopleList[i].index+'-'+peopleList[i].old+'-'+peopleList[i].sex+'.bmp';
    dataTemp.pictureSign = 'assets/img/sign/'+ Math.floor(Math.random() * 9)+'.jpg';
    dataTemp.picture = dataTemp.picture.toLowerCase();
    dataTemp.pictureSign = dataTemp.pictureSign.toLowerCase();
    dataTemp.street = dataTemp.streets[ Math.floor(Math.random() * dataTemp.streets.length)];
    dataTemp.birthdate = {};
    var buldTemp = JSON.parse(JSON.stringify(factory(dataTemp)));
    buldTemp.date = new Date();
    result.push(buldTemp);  
  }
  
  return result;
};

var PeopleModel  = require('../people/people.model'),
    NameModel  = require('../name/name.model'),
    LastNameModel  = require('../last-name/last-name.model');
    var collection = "build";

module.exports.create = function(db, data, callback) {

  PeopleModel.retrieve(db, function(err, peopleList, status){
    NameModel.retrieveBySex(db, function(err, nameListBySex, status){
      LastNameModel.retrieve(db, function(err, lastNameList, status){
        var results = fillData(peopleList, nameListBySex, lastNameList, data);
        db.collection(collection).insert(results, function(err, result){
            var r = {r:results}
            callback(err, r, 200);
        });
      });
    });
  });
  
};


module.exports.retrieve = function(db, callback) {
   var result = [];
   var cursor = db.collection(collection).find({});
   cursor.each(function(err, doc) {
      if (doc != null) {
          result.push(doc);
      } else {
         callback(err, result, 200);
      }
   });
};