// Create a client instance
client = new Paho.MQTT.Client("192.168.100.7", 9001, "Jorge");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({ onSuccess: onConnect });


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
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  document.getElementById('recivo').innerText = message.payloadString;
  console.log("onMessageArrived:" + message.payloadString);

  fetch('192.168.100.7')
    .then(res => res.json())
    .then(data => {
      addRow(data)
      console.log(data)
    });


}


function consultar() {
  fetch('192.168.100.7')
    .then(res => res.json())
    .then(data => {
      addRow(data)
      console.log(data)
    });
}

window.addEventListener("load", function () {
  console.log("DOM cargado");
  var form = this.document.getElementById("formulario")
  form.addEventListener("submit", () => {
    event.preventDefault();
    var latitud = this.document.querySelector("#inputLat").value;
    var longitud = this.document.querySelector("#inputLog").value;
    console.log("La latitud es: " + latitud);
    console.log("La longitud es: " + longitud);

    var marker = L.marker([latitud, longitud]).addTo(map);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

  })
});



var map = L.map('map').setView([19.551977, -96.931456], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//var marker = L.marker([latitud, longitud]).addTo(map);

//marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

map.on('click', onMapClick);

document.getElementById("myBtn").onclick = function () { myFunction() };

function enviarCoordenadas() {
  latitud = document.getElementById("inputLat");
  longitud = document.getElementById("inputLog");
}