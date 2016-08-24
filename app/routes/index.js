'use strict';

var path = process.cwd();
var multer = require('multer');

/*var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path + '/tmp/uploads')
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now());
	}
})*/

// storing in memory as we have no use for persistent storage
var storage = multer.memoryStorage();

var upload = multer({ storage: storage });

module.exports = function (app) {
	app.route('/')
		.get(function(req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/upload')
		.post(upload.single('userFile'), function(req, res, next) {
			var metadata = {
				size: req.file.size
			};

			res.send(metadata);
		})
		.get(function(req, res) {
			res.sendFile(path + '/public/upload.html');
		});
};