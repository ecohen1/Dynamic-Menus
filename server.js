var express = require("express"),
    app = express(),
    mongoose = require("mongoose");

mongoose.connect("mongodb://nuit:nuitrules@ds011732.mlab.com:11732/nuit_users");
var User = {};
var db = mongoose.connection;
db.once('open', function() {

  var userSchema = mongoose.Schema({
    userName: String,
    userType: String
  });
  User = mongoose.model("User", userSchema);

  // var morty = new User({
  //   userName: 'morty',
  //   userType: 'faculty'
  // });
  //
  // morty.save(function(err,data){
  //   if (err) console.log(err);
  //   else console.log('Saved : ', data );
  // });
});

var menus = {
  "student": ["paint","the","rock"],
  "faculty": ["get","tenured","fast"],
  "staff": ["i","work","here"]
}

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get("/:userName",function(req,res){
  User.findOne({userName:req.params.userName},function(err, user){
    res.json({
      menu: menus[user.userType]
    });
  });
});

app.listen(3000);
console.log("listening at 3000");
