
var config = {
    apiKey: "AIzaSyBbMbgbOhn4V3ZK9lS62ZVWHOtM3DrpGrE",
    authDomain: "trainproject-42252.firebaseapp.com",
    databaseURL: "https://trainproject-42252.firebaseio.com",
    projectId: "trainproject-42252",
    storageBucket: "trainproject-42252.appspot.com",
    messagingSenderId: "169793941039"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();



  $(".button-submit").on("click", function(event){
  	event.preventDefault();


  	 var trainName = $("#userAddTrainName").val().trim();
  	 var destinationName = $("#userAddDestination").val().trim();
  	 var firstTrainTime= $("#firstTrainTime").val().trim();
  	 var frequency = $("#frequency-minutes").val().trim();

var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1,"years");
console.log(firstTimeConverted);

var currentTime= moment();
console.log("Current Time: " + moment(currentTime).format( "hh:mm"));

var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("Differen in time: " + diffTime);

var tRemainder = diffTime % frequency;
console.log(tRemainder);

var tMinutesTillTrain = frequency - tRemainder;
console.log("minutes till train: " + tMinutesTillTrain);

var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("arrival time: " + moment(nextTrain).format("hh:mm"));

var arrivalT =(moment(nextTrain).format("hh:mm"));

var newTrain = {
	name: trainName,
	destination: destinationName,
	firstTrainTime: firstTrainTime,
	frequency: frequency,
	arriving:arrivalT,
	minutesTill:tMinutesTillTrain,
	

};

database.ref().push(newTrain);


console.log(newTrain.name);
console.log(newTrain.destinationName);
console.log(newTrain.firstTrainTime);
console.log(newTrain.frequency);
  
	alert("Train added");

	$("#userAddTrainName").val("");
	$("#userAddDestination").val("");
	$("#firstTrainTime").val("");
	$("#frequency-minutes").val("");


  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey){

  	console.log(childSnapshot.val());

  	var trainName = childSnapshot.val().name;
  	var destinationName = childSnapshot.val().destination;
  	var firstTrainTime = childSnapshot.val().firstTrainTime;
  	var frequency = childSnapshot.val().frequency;
  	var arrivalT = childSnapshot.val().arriving;
  	var tMinutesTillTrain= childSnapshot.val().minutesTill;

  	console.log(trainName);
  	console.log(destinationName);
  	console.log(firstTrainTime);
  	console.log(frequency);

  	$("#train-name-table").append("<tr><td>" + trainName + "</td></tr>");
  	$("#destination-table").append("<tr><td>" + destinationName + "</td></tr>");
  	$("#frequency-table").append("<tr><td>" + frequency + "</td></tr>");
 		$("#arrival-table").append("<tr><td>" + arrivalT + "</tr</td");
		$("#minutes-away-table").append("<tr><td>"+ tMinutesTillTrain +"</tr</td");  
 
  });
   