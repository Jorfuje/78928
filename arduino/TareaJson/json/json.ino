#include <ArduinoJson.h>
#include <WiFi.h>
#include <ESPAsyncWebSrv.h>
#include <WiFiMulti.h>
#include <DHTesp.h>
#define DHTpin 15

DHTesp dht;

const char* ssid = "MEGACABLE-2.4G-06A6";
const char* password = "92WBS634Jn";
AsyncWebServer server(80);

void setup()
{
  Serial.begin(115200);
  conectarse();
  Serial.println("Estado\tHumedad (%)\tTemperatura (C)\t(F)\tIndiceCalor (C)\t(F)");
  dht.setup(DHTpin, DHTesp::DHT11);
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *r){
    AsyncResponseStream *response = r->beginResponseStream("application/json");
    DynamicJsonDocument json(1024);
    float humedad =  dht.getHumidity();
    float temperatura = dht.getTemperature(); 
    String hum = "43";
    String tem = "21.3";
    json["estado"] = dht.getStatusString();
    json["humedad"] = hum;//dht.getHumidity();
    json["temperaturaC"] = tem;//dht.getTemperature();
    json["temperaturaF"] = dht.toFahrenheit(temperatura);
    json["indiceCalorC"] = dht.computeHeatIndex(temperatura, humedad, false);
    json["indicecalorF"] = dht.computeHeatIndex(dht.toFahrenheit(temperatura), humedad, true);
    serializeJson(json, *response);
    r->send(response);
    });
  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");
  server.begin();
}

void loop()
{
  /*delay(dht.getMinimumSamplingPeriod());
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
  delay(2000);*/
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
