
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCjOG8Tg8UPVFxw2h8LSeh338E2TePgyGc",
    authDomain: "train-scheduler-6159b.firebaseapp.com",
    databaseURL: "https://train-scheduler-6159b.firebaseio.com",
    projectId: "train-scheduler-6159b",
    storageBucket: "train-scheduler-6159b.appspot.com",
    messagingSenderId: "354979455022"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


$("#train-btn").on("click", function (event) {
    event.preventDefault();
   console.log("vfd");
   
    //user inputs
    var trainName = $("#trainName-input").val().trim();
    var destination = $("#dest-input").val().trim();
    var firstTrainTime = $("#firstTrainTime-input").val().trim();
    // var firstTrainTime = moment($("#firstTrainTime-input").val().trim(), "MM/DD/YYYY").format("X");
    var freq = $("#freq-input").val().trim();
  

    
    var newTrain = {
        name: trainName,
        dest: destination,
        firstTrain: firstTrainTime,
        frequency: freq
      };
      console.log(newTrain);
      

      database.ref().push(newTrain);

      $("#trainName-input").val("");
      $("#dest-input").val("");
      $("#firstTrainTime-input").val("");
      $("#freq-input").val("");

});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destin = childSnapshot.val().dest;
  var firstTrain = childSnapshot.val().firstTrain;
  var timeFreq = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(destin);
  console.log(firstTrain);
  console.log(timeFreq);

  // // first train time in militray time
    var convertedTime = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log({convertedTime});
    
    //Capturing current time
    //var currentTime = moment();

    //difference between input time and real time
    var timeDiff =  moment().diff(moment(convertedTime), "minutes");
    console.log({timeDiff});
    
    //Time apart
    var remainingTime = timeDiff % timeFreq;
    console.log(remainingTime);
    
    // minutes until the next train arrives
    var minutesAway = timeFreq - remainingTime;
    console.log(minutesAway);
    
    // next train
    var nextArrival = moment().add(minutesAway, "minutes");
    console.log(nextArrival);
    

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destin),
    //$("<td>").text(firstTrain),
    $("<td>").text(timeFreq),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway),
   
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
