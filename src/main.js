var pogobuf = require('pogobuf'),
	POGOProtos = require('node-pogo-protos'),
	bluebird = require('bluebird'),
	async = require('asyncawait/async'),
	await = require('asyncawait/await');
 
var NodeSniper = async (function() {
	var configParser = require('../lib/configParser'),
		config = configParser.parse(require('./config/config'));

	var service = config.auth.service === "google" ? new pogobuf.GoogleLogin() : new pogobuf.PTCLogin(),
		client = new pogobuf.Client();

	var token = await (service.login(config.auth.username, config.auth.password));
	client.setAuthInfo(config.auth.service, token);
	client.setPosition(config.location.latitude, config.location.longitude);
	client.init();

	var express = require('express'),
		app = express();

	app.get('/scan', async (function(req, res) {
		var getPokemon = async (function(){
			try {
				if (req.query.lat === "" || req.query.lng === "") {
					throw new Error('lat or lng GET parameters are not set.');
				}
				var cellIDs = pogobuf.Utils.getCellIDs(req.query.lat, req.query.lng);
				var mapObjects = await (bluebird.resolve(client.getMapObjects(cellIDs, Array(cellIDs.length).fill(0))));
				var cells = mapObjects.map_cells;

				var pokemons = [];
				for (var i in cells) {
					if (cells[i].catchable_pokemons.length > 0) {
						for (var j in cells[i].catchable_pokemons) {
							cells[i].catchable_pokemons[j].pokemon_name = pogobuf.Utils.getEnumKeyByValue(POGOProtos.Enums.PokemonId, cells[i].catchable_pokemons[j].pokemon_id);
							pokemons.push(cells[i].catchable_pokemons[j]);
						}
					}
				}

				return { statusCode: 200, data: pokemons };
			}
			catch (err) {
				return { statusCode: 500, data: { errorMessage: err.message } };
			}
		});
		
		var response = await (getPokemon());
		res.status(response.statusCode).json(response);
	}));

	app.listen(3000);
}).call(this);
