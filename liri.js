// All npms were installed to project path (spotify, axios, moment, dotenv)
// Require dotenv early in code, as stated in dotenv documentation

require("dotenv").config();

var keys = require("./keys.js");
var request = require("request");

var Spotify = require("node-spotify-api");

//argv[2] chooses users actions; argv[3] is user input parameter(ex.; movie title)
var userAction = process.argv[2];
var userInput = process.argv[3];

//concatenate multiple words in 2nd user argument
for (var i = 4; i < process.argv.length; i++) {
    userInput += '+' + process.argv[i];
}

// Invoke the axios npm package
var axios = require("axios");

// Function for running a BandsInTown search - command is "concert-this"
var getConcert = function (artist) {

    // Loop through all the words in the node argument (i =2 is where the filename is in the command line argument)
    // And a for-loop to handle the inclusion of "+"s
    for (var i = 2; i < artist.length; i++) {

        if (i > 2 && i < artist.length) {
            artist = artist + "+" + artist[i];
        }
        //this will be met on the first iteration because i is not greater than 2
        else {
            //concatenate nodeArgs[i] with artist
            artist += artist[i];
        }
    }
    // Then run a request with axios to the BandsInTown API with the artist specified
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            console.log("Bands in Town data: ", response.data);
        }
    );
    var events = data.EventData.items;

    for (var i = 0; i < events.length; i++) {
        console.log(i);
        console.log("Venue name: " + EventData[i].VenueData.name);
        console.log("Location: " + EventData[i].VenueData.city.region.country);
        console.log("Date: " + EventData[i].datetime);
        console.log("-----------------------------------");
    };



    //Function for OMDB Movie info - command is "movie-this"
    function getMovie() {

        var movieName = userInput;
        // Then run a request to the OMDB API with the movie specified and use the trilogy API key
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

        request(queryUrl, function (error, response, body) {

            // If the request is successful = 200
            if (!error && response.statusCode === 200) {
                var body = JSON.parse(body);

                //Simultaneously output to console and log.txt via NPM simple-node-logger
                logOutput('================ Movie Info ================');
                logOutput("Title: " + body.Title);
                logOutput("Release Year: " + body.Year);
                logOutput("IMdB Rating: " + body.imdbRating);
                logOutput("Country: " + body.Country);
                logOutput("Language: " + body.Language);
                logOutput("Plot: " + body.Plot);
                logOutput("Actors: " + body.Actors);
                logOutput("Rotten Tomatoes Rating: " + body.Ratings[2].Value);
                logOutput("Rotten Tomatoes URL: " + body.tomatoURL);
                logOutput('==================THE END=================');

            } else {
                //else - throw as an error
                console.log("An error has occurred.")
            }
            //Response if the user does not type in a movie title
            if (movieName === "Mr. Nobody") {
                console.log("-----------------------");
                console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
                console.log("It's on Netflix!");
            }
        });
    }


    // Create a variable for referencing the Spotify keys in the keys.js file that points to the IDs in the .env file
    var spotify = new Spotify(keys.spotify);

    // Writes to the log.txt file
    var getArtistNames = function (artist) {
        return artist.name;
    };

    // Function for running a Spotify search - Command is spotify-this-song
    var getSpotify = function (songName) {
        if (songName === undefined) {
            songName = "I Want it That Way";
        }

        spotify.search(
            {
                type: "track",
                query: userAction
            },
            function (err, data) {
                if (err) {
                    console.log("The following error occurred: " + err);
                    return;
                }

                var songs = data.tracks.items;

                for (var i = 0; i < songs.length; i++) {
                    console.log(i);
                    console.log("artist(s): " + songs[i].artists.map(getArtistNames));
                    console.log("song name: " + songs[i].name);
                    console.log("preview song: " + songs[i].preview_url);
                    console.log("album: " + songs[i].album.name);
                    console.log("-----------------------------------");
                }
            }
        );
    };


    //Function for command do-what-it-says; reads and splits random.txt file
    //command is- "do-what-it-says"
    function doWhatItSays() {
        //Read random.txt file
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (!error);
            console.log(data.toString());
            //split text with comma delimiter
            var cmds = data.toString().split(',');
        });
    }

    //Options function for the four commands 
    function queryOptions(userAction) {

        //choose which statement (userAction) to switch to and execute
        switch (userAction) {

            case "concert-this":
                getConcert();
                break;

            case "spotify-this-song":
                getSpotify();
                break;

            case "movie-this":
                getMovie();
                break;

            case "do-what-it-says":
                doWhatItSays();
                break;
        }


        // fs is a core Node package for reading and writing files
        var fs = require("fs");

        // The code will store the contents of reading random.txt inside the variable "data"
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

        })
    };
    //Call queryOptions function
    queryOptions(userAction);
}
