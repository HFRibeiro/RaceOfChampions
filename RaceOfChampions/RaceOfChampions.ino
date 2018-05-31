#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <chrono>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/queue.h"

#include <Wire.h>
#include <LCD03.h>

#define INT_TIME 500 //interrupt accept time in miliseconds

#define BUTTON_RED 2
#define BUTTON_BLUE 256
#define BUTTON_GREEN 512

#define LASER1 16
#define LASER2 17

#define IR 5

#define color1 "Blue"
#define color2 "Red "

String left = color1;
String right = color2;

LCD03 lcd;
uint16_t keystate=0,keystate_old=0;

int freq = 38000;
int channel = 0;
int resolution = 8;
int ir_state = 0;
int timeOUT_IR_State = 25;
int IR_MAX = 512,IR_MIN = 0;
bool ir_emiting = false;

std::chrono::time_point<std::chrono::high_resolution_clock> start;
std::chrono::time_point<std::chrono::high_resolution_clock> timeStampEndLeft;
std::chrono::time_point<std::chrono::high_resolution_clock> timeStampEndRight;
bool end_left = false,end_right = false;

unsigned long int timeStampINT0 = 0;
unsigned long int timeStampINT1 = 0;

char state_now = 'n';
int aux_point_count = 0;

//###########FUNCTIONS HEADERS##################//

String getTimeLCD(unsigned long int micros_now);
void comandALL(int comand);
void I2C_Comand(int endereco,int comando);
void WriteLCD(bool clear_lcd,int offset,int line,String data);
static void IRTask(void *pvParameters);
static void checkButtons(void *pvParameters);

//############################################//

void setup() 
{
  Serial.begin(115200);
  Serial.println("Begin Setup");

  ledcSetup(channel, freq, resolution);
  ledcAttachPin(IR, channel);
  ledcWriteTone(channel, freq);

  pinMode(LASER1,INPUT);
  pinMode(LASER2,INPUT);

  lcd.begin(16, 2);
  Wire.flush();
  Wire.reset();

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

  xTaskCreatePinnedToCore(&checkButtons, "checkButtons", 2048, NULL, 1, NULL,0);
  xTaskCreatePinnedToCore(&IRTask, "IRTask", 2048, NULL, 1, NULL,0);

  attachInterrupt(digitalPinToInterrupt(LASER1), laser1_event, RISING);
  attachInterrupt(digitalPinToInterrupt(LASER2), laser2_event, RISING);

  Serial.println("End Setup");
}


void loop() 
{
  if(state_now=='R')
  {
    String str_time_left = left + ": ";
    String str_time_right = right + ": ";
    
    auto elapsed = std::chrono::high_resolution_clock::now() - start;
    long long microseconds_from_start = std::chrono::duration_cast<std::chrono::microseconds>(elapsed).count();
    
    if(end_left) {
      auto left = timeStampEndLeft - start;
      long long microseconds_from_left = std::chrono::duration_cast<std::chrono::microseconds>(left).count();
      str_time_left += getTimeLCD(microseconds_from_left);
    } 
    else str_time_left += getTimeLCD(microseconds_from_start);

    if(end_right) {
      auto right = timeStampEndRight - start;
      long long microseconds_from_right = std::chrono::duration_cast<std::chrono::microseconds>(right).count();
      str_time_right += getTimeLCD(microseconds_from_right);
    } 
    else str_time_right += getTimeLCD(microseconds_from_start);
   
    WriteLCD(false,0,0,str_time_left);
    WriteLCD(false,0,1,str_time_right);
    delay(random(91,100));
    
  }
  else
  {
    delay(100);
  }
}

//#################TASKS####################//
static void IRTask(void *pvParameters)
{
  while(1)
  {
    if(ir_emiting)
    {
      ledcWrite(channel, ir_state);
      if(ir_state==IR_MIN) ir_state = IR_MAX;
      else ir_state = IR_MIN;
    }
    else ledcWrite(channel, IR_MIN);


    vTaskDelay(timeOUT_IR_State / portTICK_RATE_MS);
  }
}

static void checkButtons(void *pvParameters)
{
  while(1)
  {
    keystate = lcd.readKeypad();

    if(keystate==BUTTON_GREEN && keystate!=keystate_old)
    {
      if(state_now!='S')
      {
        ir_emiting = true;
        comandALL(3);
        WriteLCD(true,5,0,"SETUP");
        state_now = 'S';
        end_left = false;
        end_right = false;
      }
      else
      {
        state_now = 'P';
        comandALL(4);
        delay(3000);
        ir_emiting = false;
        state_now = 'R';
        start = std::chrono::high_resolution_clock::now();
        //Serial.print("Time on Start: ");
        //Serial.println(start);
      }

      keystate_old = keystate;
    }
    else if(keystate==BUTTON_RED && keystate!=keystate_old)
    {
      comandALL(4);
      delay(3000);
      ir_emiting = false;
      keystate_old = keystate;
    }
    else if(keystate==BUTTON_BLUE && keystate!=keystate_old)
    {
      comandALL(5);
      keystate_old = keystate;
    }
    if(keystate!=keystate_old) keystate_old = keystate;

    vTaskDelay(100 / portTICK_RATE_MS);
  }
}
//#########################################//

//###############FUNCTIONS#################//


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
  if(millis()-timeStampINT0>INT_TIME) //&& state_now == 'R')
  {
    timeStampEndLeft = std::chrono::high_resolution_clock::now();
    end_left = true;
    //Serial.print("End Left: ");
    //Serial.println(timeStampEndLeft);
    timeStampINT0 = millis();
  }
}

void laser2_event()
{
  if(millis()-timeStampINT1>INT_TIME) //&& state_now == 'R')
  {
   timeStampEndRight = std::chrono::high_resolution_clock::now();
   end_right = true;
   //Serial.print("End Right: ");
   //Serial.println(timeStampEndRight);
   timeStampINT1 = millis();
  }
}
