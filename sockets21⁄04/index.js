// Create a client instance
client = new Paho.MQTT.Client("192.168.137.1", 9001, "jorge");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
//   console.log("onConnect");
//   client.subscribe("World");
//   message = new Paho.MQTT.Message();
//   message.destinationName = "World";
//   client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
    document.getElementById('recivo').innerText = message.payloadString;
    console.log("onMessageArrived:"+message.payloadString);
}

function enviar() {
    var text = document.getElementById('mensaje').value;
    console.log(text);
    console.log("onConnect");
    client.subscribe("World");
    message = new Paho.MQTT.Message(text);
    message.destinationName = "World";
    client.send(message);
}
