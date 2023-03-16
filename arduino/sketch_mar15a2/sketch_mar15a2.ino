#include <WiFi.h>
#include <ESPAsyncWebSrv.h>
const char* ssid = "POCO-x3";
const char* password = "samantha";
AsyncWebServer server(80);

void setup() {
  pinMode(2, OUTPUT);
  Serial.begin(9600);
  conectarse();
  server.on("/on", HTTP_GET, [](AsyncWebServerRequest* request){
    int numParametros = request -> params();
    Serial.println(numParametros);
    digitalWrite(2, LOW);    // turn the LED off by making the voltage LOW
  delay(1000); 
    if(numParametros == 0){
      request ->send(200, "text/html","<h1>Hola Mundo</h1>");
    }else{
      AsyncWebParameter* p=request->getParam(0);
      String html = "<h1> hola" + p->value() + " desde ESP32</h1>";
      request->send(200,"text/html",html);
    }

});
  server.on("/of",HTTP_GET, [](AsyncWebServerRequest* request){
    request->send(200,"text/html","<h1>adios</h1>");
    digitalWrite(2, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(1000); 
    
  });
  
  server.begin();
  /*
  delay(10);
*/
 }
void loop() {
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

  
