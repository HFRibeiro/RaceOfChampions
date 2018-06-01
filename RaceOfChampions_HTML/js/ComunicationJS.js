// JavaScript Document
//var wsUri = "ws://172.16.1.70:80/";
var wsUri = "ws://127.0.0.1:1234";
var Debug = document.getElementById("debugTextArea");

var count1 = 1,count2 = 1;

function sendMessage() {
	/*var msg = document.getElementById("inputText").value;
  doSend(msg);*/
}


function initWebSocket() {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) { onOpen(evt) };
  websocket.onclose = function(evt) { onClose(evt) };
  websocket.onmessage = function(evt) { onMessage(evt) };
  websocket.onerror = function(evt) { onError(evt) };
}

function onOpen(evt) {
	writeToScreen("CONNECTED");
	doSend("Hello Client");
}

function onClose(evt) {
	/*writeToScreen("DISCONNECTED");
	initWebSocket();
	if(checkSocket()!=1) alert("DISCONNECTED");*/
}

function onMessage(evt) {
  var dataRead = evt.data;

  dataRead = dataRead.substring(0, dataRead.length - 2);
  writeToScreen('dataRead:' + dataRead+"|");

	if(dataRead=="FinalRace2")
  {
		DebugTime1 = false;
		document.getElementById("team1").style.backgroundImage = "url(imagens/finish.png)";
		if(!DebugTime1 && !DebugTime2){
			 clearInterval(interval);
			 start = false;
		}
	}
	else if(dataRead=="FinalRace1")
  {
		DebugTime2 = false;
		document.getElementById("team2").style.backgroundImage = "url(imagens/finish.png)";
		if(!DebugTime1 && !DebugTime2){
			 clearInterval(interval);
			 start = false;
		}
	}

	else if(dataRead=="3")
  {

		if(!desqualify1){
			 writeToScreen("count1: "+count1);
			 if(count1 == 1) document.getElementById("semafro"+count1).style.backgroundColor = "#20ED10";
			 else if(count1 == 3) document.getElementById("semafro"+count1).style.backgroundColor = "#20ED10";
			 else document.getElementById("semafro2"+count1).style.backgroundColor = "#20ED10";
			 count1++;
		}
		else {
			writeToScreen("count2: "+count2);
			document.getElementById("semafro2"+count2).style.backgroundColor = "#20ED10";
			count2++;
		}

	}
	else if(dataRead=="4")
  {
		if(!desqualify2){
			 writeToScreen("count2: "+count2);
			 if(count2==1) document.getElementById("semafro2"+count2).style.backgroundColor = "#20ED10";
			 else if(count2==3) document.getElementById("semafro2"+count2).style.backgroundColor = "#20ED10";
			 else document.getElementById("semafro"+count2).style.backgroundColor = "#20ED10";
			 count2++;
		}
		else {
			 writeToScreen("count1: "+count1);
			 document.getElementById("semafro"+count1).style.backgroundColor = "#20ED10";
			 count1++;
		}
	}
  else if(dataRead.indexOf("$")!=-1)
  {
      dataRead = dataRead.substring(1);
      //writeToScreen("present: "+dataRead);
      if(dataRead.indexOf("Blue:")!=-1)
      {
        dataRead = dataRead.replace("Blue:","");
        document.getElementById('Timeteam1').innerHTML = dataRead;
      }
      else if(dataRead.indexOf("Red :")!=-1)
      {
        dataRead = dataRead.replace("Red :","");
        document.getElementById('Timeteam2').innerHTML = dataRead;
      }
  }

}

function onError(evt) {
	writeToScreen('ERROR: ' + evt.data);
}

function doSend(message) {
  writeToScreen("SENT: " + message);
  websocket.send(message);
}


function stopWebSocket() {
 websocket.close();
}

function checkSocket() {
  if (websocket != null) {
		var stateStr;
		switch (websocket.readyState) {
			case 0: {
				stateStr = "CONNECTING";
				break;
			}
			case 1: {
				stateStr = "OPEN";
				break;
			}
			case 2: {
				stateStr = "CLOSING";
				break;
			}
			case 3: {
				stateStr = "CLOSED";
				break;
			}
			default: {
				stateStr = "UNKNOW";
				break;
			}
		}
	} else {
		//debug("WebSocket is null");
	}
	return websocket.readyState;
}

function clearDebug() {
  document.getElementById("debugTextArea").value = "";
}

function writeToScreen(message) {
document.getElementById("debugTextArea").value += message + "\n";
document.getElementById("debugTextArea").scrollTop = document.getElementById("debugTextArea").scrollHeight;
}
