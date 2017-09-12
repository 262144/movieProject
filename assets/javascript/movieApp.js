//global var

movieSearch = null;
$("#movie-poster").hide();
$("#movie-review").hide();
$("#movie-trailer").hide();


// Functions
function getOmdbData(title) {
    // var queryURL = "http://www.omdbapi.com/?s=" + title + "&apikey=40e9cece";
    var queryURL = "https://api.themoviedb.org/3/search/movie?" + "&query=" + title + "&api_key=d53b802d30d38d0bf73c24dabc4a5c8d";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        // console.log(response.Search); old call
        console.log(response.results);
        console.log(response);
        // for (var i = 0; i < response.Search.length; i++) {
        //     $("#addMovie > tbody").append("<tr><td>" + response.Search[i].Title + "</td><td>" + response.Search[i].Year + "</td><td>" + "<img src=" + response.Search[i].Poster + "></img>" + "</td></tr>");
        // }

        for (var i = 0; i < response.results.length; i++) {
            $("#addMovie > tbody").append("<tr><td>" +
                response.results[i].title + "</td><td>" +
                response.results[i].release_date + "</td><td>" + "<img class='poster-click' src= https://image.tmdb.org/t/p/w185/" +
                response.results[i].poster_path + "></img>" + "</td></tr>");
        }
    })
} // end of getOmbData




function getNytData(title) {
    var reviewUrl = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=03e9ed8edb0944dbb5c1b7e983811b8b&query=" + title;
    $.ajax({
        url: reviewUrl,
        method: 'GET',
    }).done(function(result) {
        for (var i = 0; i < result.results.length; i++) {
            $("#addURL > tbody").append("<tr><td>" + result.results[i].link.suggested_link_text + "</td><td>" + "<a href='" + result.results[i].link.url + "'>" + result.results[i].link.url + "</a>" + "</td></tr>");
        }
    })
}


function getYtData(title) {
    var youTubeUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + title + " Trailer" + "&key=AIzaSyBFSTdHGhgwD7sUXEQ0UlXSKkro4SP3EnA";
    $.ajax({
        url: youTubeUrl,
        method: 'GET',
        maxResults: '2'
    }).done(function(response) {
        // console.log(response);
        var results = response.items;
        // console.log("results = " + results);
        for (var i = 0; i < results.length; i++) {
            displayVideo(results[i], i);
        }
    });
}


function clearResults() {
    $("#movie-results").empty();
    $("#youtube-results").empty();
    $("#url-results").empty();
    //rehide divs
    $("#movie-poster").hide();
    $("#movie-review").hide();
    $("#movie-trailer").hide();

}

function displayVideo(result, i) {
    var vid = document.createElement('div');
    vidId = 'vid' + i;
    vid.id = vidId;
    $("#youtube-results").append(vid);
    var player = new YT.Player(vidId, {
        height: '360',
        width: '480',
        videoId: result.id.videoId,
        events: {
            'onReady': onPlayerReady
        }
    });

    function onPlayerReady(e) {
        var myId = e.target.a.id;
        var duration = e.target.getDuration();
        if (duration === 0) {
            // console.log('Video ' + myId + ' cannot be played, so it was deleted.');
            $("#youtube-results").empty(e.target.a);
        } else {
            var myId = e.target.a.id;
            // console.log('Video ' + myId + ' ready to play.');
        }
    }
}



// Movie App

$("#movie-form").submit(function(event) {
    // $("#find-movie").submit(function(event) {
    // var movie = $("#movie-input").val().trim();

    input = $("#movie-input").val().trim();
    // not using autocomplete result
    if (input != '' && movieSearch == null) {
        event.preventDefault();
        clearResults();
        var movie = $("#movie-input").val().trim();
        console.log(movie + " this is the 'movie' var");
        console.log(movie);
        getOmdbData(movie);
        getNytData(movie);
        getYtData(movie);
        $('.ui-menu').hide(); // hide autocomplete options

        $("#movie-poster").show();
        movieSearch = null;
        // if were are using the autcomplete recommendation
    } else if (movieSearch != null) {
        event.preventDefault();
        clearResults();
        var movie = window.movieSearch;
        console.log(movie + " else if");
        getOmdbData(movie);
        getNytData(movie);
        getYtData(movie);

        $("#movie-poster").show();
        movieSearch = null; // reset var

    } else {
        console.log("do nothing");
    }

    //show divs

    // $("#movie-poster").show();
    // resetSearch();


});



$("#clear-movie").click("click", function(event) {
    event.preventDefault();
    clearResults();
    resetSearch();
    movieSearch = null;
    //clear input box
    $("input[type=text], textarea").val("");
});

// UI onload Hide  divs



//parsly

$(function() {
    var getAjax = function(request, response) {
        // var objects = {};
        var getTitle = "https://api.themoviedb.org/3/search/movie?" + "&query=" + request.term + "&api_key=d53b802d30d38d0bf73c24dabc4a5c8d";
        $.ajax({
            url: getTitle,
            method: 'GET',
        }).done(function(data) {

            // use map to format as JQuery autocomplete expects
            response($.map(data.results, function(item) {
                return {
                    label: item.title,
                    value: item.name
                }
            }));
        })

    }

    var selectItem = function(event, ui) {
        event.preventDefault() //
        $("#movie-input").val(ui.item.value);
        console.log(ui.item.value);
        window.movieSearch = ui.item.value;
        console.log(window.movieSearch);
        // getOmdbData(window.movieSearch);
        return false;
    }

    $("#movie-input").autocomplete({
        source: getAjax,
        // source: ['goodfellas','test2','test3'],
        // select: selectItem,
        select: function(event, ui) {
            $("#movie-input").val(ui.item.value);
            movieSearch = ui.item.value;
            // console.log(movieSearch);
            $("#movie-form").submit(); // submit form on selection - mouse or enter key

        },
        minLength: 2,
        change: function() {
            $("#movie-input").val("").css("display", 2);

            // movieSearch = this.select;
            // console.log(this.select);
            // getOmdbData(selectItem);
        }
    });
});


function resetSearch() {
    movieSearch = '';

}


function getSearchTerm() {

    // determin to use autocomplet or not




}

$("#movie-form").validate();

//

// document.getElementById("#movie-input").addEventListener('keypress', function(event) {
//         if (event.keyCode == 13) {
//             event.preventDefault();
//         }
//     });