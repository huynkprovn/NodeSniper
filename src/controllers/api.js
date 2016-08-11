var pogobuf = require('pogobuf'),
	POGOProtos = require('node-pogo-protos'),
	async = require('asyncawait/async'),
	await = require('asyncawait/await'),
	express = require('express');

module.exports = exports = function(client, config) {
	var router = express.Router();

	router.get('/scan', async (function(req, res) {
		var getPokemon = async (function(){
			try {
				if (req.query.lat === "" || req.query.lng === "") {
					throw new Error('lat or lng GET parameters are not set.');
				}
				var cellIDs = pogobuf.Utils.getCellIDs(req.query.lat, req.query.lng);
				var mapObjects = await (client.getMapObjects(cellIDs, Array(cellIDs.length).fill(0)));
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

	return router;
}
