#include <Wire.h>
#include <Colorduino.h>

#define Width  8
#define Height 8

#define i2c_add 4


unsigned char E[Height][Width];
long paletteShift;

int in = 120;

byte images[][Height][Width] = {
	{
		0,   0,   0, in, in,   0,   0,   0,  //0
		0,   0, in, in, in, in,   0,   0,
		0, in, in, in, in, in, in,   0,
		0,   0,   0, in, in,   0,   0,   0,
		0,   0,   0, in, in,   0,   0,   0,
		0,   0,   0, in, in,   0,   0,   0,
		0,   0,   0, in, in,   0,   0,   0,
		0,   0,   0,   0,   0,   0,   0,   0,
	},
	{
		in, in,   0,   0,   0,   0, in, in,//1
		in, in, in,   0,   0, in, in, in,
		0, in, in, in, in, in, in,   0,
		0,   0, in, in, in, in,   0,   0,
		0,   0,   0, in, in,   0,   0,   0,
		0, in, in, in, in, in, in,   0,
		in, in, in,   0,   0, in, in, in,
		in, in,   0,   0,   0,   0, in, in,
	},
	{
		0,   0,   0,   0,   0,   0,   0,   0,//2
		0,   0,   0,   0,   0,   0,   0,   0,
		0,   0,   0,   0,   0,   0,   0,   0,
		0,   0,   0, in, in,   0,   0,   0,
		0,   0,   0, in, in,   0,   0,   0,
		0,   0,   0,   0,   0,   0,   0,   0,
		0,   0,   0,   0,   0,   0,   0,   0,
		0,   0,   0,   0,   0,   0,   0,   0,
	},
	{
		  0,   0,   0,   0,   0,   0,   0,  0,//3
		in, in, in, in,   0, in, in, in,
		in,   0,   0,   0,   0, in,   0, in,
		in,   0,   0,   0,   0, in,   0, in,
		in,   0, in, in,   0, in,   0, in,
		in,   0,  0 , in,   0, in,   0, in,
		in, in, in, in,   0, in, in, in,
		  0,   0,   0,   0,   0,   0,   0,   0,
	},
	{
		0, in, in, in, in, in, in,   0,//4
		0,   0,   0,   0,   0, in,   0,   0,
		0,   0,   0,   0, in,   0,   0,   0,
		0,   0,   0, in, in, in,   0,   0,
		0,   0,   0,   0,   0,   0, in,   0,
		0,   0,   0,   0,   0,   0, in,   0,
		0, in,   0,   0,   0,   0, in,   0,
		0,   0, in, in, in, in,   0,   0,
	},
	{
		0,   0, in, in, in, in,   0,   0,//5
		0, in,   0,   0,   0,   0, in,   0,
		0,   0,   0,   0,   0,   0, in,   0,
		0,   0,   0,   0,   0,   0, in,   0,
		0,   0, in, in, in, in,   0,   0,
		0, in,   0,   0,   0,   0,   0,   0,
		0, in,   0,   0,   0,   0,   0,   0,
		0, in, in, in, in, in, in,   0
	},
	{
		0,   0,   0, in, in,   0,   0,   0,//6
		0,   0, in, in, in,   0,   0,   0,
		0,   0,   0, in, in,   0,   0,   0,
		0,   0,   0, in, in,   0,   0,   0,
		0,   0,   0, in, in,   0,   0,   0,
		0,   0,   0, in, in,   0,   0,   0,
		0,   0,   0, in, in,   0,   0,   0,
		0,   0, in, in, in, in,   0,   0,
	},
	{
		  0,  0,  0,in ,in ,  0,  0,  0, //7
		  0,  0,in,in,in,in,  0,  0,
		  0,in,in,in,in,in,in,  0,
		in,in,in,  0,  0,in,in,in,
		in,in,  0,  0,  0,  0,in,in,
		in,  0,  0,  0,  0,  0,  0,in,
		  0,  0,  0,  0,  0,  0,  0,  0,
		  0,  0,  0,  0,  0,  0,  0,  0,
	},
	{
		in,in,in,in,in,in,in,in, //8
		in,in,in,in,in,in,in,in,
		in,in,in,in,in,in,in,in,
		in,in,in,in,in,in,in,in,
		in,in,in,in,in,in,in,in,
		in,in,in,in,in,in,in,in,
		in,in,in,in,in,in,in,in,
		in,in,in,in,in,in,in,in,
	},
	{
		in,in,in,in,in,in,in,in,  //9
		in,in,in,in,0  ,0  ,0  ,in,
		in,in,in,in,0  ,0  ,0  ,in,
		in,in,in,in,0  ,0  ,0  ,in,
		in,0  ,0  ,0  ,in,in,in,in,
		in,0  ,0  ,0  ,in,in,in,in,
		in,0  ,0  ,0  ,in,in,in,in,
		in,in,in,in,in,in,in,in,
	},
	{
		0  ,in,in,in,in,in,in,in, //10
		in,in,in,in,in,in,in,in,
		in,in,in,0  ,0  ,0  ,0  ,0  ,
		in,in,in,in,in,in,in,0  ,
		0  ,in,in,in,in,in,in,in,
		0  ,0  ,0  ,0  ,0  ,0  ,in,in,
		in,in,in,in,in,in,in,in,
		in,in,in,in,in,in,in,0  ,
	}
};


