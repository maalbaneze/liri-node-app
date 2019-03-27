// All npms were installed to project path (spotify, axios, moment, dotenv)
// Require dotenv early in code as stated in dotenv documentation

require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);




// Include the axios npm package
var axios = require("axios");

// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument (i =2 is where the filename is in the command line argument)
// And a for-loop to handle the inclusion of "+"s
for (var i = 2; i < nodeArgs.length; i++) {

    if (i > 2 && i < nodeArgs.length) {
        movieName = movieName + "+" + nodeArgs[i];
    }
    //this will be met on the first iteration because i is not greater than 2
    else {
        //concatenate nodeArgs[i] with movieName
        movieName += nodeArgs[i];
    }
}

// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
    function (response) {
        console.log("Movie data: ", response.data);
    }
);

// fs is a core Node package for reading and writing files
var fs = require("fs");

// The code will store the contents of the reading inside the variable "data"
fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
        return console.log(error);
    }

    // We will then print the contents of data
    console.log(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(", ");

    // We will then re-display the content as an array for later use.
    console.log(dataArr);

});