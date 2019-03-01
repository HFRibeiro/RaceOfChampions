#include <Wire.h>
#include <LCD03.h>

#define INT_TIME 500 //interrupt accept time in miliseconds

#define BUTTON_RED 2
#define BUTTON_BLUE 256
#define BUTTON_GREEN 512

#define LASER1 2
#define LASER2 3

#define IR 9

String color_blue = "Blue: ";
String color_red = "Red : ";

String str_left = color_blue;
String str_right = color_red;

LCD03 lcd;
uint16_t keystate=0,keystate_old=0;

unsigned long int timeStampINT0 = 0,timeStampINT1 = 0;

unsigned long int start = 0,timeStampEndLeft = 0,timeStampEndRight = 0;

int posicaoBLUE = 0;
int contadorPA = 0;
int contadorPB = 0;
int voltasRED = 0;
int voltasBLUE = 0;
bool LEFT = true,RIGHT = true;
bool BLUE = true,RED = true;

bool RaceOn = false,setupRaceButtons = false;

bool passEsq = false,passDir = false;

bool finalRaceDir = false,finalRaceEsq = false;

//###########FUNCTIONS HEADERS##################//

String getTimeLCD(unsigned long int micros_now);
void comandALL(int comand);
void I2C_Comand(int endereco,int comando);
void WriteLCD(bool clear_lcd,int offset,int line,String data);
static void IRTask(void *pvParameters);
static void checkButtons(void *pvParameters);
void setupRace();
void startRace();
void MostraPassagemEsq();
void MostraPassagemDir();
void DirAzul();
void EsqAzul();
void PASSAGEM(byte robo);
void DesqualifyBlue();
void DesqualifyRed();
void FinalRaceDir();
void FinalRaceEsq();
void checkPassagem();

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

  posicaoBLUE = 0;
  EsqAzul();

  start = micros();

  Serial.println("End Setup");
}


void loop() 
{
    checkPassagem();
  
    checkButtons();

    if(RaceOn)
    {
      String str_time_left = "";
      String str_time_right = "";
      
      unsigned long int microseconds_from_start = micros()-start;
      
      if(finalRaceEsq) {
        unsigned long int time_remove = 0;
        if(posicaoBLUE==1) time_remove = timeStampEndLeft;
        else time_remove = timeStampEndRight;
        
        unsigned long int microseconds_from_left = time_remove - start;
        str_time_left += getTimeLCD(microseconds_from_left);
      }
      else if(!LEFT) str_time_left += "59:59:999";
       
      else str_time_left += getTimeLCD(microseconds_from_start);
  
      if(finalRaceDir) {
        unsigned long int time_remove = 0;
        if(posicaoBLUE==1) time_remove = timeStampEndRight;
        else time_remove = timeStampEndLeft;
        
        unsigned long int microseconds_from_right = time_remove - start;
        str_time_right += getTimeLCD(microseconds_from_right);
      }
      else if(!RIGHT) str_time_right += "59:59:999"; 
      else str_time_right += getTimeLCD(microseconds_from_start);

      
      WriteLCD(false,0,0,str_left + str_time_left); 
      WriteLCD(false,0,1,str_right + str_time_right); 
      Serial.println("$"+ str_left + str_time_left);
      Serial.println("$"+ str_right + str_time_right);

      if((finalRaceEsq && finalRaceDir) || (finalRaceEsq && !RIGHT) || (finalRaceDir && !LEFT) || (!RIGHT && !LEFT)) RaceOn = false;
  
      delay(50);
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
      else if(data_recieved=="T")
      {
        if(posicaoBLUE == 0)
        {
          posicaoBLUE = 1;
          DirAzul();
        }
        else
        {
          posicaoBLUE = 0;
          EsqAzul();
        }
      }
      else if(data_recieved=="b")
      {
        DesqualifyBlue();
      }
      else if(data_recieved=="r")
      {
        DesqualifyRed();
      }
    }
}


//###############FUNCTIONS#################//

void setupRace()
{
  digitalWrite(IR,HIGH);
  comandALL(3);
  WriteLCD(true,5,0,"SETUP");
  RaceOn = false;

  contadorPA = 0;
  contadorPB = 0;
  voltasRED = 0;
  voltasBLUE = 0;
  LEFT = true;
  RIGHT = true;
  BLUE = true;
  RED = true;
  
  finalRaceDir = false;
  finalRaceEsq = false;
}

void startRace()
{
  comandALL(4);
  delay(3000);
  digitalWrite(IR,LOW);
  RaceOn = true;
  start = micros();
}

void checkPassagem()
{
  if(passEsq && RaceOn)
    {
     if (posicaoBLUE == 0)        
        PASSAGEM('B');
      else
        PASSAGEM('R');
      
      passEsq = false;
    }
    if(passDir && RaceOn)
    {
      if (posicaoBLUE == 1)
        PASSAGEM('B');
      else
        PASSAGEM('R');
  
      passDir = false;
    }
}

