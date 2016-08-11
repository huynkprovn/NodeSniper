var pogobuf = require('pogobuf'),
	async = require('asyncawait/async'),
	await = require('asyncawait/await'),
	configParser = require('../lib/configParser'),
	express = require('express');
 
var NodeSniper = async (function() {
	var config = configParser.parse(require('./config/config'));

	var service = config.auth.service === "google" ? new pogobuf.GoogleLogin() : new pogobuf.PTCLogin(),
		client = new pogobuf.Client();

	var token = await (service.login(config.auth.username, config.auth.password));
	client.setAuthInfo(config.auth.service, token);
	client.setPosition(config.location.latitude, config.location.longitude);
	client.init();

	var app = express();

	app.use('/api', require('./controllers/api')(client, config));

	app.listen(3000);
}).call(this);
