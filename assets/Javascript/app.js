$("document").on("click", function () {
    // Firebase config
    var firebaseConfig = {
        apiKey: "AIzaSyAbgYdGpmgiBai66qKi4a-e8r1pioS-JFc",
        authDomain: "train-scheduler-fec7c.firebaseapp.com",
        databaseURL: "https://train-scheduler-fec7c.firebaseio.com",
        projectId: "train-scheduler-fec7c",
        storageBucket: "train-scheduler-fec7c.appspot.com",
        messagingSenderId: "972134661503",
        appId: "1:972134661503:web:0c3c8d20a87420bb"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Create a variable to reference the database
    var database = firebase.database();

    // Capture user inputs and store them into variables
    var stationName = " ";
    var startTime = " ";
    var trainFrequency = 0;

    // add a time format variable that handles first train time inputs
    var timeFormat = "HH:MM A"

    // on click event to search
    $("#search").on("click", function (event) {
        // prevent page from refreshing itself
        event.preventDefault();

        // Capture user inputs and store them in variables
        stationName = $("#name").val().trim();
        startTime = $("#time").val().trim();
        trainFrequency = $("#frequency").val().trim();

        console.log(stationName);
        console.log(startTime);
        console.log(trainFrequency);

    });
    
    // capture "first train time" input
    // store in time format
    // display in time format
    // push data to the database
    // Firebase watcher .on("child_added"
    // storing the snapshot.val() in a variable for convenience
    // initialize variables for calculated display values
    // minutes away is the difference in time between next arrival time and current time
    // this diff function takes the current time (moment()) and calculates the diff
    // btw it and the first train time, formatted using our time format
    // create a variable to hold the next arrival
    // populate HTML elements
    // Handle the errors

});