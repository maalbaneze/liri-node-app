// All npms installed (spotify, axios, moment, dotenv)

require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);