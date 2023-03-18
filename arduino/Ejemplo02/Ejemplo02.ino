#include <WiFi.h>

const char* ssid = "POCO-X3";
const char* password = "samantha";

void setup() {
  Serial.begin(9600);
  delay(10);

  // Se inicia la conexión
  Serial.println();
  Serial.println();
  Serial.print("Conenecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  // Se verifica, se realiza la conexión
  while(WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }
  // Lograda la conexión se muestra la información
  Serial.println("");
  Serial.println("Wifi Connected");
  Serial.println("Ip Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // put your main code here, to run repeatedly:

}
