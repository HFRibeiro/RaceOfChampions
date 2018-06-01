#define FREQ 38000
#define IN_PIN 2
#define IR_PIN 9


void setup() {
  pinMode(IN_PIN,INPUT);
  pinMode(IR_PIN,OUTPUT);
}

void loop() {
  if(digitalRead(IN_PIN))
  {
    tone(IR_PIN,FREQ,20);
    delay(20);
  }
}