int cor = 0;

void setup() {
 

  Wire.begin(i2c_add);                // join i2c bus with address #4
  Wire.onReceive(receiveEvent); // register event
  Serial.begin(9600);           // start serial for output
  
  Colorduino.Init(); // initialize the board
  unsigned char whiteBalVal[3] = {20,40,40}; // for LEDSEE 6x6cm round matrix valores defeito 36,63,63
  Colorduino.SetWhiteBal(whiteBalVal);
  
  copia_imagem(2);
  switch(i2c_add)
  {
    case 1:
    cor = 1;
    break;
    case 2:
    cor = 1;
    break;
    case 3:
    cor = 2;
    break;
    case 4:
    cor = 2;
    break;
  }
  mostra_E(cor);

}

int states = -1;
//0 - estado incial de arraque | copia_imagem(2); mostra_E(3);
//1 - Set RED | cor = 1;
//2 - Set Blue | cor = 2;
//3 - Setup | copia_imagem(10); mostra_E(cor);
//4 - Partida | copia_imagem(10); mostra_E(cor);
//5 - Passagem Robo | copia_imagem(10); mostra_E(cor);

int delayLimiteTime = 200;
unsigned long delayTimeStamp = 0;


boolean desqualificado = false;

void loop() {
  
  while(Serial.available()>0)
  {
     String readData = Serial.readStringUntil('\n');
     states = readData.toInt();
     Serial.println(states);
  }
  
  if (millis() - delayTimeStamp>delayLimiteTime)
  {
    Serial.println(states);
    switch(states)
    {
      case 0:
      copia_imagem(2); mostra_E(cor); //0 - estado incial de arraque
      break;
      case 1:
      cor = 1; //1 - Set RED
      copia_imagem(2); mostra_E(cor);
      break;
      case 2: //2 - Set Blue
      cor = 2;
      copia_imagem(2); mostra_E(cor);
      break;
      case 3:
      copia_imagem(10); mostra_E(cor); //3 - Setup
      desqualificado = false;
      delayLimiteTime = 200;
      break;
      case 4:
      partida();  //4 - Partida
      break;
      case 5: // 5 - corrida
      copia_imagem(0); mostra_E(cor); states=6;
      delayLimiteTime = 200;
      break;
      case 6: //6 -move cima 
      cima(); mostra_E(cor);
      break;
      case 7: //7 -mostra passagem
      copia_imagem(7); for(int i=0;i<20;i++){ cima(); mostra_E(cor); delay(50);} copia_imagem(0); if(!desqualificado) states = 6; else states = 8;
      delayLimiteTime = 200;
      break;
      case 8: //8- desqualificado
      copia_imagem(1); mostra_E(cor);
      desqualificado = true;
      break;
      case 9: //9 -Fim corrida
      if(!desqualificado) copia_imagem(9); mostra_E(cor); states=10;
      break;
      case 10: //10 -flip bandeira 
      flip(); mostra_E(cor);
      delayLimiteTime = 400;
      break;
      case 11: //11 All On
      cor = 4;
      copia_imagem(8);
      mostra_E(cor);
      break;
      default:
      break;
    }
    
    delayTimeStamp = millis();
  }
}

