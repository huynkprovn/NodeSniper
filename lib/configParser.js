var configParser = {
	parse: function(rawConfig) {
		var config = {
			"auth": {
				"service": rawConfig.auth.service,
				"username": rawConfig.auth.username,
				"password": rawConfig.auth.password
			},
			"location": {
				"latitude": parseFloat(rawConfig.location.latitude),
				"longitude": parseFloat(rawConfig.location.longitude)
			}
		};

		return config;
	}
};

module.exports = exports = configParser;
