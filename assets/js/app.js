// Functions
function getOmdbData (title) {
  var queryURL = "http://www.omdbapi.com/?s=" + title + "&apikey=40e9cece";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function (response) {
    for (var i = 0; i<response.Search.length; i++) {
      $("#addMovie > tbody").append("<tr><td>" + response.Search[i].Title + "</td><td>"  + response.Search[i].Year + "</td><td>" + "<img src=" + response.Search[i].Poster + "></img>" + "</td></tr>");
    }
  })
} // end of getOmbData




function getNytData (title) {
  var reviewUrl = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=03e9ed8edb0944dbb5c1b7e983811b8b&query=" + title;
  $.ajax({
    url: reviewUrl,
    method: 'GET',
  }).done(function(result) {
    for (var i = 0; i < result.results.length; i++) {
      $("#addURL > tbody").append("<tr><td>" + result.results[i].link.suggested_link_text + "</td><td>" + "<a href='" + result.results[i].link.url + "'>" + result.results[i].link.url + "</a>" +   "</td></tr>");
    }
  })
}


function getYtData (title) {
  var youTubeUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+ title + " Trailer" + "&key=AIzaSyBFSTdHGhgwD7sUXEQ0UlXSKkro4SP3EnA";
  $.ajax({
    url: youTubeUrl,
    method: 'GET'
  }).done (function (response) {
    console.log(response);
    var results = response.items;
    console.log("results = " + results);
    for(var i = 0; i < results.length; i++) {
      console.log("iteration" + i);
      displayVideo(results[i], i);
    }
  });
}


function clearResults () {
  $("#movie-results").empty();
  $("#youtube-results").empty();
  $("#url-results").empty();
  $("#movie-input").empty();
}

function displayVideo (result, i) {
  var vid = document.createElement('div');
  vidId = 'vid' + i;
  vid.id = vidId;
  $("#youtube-results").append(vid);
  var player = new YT.Player(vidId, {
    height: '360',
    width: '480',
    videoId: result.id.videoId,
    // events: {
    //   'onReady': onPlayerReady
    // }
  });
}

function onPlayerReady(event) {
  var myId = event.target.
}


// Movie App
$("#find-movie").on("click", function(event) {
  event.preventDefault();
  clearResults();
  var movie = $("#movie-input").val().trim();
  getOmdbData (movie);
  getNytData (movie);
  getYtData(movie);
});



$("#clear-movie").on("click", function(event) {
  event.preventDefault();
  clearResults ();
});



