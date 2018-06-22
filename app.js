var express = require('express'),
	app = express(),
	pjson = require('./package.json'),
	open = require('open'),
    port = process.argv[2] || 3012;

app.use(express.static(__dirname + '/'));

var routes = require("./server/router/routes.js")(app);

app.listen(port, function () {
    console.log('Running falcon@ '+pjson.version+' version on port '+ port);
    open('http://127.0.0.1:'+port+'/#!/login', function (err) {});
});