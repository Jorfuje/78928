#include<WiFi.h>
#include"ESPAsyncWebServer.h"

const char*ssid = "dr-rojano";
const char*password = "78928-tw";
Async WebServer server(80);

void setup() {
  // put your setup code here, to run once:
  Serial.begin (9600);
  delay(10);
  conectarse();
  Server.on("/", HTTP_GET, [](AsyncWebServerRequest * request){
    int numParametros = request->params();
    Serial.print(numParametros);
    if(numParametros==0)
      request->send(200,"text/html", "<H1> hola mundo</H1>");
    else{
      AsyncWebServer *p=request->getParam(0);
      String html="<H1> hola" +->value()+" desde ESP32</H1>";
      request->send(200,"text/html",html);
    }
  });

  Server.on("/adios", HTTP_GET[](AsyncWebServerRequest * r){
    r->send(200,"text/html", "<h1>adios</h1>");
  });
  Server.begin();
}

void loop(){}

void conectarse(){
  
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin (ssid, password);
  while(WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }
  Serial.println(WiFi.localIP());
  
}
