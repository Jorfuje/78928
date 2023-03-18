#include <WiFi.h>
#include <ESPAsyncWebSrv.h>
#include "DHTesp.h"
#define DHTpin 15
DHTesp dht;

const char* ssid = "POCO-X3";
const char* password = "samantha";
AsyncWebServer server(80);

void setup()
{
  Serial.begin(9600);
  conectarse();
  server.on("/humedad",HTTP_GET, [](AsyncWebServerRequest* request){
    dht.setup(DHTpin, DHTesp::DHT11);
    float humedad = dht.getHumidity();
    String hum ="";
    hum.concat(humedad);
    request->send(200,"text/html","<h1>Humedad: " + hum + "</h1>");
  });

  server.on("/temperatura",HTTP_GET, [](AsyncWebServerRequest* request){
    dht.setup(DHTpin, DHTesp::DHT11);
    float temperatura = dht.getTemperature();
    String tem ="";
    tem.concat(temperatura);
    request->send(200,"text/html","<h1>Temperatura: " + tem + "</h1>");
  });
  
  server.begin();
}

void loop()
{
  delay(dht.getMinimumSamplingPeriod());
  float humedad =  dht.getHumidity();
  float temperatura = dht.getTemperature();                            
  if (isnan(humedad) || isnan(temperatura)){
    Serial.println("No se pudo leer sensor DHT!");
    return;
  }
  Serial.print( dht.getStatusString() );
  Serial.print("\t");
  Serial.print(humedad, 1);
  Serial.print("\t\t");
  Serial.print(temperatura, 1);
  Serial.print("\t\t");
  Serial.print( dht.toFahrenheit(temperatura), 1);
  Serial.print("\t\t");
  Serial.print( dht.computeHeatIndex(temperatura, humedad, false), 1);
  Serial.print("\t\t");
  Serial.println(dht.computeHeatIndex(dht.toFahrenheit(temperatura), humedad, true), 1);
  delay(2000);
}

void conectarse(){
  Serial.println();
  Serial.println();
  Serial.print("Conenecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("Wifi Connected");
  Serial.println("Ip Address: ");
  Serial.println(WiFi.localIP());
}
