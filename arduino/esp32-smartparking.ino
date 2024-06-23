#include <ESP32Servo.h>

#define ECHO_PIN1 15 // Pins for Sensor 1
#define TRIG_PIN1 2  // Pins for Sensor 1

#define ECHO_PIN2 5  // Pins for Sensor 2
#define TRIG_PIN2 18 // Pins for Sensor 2

#define ECHO_PIN3 26 // Pins for Sensor 3
#define TRIG_PIN3 27 // Pins for Sensor 3

int LED1_PIN1 = 13;
int LED1_PIN2 = 12;
int LED2_PIN1 = 14;
int LED2_PIN2 = 25;
int LED3_PIN1 = 33;
int LED3_PIN2 = 32;

// Define servo pins
int SERVO_PIN1 = 4;
int SERVO_PIN2 = 25;
int SERVO_PIN3 = 19;

// Create servo objects
Servo servo1;
Servo servo2;
Servo servo3;

void setup() {
  Serial.begin(115200);
  
  pinMode(LED1_PIN1, OUTPUT);
  pinMode(LED1_PIN2, OUTPUT);
  pinMode(LED2_PIN1, OUTPUT);
  pinMode(LED2_PIN2, OUTPUT);
  pinMode(LED3_PIN1, OUTPUT);
  pinMode(LED3_PIN2, OUTPUT);

  pinMode(TRIG_PIN1, OUTPUT);
  pinMode(ECHO_PIN1, INPUT);
  pinMode(TRIG_PIN2, OUTPUT);
  pinMode(ECHO_PIN2, INPUT);
  pinMode(TRIG_PIN3, OUTPUT);
  pinMode(ECHO_PIN3, INPUT);

  // Attach servos to the defined pins
  servo1.attach(SERVO_PIN1);
  servo2.attach(SERVO_PIN2);
  servo3.attach(SERVO_PIN3);
}

float readDistanceCM(int trigPin, int echoPin) {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  int duration = pulseIn(echoPin, HIGH);
  return duration * 0.034 / 2;
}

void loop() {
  float distance1 = readDistanceCM(TRIG_PIN1, ECHO_PIN1);
  float distance2 = readDistanceCM(TRIG_PIN2, ECHO_PIN2);
  float distance3 = readDistanceCM(TRIG_PIN3, ECHO_PIN3);

  bool isNear1 = distance1 <= 4;
  digitalWrite(LED1_PIN1, isNear1);
  digitalWrite(LED1_PIN2, isNear1);

  bool isNear2 = distance2 <= 4;
  digitalWrite(LED2_PIN1, isNear2);
  digitalWrite(LED2_PIN2, isNear2);

  bool isNear3 = distance3 <= 4;
  digitalWrite(LED3_PIN1, isNear3);
  digitalWrite(LED3_PIN2, isNear3);

  // Control the servos based on the distance readings
  if (isNear1) {
    servo1.write(90); // Open position
  } else {
    servo1.write(0);  // Closed position
  }

  if (isNear2) {
    servo2.write(90); // Open position
  } else {
    servo2.write(0);  // Closed position
  }

  if (isNear3) {
    servo3.write(90); // Open position
  } else {
    servo3.write(0);  // Closed position
  }

  Serial.print("Measured distances: ");
  Serial.print("Sensor 1: ");
  Serial.print(distance1);
  Serial.print(" cm, Sensor 2: ");
  Serial.print(distance2);
  Serial.print(" cm, Sensor 3: ");
  Serial.println(distance3);
  delay(10);
}
