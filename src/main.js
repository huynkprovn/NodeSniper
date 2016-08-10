var pogobuf = require('pogobuf'),
    POGOProtos = require('node-pogo-protos'),
    bluebird = require('bluebird');

var configParser = require('../lib/configParser'),
	config = configParser.parse(require('./config/config'));

var service = config.auth.service === "google" ? new pogobuf.GoogleLogin() : new pogobuf.PTCLogin(),
    client = new pogobuf.Client();

service.login(config.auth.username, config.auth.password).then(token => {
    client.setAuthInfo(config.auth.service, token);
    client.setPosition(config.location.latitude, config.location.longitude);

    return client.init();
}).then(() => {
	console.log(' [+] Authenticated. Starting web server at http://127.0.0.1:3000');

	var express = require('express'),
		app = express();

	app.get('/snipe', function(req, res) {
		var cellIDs = pogobuf.Utils.getCellIDs(req.query.lat, req.query.lng);

		return bluebird.resolve(client.getMapObjects(cellIDs, Array(cellIDs.length).fill(0)))
			.then(mapObjects => {
			    return mapObjects.map_cells;
			})
			.then(cells => {
				var catchable_pokemons = [];
				for (var i in cells) {
					if (cells[i].catchable_pokemons.length > 0) {
						for (var j in cells[i].catchable_pokemons) {
							cells[i].catchable_pokemons[j].pokemon_name = pogobuf.Utils.getEnumKeyByValue(POGOProtos.Enums.PokemonId, cells[i].catchable_pokemons[j].pokemon_id);
							catchable_pokemons.push(cells[i].catchable_pokemons[j]);
						}
					}
				}
				return catchable_pokemons;
			})
			.then(catchable_pokemons => {
				res.status(200).json(catchable_pokemons);
			});
	});

   app.listen(3000);
});
