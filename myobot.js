var Myo = require("myo");
var five = require("johnny-five");
var Imp = require("imp-io");

var board = new five.Board({
  io: new Imp({
    agent: '9AWFP6_XInQH'
  })
});

board.on("ready", function() {

  console.log("Welcome to MyoBot!");
  console.log("Use a wave left gesture to go left; Use a wave right gesture to go right; Use a fist to stop; Use an open hand to go forward");

    var left_wheel  = new five.Servo({ pin: 5, type: 'continuous' }).stop();
    var right_wheel = new five.Servo({ pin: 7, type: 'continuous'  }).stop();

    var myMyo = Myo.create();

    myMyo.isLocked = false;

    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.setRawMode(true);


    myMyo.on('fingers_spread', function(edge){
      console.log("fingers spread - go forward");
      if(myMyo.isLocked || myMyo.isLocked == false) {
        myMyo.unlock();
        myMyo.vibrate();

        left_wheel.ccw();
        right_wheel.cw();
      }
    });

    myMyo.on('wave_out', function(edge){
      if(myMyo.isLocked || myMyo.isLocked == false) {
        console.log("waving right - move right");
        myMyo.vibrate();

        left_wheel.cw();
        right_wheel.cw();
      }
    });

    myMyo.on('wave_in', function(edge){
      console.log("waving left - move left");
      myMyo.vibrate();

      left_wheel.ccw();
      right_wheel.ccw();

    });

    myMyo.on('fist', function(edge){
      console.log("fist - stop");
      myMyo.vibrate();

      left_wheel.stop();
      right_wheel.stop();
    });

    //myMyo.on('fingers_spread', function(edge){
      //console.log("fingers spread - quit");
      //console.log('Quitting');
      //myMyo.vibrate();
      //process.exit();
    //});


});
