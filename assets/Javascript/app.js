$("document").ready(function () {
  //Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyAbgYdGpmgiBai66qKi4a-e8r1pioS-JFc",
    authDomain: "train-scheduler-fec7c.firebaseapp.com",
    databaseURL: "https://train-scheduler-fec7c.firebaseio.com",
    projectId: "train-scheduler-fec7c",
    storageBucket: "train-scheduler-fec7c.appspot.com",
    messagingSenderId: "972134661503",
    appId: "1:972134661503:web:0c3c8d20a87420bb"
  };

  //Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //Create a variable to reference the database
  var database = firebase.database();

  //Capture user inputs and store them into variables
  var stationName = "";
  var startTime = "";
  var trainFrequency = 0;

  //add a time format variable that handles first train time inputs
  var timeFormat = "hh:mm";

  //on click event to search
  $("#search").on("click", function (event) {
    //prevent page from refreshing itself
    event.preventDefault();

    //Capture user inputs and store them in variables
    stationName = $("#name").val().trim();
    startTime = $("#time").val().trim();
    trainFrequency = $("#frequency").val().trim();

    //format time input to hours:minutes
    startTime = moment(startTime, timeFormat).format(timeFormat);

    //push data to the database
    database.ref().push({
      stationName: stationName,
      startTime: startTime,
      trainFrequency: trainFrequency,
      timeAdded: firebase.database.ServerValue.TIMESTAMP
    });

  });

  //Firebase watcher .on("child_added"
  database.ref().on("child_added", function (snapshot) {

    //reset form
    $("#trainForm").trigger("reset");

    //storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    //initialize variables for calculated display values
    var minutesAway = '';
    var nextArrival = '';

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(sv.startTime, "hh:mm").subtract(1, "years");

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), 'minutes');

    // Time apart (remainder)
    var tRemainder = diffTime % sv.trainFrequency;

    // Minute Until Train
    var minutesAway = sv.trainFrequency - tRemainder;

    // Next Train
    var nextArrival = moment().add(minutesAway, "minutes");

    //create row
    var row = $("<tr>");
    //create header row
    var rowHeader = $("<th scope='row'>");
    //add header to row
    row.append(rowHeader);

    //populater header with station name
    rowHeader.text(sv.stationName);

    //add columns for other elements
    var col1 = $("<td class='frequency-display'>");
    var col2 = $("<td class='next-display'>");
    var col3 = $("<td class='away-display'>");

    //add cotent for other elements
    rowHeader.text(sv.stationName);
    col1.text(sv.trainFrequency);
    col2.text(nextArrival.format("h:mm A"));
    col3.text(minutesAway);

    //add columns to rows
    row.append(col1);
    row.append(col2);
    row.append(col3);

    //push to the html
    $("#displayResults").append(row);

    //Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

});