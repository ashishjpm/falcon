var appRouter = function(app) {
	var fs = require('fs');
	app.get("/getJsonData", function(req, res) {
		fs.readFile('server/resource/flightlist.json', function(err, data) {
            if (err) {
                res.send("err reading file: " + err);
            }
            else{
            	res.send(data.toString());
            }
        });
	});
}

module.exports = appRouter;