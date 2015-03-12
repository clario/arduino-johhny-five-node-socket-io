var five = require("johnny-five");
var app = require('http').createServer();
var io = require('socket.io')(app);

app.listen(9582);


var board = new five.Board();
var servo;
var servo2;
var led;

board.on("ready", function() {
  servo = new five.Servo(10);
  servo2 = new five.Servo(9);


servo.currentPosition = servo.startAt;
servo2.currentPosition = servo2.startAt;


  // Add servo to REPL (optional)
//servo2.sweep([30,160]); //NOT LASER
//servo.sweep([10, 80]);  //LASER

led = new five.Led(11);
 led.on();
  this.repl.inject({
    laser: led,
    servo: servo,
    servo2: servo2
  });

});


var changeAngle = 2;


io.on('connection', function (socket) {
 
  socket.on('laserOn', function (data) {
   led.on();
    
  });

   socket.on('laserOff', function (data) {
   led.off();
    
  });

   //Left
   socket.on('laserLeft', function (data) {
     //var position = servo2.currentPosition-changeAngle;
     //servo2.to(position);
     servo2.step(-changeAngle);
    // servo2.currentPosition = position;
    
  });


   //Right
socket.on('laserRight', function (data) {
   //  var position = servo2.currentPosition+changeAngle;
     //servo2.to(position);
     //servo2.currentPosition = position;
    servo2.step(changeAngle);
  });

   //UP

   socket.on('laserUp', function (data) {
    
    // var position = servo.currentPosition-changeAngle;
     //servo.to(position);
   //  servo.currentPosition = position;
   servo.step(-changeAngle);
    
  });

   //Down

     socket.on('laserDown', function (data) {
       //     var position = servo.currentPosition+changeAngle;
     //servo.to(position);
   //  servo.currentPosition = position;
   servo.step(changeAngle);
      
  });



     socket.on('laserX', function (data) {
    
       servo2.to(data.x);
       servo2.currentPosition = data.x;
      
  });


  socket.on('laserY', function (data) {
            
      
        servo.to(data.y);
        servo.currentPosition = data.y;
  });

}); 
  // Servo API

  // min()
  //
  // set the servo to the minimum degrees
  // defaults to 0
  //
  // eg. servo.min();

  // max()
  //
  // set the servo to the maximum degrees
  // defaults to 180
  //
  // eg. servo.max();

  // center()
  //
  // centers the servo to 90°
  //
  // servo.center();

  // to( deg )
  //
  // Moves the servo to position by degrees
  //
  // servo.to( 90 );

  // step( deg )
  //
  // step all servos by deg
  //
  // eg. array.step( -20 );