void checkButtons()
{
  keystate = lcd.readKeypad();

  if(keystate==BUTTON_GREEN && keystate!=keystate_old)
  {
    if(!setupRaceButtons)
    {
      setupRace();
      setupRaceButtons = true;
    }
    else
    {
      startRace();
      setupRaceButtons = false;
    }

    keystate_old = keystate;
  }
  else if(keystate==BUTTON_RED && keystate!=keystate_old)
  {
    if (posicaoBLUE == 1)
    {
      I2C_Comand(3,8);
      I2C_Comand(4,8);
    }
    else
    {
      I2C_Comand(1,8);
      I2C_Comand(2,8);
    }
    
    keystate_old = keystate;
  }
  else if(keystate==BUTTON_BLUE && keystate!=keystate_old)
  {
    if (posicaoBLUE == 1)
    {
      I2C_Comand(1,8);
      I2C_Comand(2,8);
    }
    else
    {
      I2C_Comand(3,8);
      I2C_Comand(4,8);
    }
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

void MostraPassagemEsq()
{
    //Serial.println("MostraPassagemEsq");
    I2C_Comand(3,7);
    I2C_Comand(4,7);
}

void MostraPassagemDir()
{
    //Serial.println("MostraPassagemDir");
    I2C_Comand(1,7);
    I2C_Comand(2,7);
}

void PASSAGEM(byte robo)
{

  if (robo == 'B')
  {
    contadorPA++;
    if (!RED && voltasBLUE == 0)
      voltasBLUE = 1;
    if (!RED && voltasBLUE == 2)
      voltasBLUE = 3;
    if (!BLUE && voltasRED == 1)
      voltasRED = 2;
    if (BLUE && RED)
    {
      if (contadorPA == 1 && voltasBLUE == 0)
        voltasBLUE = 1;
      if (contadorPA == 2 && voltasRED == 1)
        voltasRED = 2;
      if (contadorPA == 3 && voltasBLUE == 2)
        voltasBLUE = 3;
    }
    Serial.println("3");
  }

  if (robo == 'R')
  {
    contadorPB++;
    if (!RED && voltasBLUE == 1)
    {
      voltasBLUE = 2;
    }
    if (!BLUE && voltasRED == 0)
    {
      voltasRED = 1;
    }
    if (!BLUE && voltasRED == 2)
    {
      voltasRED = 3;
    }
    if (BLUE && RED)
    {
      if (contadorPB == 1 && voltasRED == 0)
      {
        voltasRED = 1;
      }
      if (contadorPB == 2 && voltasBLUE == 1)
      {
        voltasBLUE = 2;
      }
      if (contadorPB == 3 && voltasRED == 2)
      {
        voltasRED = 3;
      }
    }
    
    Serial.println("4");
  }
  
  //MostraPassagemEsq();
  if(posicaoBLUE==0)
  {
    if(voltasBLUE<3 && robo == 'B') MostraPassagemEsq();
    if(voltasRED<3 && robo == 'R') MostraPassagemDir();
    if(voltasBLUE==3 && !finalRaceEsq) FinalRaceEsq();
    if(voltasRED==3 && !finalRaceDir) FinalRaceDir();
  }
  else
  {
    if(voltasBLUE<3 && robo == 'B') MostraPassagemDir();
    if(voltasRED<3 && robo == 'R') MostraPassagemEsq();
    if(voltasBLUE==3 && !finalRaceDir) FinalRaceDir();
    if(voltasRED==3 && !finalRaceEsq) FinalRaceEsq();
  }

  //Serial.print("Blue");
  //Serial.println(voltasBLUE);
  //Serial.print("Red");
  //Serial.println(voltasRED);
}

void EsqAzul()
{
    str_left = color_blue;
    str_right = color_red;
    I2C_Comand(1,1);
    I2C_Comand(2,1);
    I2C_Comand(3,2);
    I2C_Comand(4,2);
    //SetupRace();
}

void DirAzul()
{
    str_left = color_red;
    str_right = color_blue;
    I2C_Comand(1,2);
    I2C_Comand(2,2);
    I2C_Comand(3,1);
    I2C_Comand(4,1);
    //SetupRace();
}

void DesqualifyBlue()
{
    BLUE = false;
    if(!posicaoBLUE)
    {
      LEFT = false;
      Serial.println("Desqualify LEFT BLUE");
      I2C_Comand(3,8);
      I2C_Comand(4,8);
    }
    else
    {
      RIGHT = false;
      Serial.println("Desqualify RIGHT BLUE");
      I2C_Comand(1,8);
      I2C_Comand(2,8);
    }
    
}

void DesqualifyRed()
{
    RED = false;
    
    if(!posicaoBLUE)
    {
      RIGHT = false;
      Serial.println("Desqualify RIGHT RED");
      I2C_Comand(1,8);
      I2C_Comand(2,8);
    }
    else
    {
      LEFT = false;
      Serial.println("Desqualify LEFT RED");
      I2C_Comand(3,8);
      I2C_Comand(4,8);
    }
}

void FinalRaceEsq()
{
    
    if(posicaoBLUE==1) {
      timeStampEndLeft = micros();
      Serial.println("FinalRace1");
    }
    else {
      timeStampEndRight = micros();
      Serial.println("FinalRace2");
    }
    
    finalRaceEsq = true;

    I2C_Comand(3,9);
    I2C_Comand(4,9);
}

void FinalRaceDir()
{
    if(posicaoBLUE==1) {
      timeStampEndRight = micros();
      Serial.println("FinalRace2");
    }
    else {
      timeStampEndLeft = micros();
      Serial.println("FinalRace1");
    }
    
    finalRaceDir = true;

    I2C_Comand(1,9);
    I2C_Comand(2,9);
}

//#########################################//

//###########EXTERNAL INTERRUPT############//

void laser1_event()
{
  if(millis()-timeStampINT0>INT_TIME)
  {
    passEsq = true;
    timeStampINT0 = millis();
  }
}

void laser2_event()
{
  if(millis()-timeStampINT1>INT_TIME)
  {
    passDir = true;
    timeStampINT1 = millis();
  }
}
