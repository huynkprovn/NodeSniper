NodeSniper ![node.js v6.3.1](https://img.shields.io/badge/node-v6.3.1-brightgreen.svg) ![Progress](https://img.shields.io/badge/progress-initial development-red.svg)
============

NodeSniper is a Pokemon Go sniper that allows you to catch Pokemon at specific coordinates without triggering a soft ban. It works by teleporting to the location of the pokemon, engaging it, teleporting back to your starting position, and then capturing it.

This is a pre-release codebase. Some features may not work as intended or at all. If you would like to help, please fork the repo and make any changes, then submit a [pull request](https://github.com/jgmcelwain/NodeSniper/pulls).

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

---

**Discalimer**: The use of this and other sniping tools is against the the game's Terms of Service. You are likely to get banned for using it, and it was only developed for research purposes.
