var express = require("express"),
    app = express();

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

app.get("/:userType",function(req,res){
  if (req.params.userType == "student"){
    res.json({
      "options": ["Paint the rock!"]
    });
  } else if (req.params.userType == "professor") {
    res.json({
      "options": ["How to be tenured"]
    });
  }
});

app.listen(3000);
console.log("listening at 3000");
