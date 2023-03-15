#include<WiFi.h>

const char*ssid = "dr-rojano";
const char*password = "78928-tw";

void setup() {
  // put your setup code here, to run once:
  Serial.begin (9600);
  delay(10);

  //Inicia la conexión
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin (ssid, password);
  //Se verifica se realiza la conexióm
  while(WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }

  //Lograda la conexión se muestra la información
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  
}

void loop() {
  // put your main code here, to run repeatedly:

}
