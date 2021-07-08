// #include "SPI.h"
// #include "WiFi.h"
// #include "Adafruit_WS2801.h"
#ifdef __AVR_ATtiny85__
 #include
#endif

char ssid[] = "Wifi SSID";       //와이파이 SSID
char pass[] = "와이파이 비밀번호";   //와이파이 password 

//인스턴스 변수 초기화
WiFiServer server(80);
WiFiClient client;


const unsigned long requestInterval = 60000;  // 요구 시간 딜레이(1 min)

IPAddress hostIp;
uint8_t ret;
unsigned long lastAttemptTime = 0;            // 마지막으로 서버에서 데이터를 전송받은 시간

String currentLine = "";
String weatherString = "";   
String timeString = "";
String location = "kiev";

boolean readingWeather = false; 
boolean readingTime = false;
boolean stringComplete = false;

int weather;
int temp = 0;
uint8_t dataPin  = 2;    // Yellow wire on Adafruit Pixels
uint8_t clockPin = 3;    // Green wire on Adafruit Pixels
int lednum = 30;

Adafruit_WS2801 strip = Adafruit_WS2801(25, dataPin, clockPin);

void setup() {
  //각 변수에 정해진 공간 할당
    Serial.begin(115200);    
  #if defined(__AVR_ATtiny85__) && (F_CPU == 16000000L)
    clock_prescale_set(clock_div_1); //clock을 16Mhz로 사용
  #endif
    strip.begin();
    strip.show();
    delay(10);
    //WiFi연결 시도
    Serial.println("Connecting to WiFi....");  
    WiFi.begin(ssid, pass);  //WiFi가 패스워드를 사용한다면 매개변수에 password도 작성

    server.begin();
    Serial.println("Connect success!");
    Serial.println("Waiting for DHCP address");
    //DHCP주소를 기다린다
    while(WiFi.localIP() == INADDR_NONE) {
      Serial.print(".");
      delay(300);
    }

    Serial.println("\n");
    printWifiData();
    connectToServer();

}


//서버와 연결
void connectToServer() {
  Serial.println("");
  Serial.println("connecting to server...");
  String content = "";
  if (client.connect(hostIp, 80)) {
    Serial.println("Connected! Making HTTP request to api.openweathermap.org for "+location+"...");
    //Serial.println("GET /data/2.5/weather?q="+location+"&mode=xml");
    client.println("GET /data/2.5/weather?q="+location+"&mode=xml"); 
    //위에 지정된 주소와 연결한다.
    client.print("HOST: api.openweathermap.org\n");
    client.println("User-Agent: launchpad-wifi");
    client.println("Connection: close");

    client.println();
    Serial.println("Weather information for "+location);
  }
  //마지막으로 연결에 성공한 시간을 기록
  lastAttemptTime = millis();
}

void printWifiData() {
  // Wifi쉴드의 IP주소를 출력
  Serial.println();
  Serial.println("IP Address Information:");  
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  //MAC address출력
  byte mac[6];  
  WiFi.macAddress(mac);
  Serial.print("MAC address: ");
  printHex(mac[5], 2);
  Serial.print(":");
  printHex(mac[4], 2);
  Serial.print(":");
  printHex(mac[3], 2);
  Serial.print(":");
  printHex(mac[2], 2);
  Serial.print(":");
  printHex(mac[1], 2);
  Serial.print(":");
  printHex(mac[0], 2);
  Serial.println();
  //서브넷 마스크 출력
  IPAddress subnet = WiFi.subnetMask();
  Serial.print("NetMask: ");
  Serial.println(subnet);

  //게이트웨이 주소 출력
  IPAddress gateway = WiFi.gatewayIP();
  Serial.print("Gateway: ");
  Serial.println(gateway);

  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  ret = WiFi.hostByName("api.openweathermap.org", hostIp);

  Serial.print("ret: ");
  Serial.println(ret);

  Serial.print("Host IP: ");
  Serial.println(hostIp);
  Serial.println("");
}