void receiveEvent(int howMany)
{
    unsigned int c = Wire.read(); 
    states = c;
    Serial.println(states);
}


void cima()
{
	unsigned char i, j;
	unsigned char temp[Width];

	for(i = 0; i < Width; i++)
	temp[i] = E[0][i];
	for(i = 1; i < Height; i++)
	for(j = 0; j < Width; j++)
	E[i-1][j] = E[i][j];
	for(i = 0; i < Width; i++)
	E[Height-1][i] = temp[i];
}

void baixo()
{
	unsigned char i, j;
	unsigned char temp[Width];

	for(i = 0; i < Width; i++)
	temp[i] = E[Height-1][i];
	for(i = Height-1; i>0; i--)
	for(j = 0; j < Width; j++)
	E[i][j] = E[i-1][j];
	for(i = 0; i < Width; i++)
	E[0][i] = temp[i];
}

void direita()
{
	unsigned char i, j;
	unsigned char temp[Height];

	for(i = 0; i < Height; i++)
	temp[i] = E[i][Width-1];
	for(i = 0; i < Height; i++)
	for(j = Width-1; j > 0; j--)
	E[i][j] = E[i][j-1];
	for(i = 0; i < Width; i++)
	E[i][0] = temp[i];
}

void esquerda()
{
	unsigned char i, j;
	unsigned char temp[Height];

	for(i = 0; i < Height; i++)
	temp[i] = E[i][0];
	for(i = 0; i < Height; i++)
	for(j = 0; j < Width-1; j++)
	E[i][j] = E[i][j+1];
	for(i = 0; i < Width; i++)
	E[i][Width-1] = temp[i];
}

void mirror()
{
	unsigned char i, j;
	unsigned char temp;

	for(j = 0; j < Width/2; j++)
	for(i = 0; i < Height; i++)
	{
		temp = E[i][j];
		E[i][j]=E[i][Width-1-j];
		E[i][Width-1-j]=temp;
	}
}

void flip()
{
	unsigned char i, j;
	unsigned char temp;

	for(i = 0; i < Height/2; i++)
	for(j = 0; j < Width; j++)
	{
		temp = E[i][j];
		E[i][j]=E[Height-1-i][j];
		E[Height-1-i][j]=temp;
	}
}

void copia_imagem(int n)
{
  unsigned char i, j;
  for(i = 0; i < Height; i++)
  for(j = 0; j < Width; j++)
  E[i][j] = images[n][i][j];
}
void mostra_E(int colour) //1 RED || 2 Blue
{
	unsigned char x, y;
	for(x = 0; x < Width; x++)
  {
  	for(y = 0; y < Height; y++)
    {
  	 if(colour==1) Colorduino.SetPixel(y, 7-x, (E[x][y]),  0,  0);
     else if(colour==2) Colorduino.SetPixel(y, 7-x, 0,  0,  (E[x][y]));
     else if(colour==3) Colorduino.SetPixel(y, 7-x, 0,  (E[x][y]), 0);
     else if(colour==4) Colorduino.SetPixel(y, 7-x, (E[x][y]),  (E[x][y]), (E[x][y]));
     
    }
  }
	Colorduino.FlipPage(); // swap screen buffers to show it
}



void partida()
{
	copia_imagem(4);
	mostra_E(cor);
	delay(1000);

	copia_imagem(5);
	mostra_E(cor);
	delay(1000);

	copia_imagem(6);
	mostra_E(cor);
	delay(1000);

	copia_imagem(3);
	mostra_E(cor);
	delay(1000);

      //Ativar seta cima loop
      states = 5;
}
