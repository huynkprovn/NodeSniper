NodeSniper
============

NodeSniper is a Pokemon Go sniper that allows you to catch Pokemon at specific coordinates without triggering a soft ban. It works by teleporting to the location of the pokemon, engaging it, teleporting back to your starting position, and then capturing it.

Planned Features
--------

- Snipe Pokemon at specific coordinates
- Only capture Pokemon above a certain CP
- View stats for your trainer
- View all of your Pokemon and their stats
- Execute batch operations on Pokemon, including transfer and evolve

Requirements
------------

- [node.js](https://nodejs.org)
- npm


Instructions
------------

- Run ```npm install``` 
- Edit ```config/config.json.example``` with your options and rename to ```config/config.json```
- Run ```node app.js```
- Open http://127.0.0.1:3000 in your browser
