// firebase shit


var config = {
    apiKey: "AIzaSyASq3cZk_uOFtQ9TGM038awUQdTwdKwXuU",
    authDomain: "hw-train.firebaseapp.com",
    databaseURL: "https://hw-train.firebaseio.com",
    projectId: "hw-train",
    storageBucket: "hw-train.appspot.com",
    messagingSenderId: "279801992988"
};


firebase.initializeApp(config);

var database = firebase.database();

// Initial Values
var trainName = "";
var trainDest = "";
var trainTime = 0;
var trainFreq = 0;

// Capture Button Click
$("#add-train").on("click", function(event) {
    event.preventDefault();
    // alert("button clicked");
    // Grabbed values from text boxes
    trainName = $("#train-name").val().trim(); //
    trainDest = $("#train-destination").val().trim();
    trainTime = $("#train-time").val().trim();
    trainFreq = $("#train-freq").val().trim();

    console.log(trainName);
    console.log(trainDest);

    // Code for handling the push
    database.ref().push({
        trainName: trainName,
        trainDest: trainDest,
        trainTime: trainTime,
        trainFreq: trainFreq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    //update table





});

// Create Firebase "watcher" Hint: .on("value")
// database.ref().on("value", function(snapshot) {
// database.ref().on("child_added", function(snapshot) {

//  // console.log(snapshot.val());
//  var test = snapshot.val();

//  // for (var i = test.length - 1; i >= 0; i--) {
//  //  console.log(test[i]);
//  // }

//  for (var i = 0; i < test.length; i++) {
//      console.log(i);
//  }
// });

// database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {


    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.trainName);
    console.log(sv.trainDest);
    console.log(sv.trainTime);
    console.log(sv.trainFreq);




    // console.log(snapshot.val());
    // console.log(snapshot.val().name);
    // console.log(snapshot.val().role);
    // console.log(snapshot.val().sdate);
    // console.log(snapshot.val().rate);

    // change html to reflect the user input
    // $("#employeeName").html(sv.name);
    // $("#role").html(sv.role);
    // $("#startDate").html(sv.sdate);
    // $("#monthyRate").html(sv.rate);

    // $("#employeeName").append(sv.name);
    // $("#role").html(sv.role);
    // $("#startDate").html(sv.sdate);
    // $("#monthyRate").html(sv.rate);

    var content = '';
    content += '<tr>';
    content += '<td>' + sv.trainName + '</td>';
    content += '<td>' + sv.trainDest + '</td>';
    content += '<td>' + sv.trainFreq + '</td>';
    content += '<td>' + getCurrentTime() + '</td>';
    content += '<td>' + getNextTrain(sv.trainTime, sv.trainFreq) + '</td>';
    content += '</tr>';
    // });
    $('#myTable').append(content);


}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


//function to populate row

// $.each(val, function(i, item) {

//        tr = $('<tr>').append('<td>' + (sv.name) + '</td>' + 
//                              '<td>' + (sv.role) + '</td>');

//        $("#scalaapi").append(tr);
//   });

// database.ref().once('value', function(snapshot){
//     if(snapshot.exists()){
//         var content = '';
//         snapshot.forEach(function(data){
//             var val = data.val();
//             content +='<tr>';
//             content += '<td>' + val.descripcion + '</td>';
//             content += '<td>' + val.direccion + '</td>';
//             content += '<td>' + val.estado + '</td>';
//             content += '<td>' + val.imagen + '</td>';
//             content += '<td>' + val.tipo + '</td>';
//             content += '<td>' + val.udisplayName + '</td>';
//             content += '<td>' + val.uemail + '</td>';
//             content += '</tr>';
//         });
//         $('#ex-table').append(content);
//     }
// });

function getCurrentTime() {
    var timeNow = moment();
    var timeFormat = "MM/DD/YYYY";
    var nowTimeFormat = moment(timeNow, timeFormat);
    var timeCurrentHour = nowTimeFormat.format("hh:mm:ss"); //  parse for current time in hour:minute:second format
    // console.log(timeCurrentHour);

    return timeCurrentHour;


};

function getNextTrain(firstTrain, freq) {

    //  current time - start time / freq  leftover = minutes left

    var timeNow = firstTrain;
    var timeFormat = "MM/DD/YYYY";
    var nowTimeFormat = moment(timeNow, timeFormat);
    var timeCurrentHour = nowTimeFormat.format("hh:mm:ss");
    console.log(timeCurrentHour);



    var current = getCurrentTime(); // current time in
    console.log("current " + current);
    console.log("first " + this.timeNow);


    var nextTrain = ((current - timeNow) % freq);

    console.log("nextTrain " + nextTrain);
    console.log("freq " + freq);
    console.log("firstTrain " + firstTrain);
    // var freqMin = 

    return nextTrain;
    console.log(nextTrain);

};

//time stuff

// var poop = moment(getCurrentTime());
// var startTime = moment("01:44:45");
// var diff = getCurrentTime().diff()

// poop.diff(randomTime);
// console.log(startTime.diff(moment(), "minutes"));
// console.log(convertedDate.diff(moment(), "minutes"));