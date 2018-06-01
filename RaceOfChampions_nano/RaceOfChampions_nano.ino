#include <Wire.h>
#include <LCD03.h>
#include <Task.h>

#define INT_TIME 500 //interrupt accept time in miliseconds

#define BUTTON_RED 2
#define BUTTON_BLUE 256
#define BUTTON_GREEN 512

#define LASER1 2
#define LASER2 3

#define IR 9

#define color1 "Blue"
#define color2 "Red "


String left = color1;
String right = color2;

LCD03 lcd;
uint16_t keystate=0,keystate_old=0;

unsigned long int timeStampINT0 = 0,timeStampINT1 = 0;

unsigned long int start = 0,timeStampEndLeft = 0,timeStampEndRight = 0;
bool end_left = false,end_right = false;

char state_now = 'n',state_old = 'n';

bool ir_emiting = false,ir_state = false;

//###########FUNCTIONS HEADERS##################//

String getTimeLCD(unsigned long int micros_now);
void comandALL(int comand);
void I2C_Comand(int endereco,int comando);
void WriteLCD(bool clear_lcd,int offset,int line,String data);
static void IRTask(void *pvParameters);
static void checkButtons(void *pvParameters);
void setupRace();
void startRace();

//############################################//


void setup() 
{
  Serial.begin(115200);
  Serial.println("Begin Setup");

  pinMode(LASER1,INPUT);
  pinMode(LASER2,INPUT);
  pinMode(IR,OUTPUT);

  lcd.begin(16, 2);

  // Turn on the backlight
  lcd.backlight();

  lcd.setConstrast(225);

  lcd.dobleKeypad();
  lcd.dobleKeypad();
  lcd.dobleKeypad();

  // Write to the LCD
  WriteLCD(true,3,0,"RoboParty");
  WriteLCD(false,2,1,"botnroll.com");

  comandALL(0);

  randomSeed(analogRead(0));

  attachInterrupt(digitalPinToInterrupt(LASER1), laser1_event, RISING);
  attachInterrupt(digitalPinToInterrupt(LASER2), laser2_event, RISING);

  start = micros();

  Serial.println("End Setup");
}


void loop() 
{
    checkButtons();

    if(state_now=='R' && (!end_left || !end_right))
    {
      String str_time_left = left + ": ";
      String str_time_right = right + ": ";
      
      unsigned long int microseconds_from_start = micros()-start;
      
      if(end_left) {
        long long microseconds_from_left = timeStampEndLeft - start;
        str_time_left += getTimeLCD(microseconds_from_left);
      } 
      else str_time_left += getTimeLCD(microseconds_from_start);
  
      if(end_right) {
        long long microseconds_from_right = timeStampEndRight - start;
        str_time_right += getTimeLCD(microseconds_from_right);
      } 
      else str_time_right += getTimeLCD(microseconds_from_start);
     
      WriteLCD(false,0,0,str_time_left);
      WriteLCD(false,0,1,str_time_right);

      Serial.println("$"+str_time_left);
      Serial.println("$"+str_time_right);
      
      delay(100);
    }

    if(Serial.available()>0)
    {
      String data_recieved = Serial.readStringUntil('\n');
      if(data_recieved=="S")
      {
        setupRace();
      }
      else if(data_recieved=="A")
      {
        startRace();
      }
    }
}


//###############FUNCTIONS#################//

void setupRace()
{
  ir_emiting = true;
  digitalWrite(IR,HIGH);
  comandALL(3);
  WriteLCD(true,5,0,"SETUP");
  state_now = 'S';
  end_left = false;
  end_right = false;
}

void startRace()
{
  state_now = 'P';
  comandALL(4);
  delay(3000);
  ir_emiting = false;
  digitalWrite(IR,LOW);
  state_now = 'R';
  start = micros();
}

void checkButtons()
{
  keystate = lcd.readKeypad();

  if(keystate==BUTTON_GREEN && keystate!=keystate_old)
  {
    if(state_now!='S')
    {
      setupRace();
    }
    else
    {
      startRace();
    }

    keystate_old = keystate;
  }
  else if(keystate==BUTTON_RED && keystate!=keystate_old)
  {
    comandALL(8);
    keystate_old = keystate;
  }
  else if(keystate==BUTTON_BLUE && keystate!=keystate_old)
  {
    comandALL(7);
    keystate_old = keystate;
  }
  if(keystate!=keystate_old) keystate_old = keystate;
}


void WriteLCD(bool clear_lcd,int offset,int line,String data)
{
  if(clear_lcd) lcd.clear();
  lcd.setCursor(offset,line);
  lcd.print(data);
}

void comandALL(int comand)
{
  I2C_Comand(1,comand);
  I2C_Comand(2,comand);
  I2C_Comand(3,comand);
  I2C_Comand(4,comand);
}

void I2C_Comand(int endereco,int comando)
{
  Wire.beginTransmission(endereco);
  Wire.write(comando);
  Wire.endTransmission();
}

String getTimeLCD(unsigned long int micros_now)
{
  long minute = 60000000;
  long second =  1000000; // 1000 milliseconds in a second
  long millisecond = 1000;

  int minutes = micros_now / minute ;
  int seconds = (micros_now % minute) / second;
  int microseconds = micros_now%1000;
  int milliseconds = ((micros_now%second)-microseconds)/millisecond;

  String str_minutes = "";
  if(minutes<10) str_minutes = "0"+String(minutes);
  else str_minutes = String(minutes);
  String str_seconds = "";
  if(seconds<10) str_seconds = "0"+String(seconds);
  else str_seconds = String(seconds);
  String str_milliseconds = "";
  if(milliseconds<10) str_milliseconds = "00"+String(milliseconds);
  else if(milliseconds<100) str_milliseconds = "0"+String(milliseconds);
  else str_milliseconds = String(milliseconds);

  return str_minutes+":"+str_seconds+":"+str_milliseconds;
}

//#########################################//

//###########EXTERNAL INTERRUPT############//

void laser1_event()
{
  if(millis()-timeStampINT0>INT_TIME && state_now == 'R')
  {
    timeStampEndLeft = micros();
    Serial.println("End Left: ");
    end_left = true;
    timeStampINT0 = millis();
  }
}

void laser2_event()
{
  if(millis()-timeStampINT1>INT_TIME && state_now == 'R')
  {
   timeStampEndRight = micros();
   Serial.println("End Right: ");
   end_right = true;
   timeStampINT1 = millis();
  }
}



