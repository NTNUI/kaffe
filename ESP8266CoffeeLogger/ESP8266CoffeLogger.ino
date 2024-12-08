#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>
#include <WiFiClient.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels
// Declaration for an SSD1306 display connected to I2C (SDA, SCL pins)
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

const int hallPin = D4;
const char *ssid = "NTNU-IOT";
const char *password = "";
String brewType;

// API URL
const char *serverName = "https://api.kaffe.ntnui.no/coffee/brew";

void setup()
{
  Serial.begin(115200);
  delay(10);
  WiFi.mode(WIFI_STA);
  Serial.println(ssid);

  WiFi.begin(ssid, password);
  Serial.println("Connecting to ");
  Serial.print(ssid);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());

  pinMode(hallPin, INPUT);

  // Oled display setup
   if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) { // Address 0x3D for 128x64
    Serial.println(F("SSD1306 allocation failed"));
    for(;;);
    }
  delay(2000);
  display.clearDisplay();

  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 25);
  display.println("Made with<3 by Sprint");
  display.display(); 
}

void loop()
{
  if (digitalRead(hallPin) == LOW)
  {
    Serial.println("Brew detected");
    display.clearDisplay();
    display.setCursor(0, 25);
    display.println("Brew detected");
    display.display();
    
    brewType = "1.89";
    delay(210000);
    if (digitalRead(hallPin) == LOW)
    {
      Serial.println("Large batch");
      brewType = "3.78";
    }
    else
    {
      Serial.println("Small batch");
      display.display();
    }
    if (WiFi.status() == WL_CONNECTED)
    {
      std::unique_ptr<BearSSL::WiFiClientSecure> client(new BearSSL::WiFiClientSecure);
      client->setInsecure();

      HTTPClient https;

      DynamicJsonDocument doc(512);
      JsonObject object = doc.to<JsonObject>();

      object["liters"] = brewType;
      object["brewerID"] = "69";
      object["brewSecret"] = "6969";

      String data;
      serializeJsonPretty(object, data);

      Serial.println(data);

      https.begin(*client, serverName);
      https.addHeader("Content-Type", "application/json; charset=UTF-8");

      int httpCode = https.POST(data);

      if (httpCode == 200)
      {
        Serial.println("POST succeeded with code:");
        Serial.println(httpCode);
      }
      else if (httpCode != 200)
      {
        Serial.println("POST failed with code:");
        Serial.println(httpCode);
      }
      else
      {
        Serial.println("Unknown error");
      }

      String payload = https.getString();
      Serial.println(payload);

      DynamicJsonDocument response(512);
      DeserializationError error = deserializeJson(response, payload);

     if (error) {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.f_str());
      }

      const char* timeStr = response["brewTime"];
      Serial.println(timeStr);
      display.clearDisplay();
      display.setCursor(0, 5);
      display.println("Last brew: ");
      display.println("");
      display.println(timeStr);
      display.println("");
      if(brewType == "1.89"){
        display.println("Small batch");
      }
      else{
        display.println("Large batch");
      }
      display.display();

      https.end();
    }
    // If large batch, wait until brew is finished
    if(brewType == "3.78"){
     delay(180000); 
    }
  }
  Serial.println(digitalRead(hallPin));
  delay(500);
}
