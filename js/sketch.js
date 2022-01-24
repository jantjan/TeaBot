const { ipcRenderer } = require("electron");  // allows p5 to talk to main and discordbot
const serialPort = require('serialport');
var sp = null;

/*
let speed = 1;
let x = -40;
let y = 0;
*/

function setup() {

  //createCanvas(800, 600);
  //y = height / 2;

  listSerialPort();
  var Readline = serialPort.parsers.Readline;	    // make instance of Readline parser
  var parser = new Readline();					// make a new parser to read ASCII lines
  sp.pipe(parser);	
  parser.on('data', readSerialData);              // called when there's new data incoming
}

/*
function draw() {
  background(220);
  x += speed;
  if (x - 40 > width) {
    x = -40;
  }
  ellipse(x, y, 80, 80);
}*/

// Sends message to Discord
function messageToDiscord(data) {    
  ipcRenderer.send('messageFromP5',data);

}

 //receives messages from Discord, and passes it to Arduino
ipcRenderer.on("fromDiscordBot", (event, message) => {
  console.log(message); // prints message so we can see it
  sendToArduino(message)
//insert filter for messages to arduino here. 
/*
if (content.includes("!drink")){
  sendToArduino(message);}
  */
});


function listSerialPort() {
  //initialize serialport with 115200 baudrate.
  sp = new serialPort('COM6', {  baudRate: 115200 });

  sp.write( "start!", function(err) {
    if (err) {
        return console.log('Something is wrong -  Error Message: ', err.message);
    }
    console.log('Hello World');
  });
}



  
function readSerialData(data) {    
  
  console.log(data);
}


function sendToArduino(data) {
  sp.write(data);

  //filter for arduino messages here
  //messageToDiscord(<STUFF>)

  //console.log('check12');
}
