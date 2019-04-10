
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


$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    //user inputs
    var trainName = $("#trainName-input").val().trim();
    var destination = $("#dest-input").val().trim();
    var firstTrainTime = moment($("#firstTrainTime-input").val().trim(), "MM/DD/YYYY").format("X");
    var freq = $("#freq-input").val().trim();
    

    // first train time in militray time
    var firstTrainTime = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    //Capturing current time
    var currentTime = moment();

    //difference between input time and real time
    var timeDiff =  moment().diff(moment(firstTrainTime), "minutes");

    //Time apart
    var remainingTime = timeDiff % freq;

    // minutes until the next train arrives
    var minutesAway = freq - remainingTime;

    // next train
    var nextArrival = moment().add(minutesAway, "minutes");

    
    var newTrain = {
        name: trainName,
        dest: destination,
        firstTrain: firstTrainTime,
        frequency: freq
      };

      database.ref().push(newTrain);

      $("#trainName-input").val("");
      $("#dest-input").val("");
      $("#firstTrainTime-input").val("");
      $("#freq-input").val("");

});

