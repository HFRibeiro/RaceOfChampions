// JavaScript Document
$(document).on("scroll",function(){
});

var maxima = false;

var idFinal = id.length;

var newTeam = false,idEdit = 0;

var OnPosNow = "";
var limitPass = 0;

var startTime,interval;

var DebugTime1 = true, DebugTime2 = true,start = false;

var tempTime1 = 0,tempTime2= 0;

var oldState = 0;
var desqualify1 = false,desqualify2 = false;

$(document).ready(function() {

	initWebSocket();

	var myVar2 = setInterval(function () {myTimerNews()}, 300);

	function myTimerNews() {
		var stateNow = checkSocket();
		//alert(stateNow);
		//document.getElementById("debugTextArea").innerHTML += stateNow;

		if(stateNow==1 && oldState!=stateNow){
			document.getElementById("connection").style.backgroundImage = "url(imagens/connected.png)";
			document.getElementById("connection").title = "Connected";
		}
		else if(oldState!=stateNow) {
			document.getElementById("connection").style.backgroundImage = "url(imagens/notconnected.png)";
			document.getElementById("connection").title = "Disconnected";
			initWebSocket();
		}
		/*if(stateNow==0){
			 initWebSocket();
			 document.getElementById("debugTextArea").innerHTML += "try\n";
		}*/

		oldState = stateNow;
	}

	$("#connection").click(function(){
		    initWebSocket();
	   });

	if(nomeFinal.length>0)
	{
		var nT = 0;
		document.getElementById("O1T1").innerHTML = nomeFinal[nT];
		nT++;
		document.getElementById("O1T2").innerHTML = nomeFinal[nT];
		nT++;
		document.getElementById("O2T1").innerHTML = nomeFinal[nT];
		nT++;
		document.getElementById("O2T2").innerHTML = nomeFinal[nT];
		nT++;
		document.getElementById("O3T1").innerHTML = nomeFinal[nT];
		nT++;
		document.getElementById("O3T2").innerHTML = nomeFinal[nT];
		nT++;
		document.getElementById("O4T1").innerHTML = nomeFinal[nT];
		nT++;
		document.getElementById("O4T2").innerHTML = nomeFinal[nT];
		nT++;
		document.getElementById("O5T1").innerHTML = nomeFinal[nT];
		nT++;
		document.getElementById("O5T2").innerHTML = nomeFinal[nT];
		nT++;
		document.getElementById("O6T1").innerHTML = nomeFinal[nT];
		nT++;
		document.getElementById("O6T2").innerHTML = nomeFinal[nT];
		nT++;
		document.getElementById("O7T1").innerHTML = nomeFinal[nT];
		nT++;
		document.getElementById("O7T2").innerHTML = nomeFinal[nT];
		nT++;
		document.getElementById("O8T1").innerHTML = nomeFinal[nT];
		nT++;
		document.getElementById("O8T2").innerHTML = nomeFinal[nT];
		nT++;

		setResults();
	}

	var partsOfStr = new Array();
	for(var i=0;i<positions.length;i++)
	{
		partsOfStr[i] = positions[i].split(':');
		for(var q=0;q<partsOfStr[i].length;q++)
		{
			if(partsOfStr[i][q]=="Q1T1") document.getElementById("Q1T1").innerHTML = nomeFinal[i];
			else if(partsOfStr[i][q]=="Q1T2") document.getElementById("Q1T2").innerHTML = nomeFinal[i];
			else if(partsOfStr[i][q]=="Q2T1") document.getElementById("Q2T1").innerHTML = nomeFinal[i];
			else if(partsOfStr[i][q]=="Q2T2") document.getElementById("Q2T2").innerHTML = nomeFinal[i];
			else if(partsOfStr[i][q]=="Q3T1") document.getElementById("Q3T1").innerHTML = nomeFinal[i];
			else if(partsOfStr[i][q]=="Q3T2") document.getElementById("Q3T2").innerHTML = nomeFinal[i];
			else if(partsOfStr[i][q]=="Q4T1") document.getElementById("Q4T1").innerHTML = nomeFinal[i];
			else if(partsOfStr[i][q]=="Q4T2") document.getElementById("Q4T2").innerHTML = nomeFinal[i];
			else if(partsOfStr[i][q]=="M1T1") document.getElementById("M1T1").innerHTML = nomeFinal[i];
			else if(partsOfStr[i][q]=="M1T2") document.getElementById("M1T2").innerHTML = nomeFinal[i];
			else if(partsOfStr[i][q]=="M2T1") document.getElementById("M2T1").innerHTML = nomeFinal[i];
			else if(partsOfStr[i][q]=="M2T2") document.getElementById("M2T2").innerHTML = nomeFinal[i];
			else if(partsOfStr[i][q]=="F1T1") document.getElementById("F1T1").innerHTML = nomeFinal[i];
			else if(partsOfStr[i][q]=="F1T2") document.getElementById("F1T2").innerHTML = nomeFinal[i];
			else if(partsOfStr[i][q]=="T1T1") document.getElementById("T1T1").innerHTML = nomeFinal[i];
			else if(partsOfStr[i][q]=="T1T2") document.getElementById("T1T2").innerHTML = nomeFinal[i];

		}
	}

	acertAltura(innerHeight);

	$("body").css("display", "none");
            $("body").fadeIn(1500);

  $("#maxima").click(function(){
	  if(!maxima){
			launchIntoFullscreen(document.documentElement); // the whole page
			document.getElementById("maxima").style.backgroundImage = "url(imagens/nomaxima.png)";
			//$container.isotope({ sortBy: "number" });
			maxima = true;
	  }
	  else {
	  		exitFullscreen();
			document.getElementById("maxima").style.backgroundImage = "url(imagens/maxima.png)";
			//$container.isotope({ sortBy: "original-order" });
			maxima = false;
	  }
   });

   $("#generate").click(function(){
		var r = confirm("Do you really want to generate new teams?\nALL DATA WILL BE LOST!!");
		if (r == true) {
			$.post( "clean.php", {
				check:"RoboParty"
				})
				.done(function( data ) {
					console.log(data);
					window.location.href = "checkfinals.php";
				});
		}

   });

   $("#desqf1").click(function(){
		if(document.getElementById("team1").innerHTML!=""){
			DebugTime1 = false;
			desqualify1 = true;
			doSend("b");
			//document.getElementById("Timeteam1").innerHTML = "59:59:999";
			document.getElementById("team1").style.backgroundImage =  "url(imagens/disqualified.png)";
		}
		else alert("Select a team first!");
    });
	$("#desqf2").click(function(){
		if(document.getElementById("team2").innerHTML!=""){
		DebugTime2 = false;
		desqualify2 = true;
		doSend("r");
		//document.getElementById("Timeteam2").innerHTML = "59:59:999";
		document.getElementById("team2").style.backgroundImage =  "url(imagens/disqualified.png)";
		}
		else alert("Select a team first!");
    });

   $("#setup").click(function(){
		doSend("S");
		clearInterval(interval);
		document.getElementById('Timeteam1').innerHTML = "00:00:000";
  		document.getElementById('Timeteam2').innerHTML = "00:00:000";
		document.getElementById("team1").style.backgroundImage = "";
		document.getElementById("team2").style.backgroundImage = "";
		resetSemafros();
		start = false;
    });
	$("#start").click(function(){
	  if(!start){
		var TeamOneName = document.getElementById("team1").innerHTML;
		var TeamTwoName = document.getElementById("team2").innerHTML;
		if(TeamOneName!="" && TeamTwoName!="")
		{
			doSend("A");
			DebugTime1 = true; DebugTime2 = true;

			var RaceLable = document.getElementById("GetReady");
			RaceLable.innerHTML = "3";
			RaceLable.style.color = "red";

			var Step1=1000; //1 seconds
			var Step2=2000; //1 seconds
			var Step3=3000; //1 seconds
			setTimeout(function(){
				RaceLable.innerHTML = "2";
			}, Step1);
			setTimeout(function(){
				RaceLable.innerHTML = "1";
			}, Step2);
			setTimeout(function(){
				RaceLable.style.color = "green";
				RaceLable.innerHTML = "GO";
				setTimeout(function(){
					document.getElementById("GetReady").style.display = "none";
				}, 600);
				//$("#GetReady").fadeOut(2500);
			}, Step3);

			//GetReady
			//$("#GetReady").fadeIn(500);
			document.getElementById("GetReady").style.display = "inherit";

/*
			var delay=3000; //1 seconds
			setTimeout(function(){
			 startTime= Date.now();
			 interval = window.setInterval(showTime, 10);
			}, delay);
			*/

			start = true;
		}
		else alert("Chose the two teams first!");
	  }
    });

	function showTime(){
	  var time = formatTime(Date.now() - startTime);
	  if(DebugTime1) document.getElementById('Timeteam1').innerHTML = time;
	  if(DebugTime2) document.getElementById('Timeteam2').innerHTML = time;
	}

	function formatTime(elapsed) {
	  var  minutes, seconds, milis;

	  minutes = Math.floor(elapsed/(60*1000));
	  elapsed -= minutes * 60* 1000;

	  seconds = Math.floor(elapsed/1000);
	  elapsed -= seconds * 1000;
	  //if(seconds>59)seconds = 0;

	  milis = elapsed;

	  if(minutes<10) {minutes = "0"+minutes;}
	  if(seconds<10) {seconds = "0"+seconds;}
	  if(milis<10) {milis = "00"+milis;}
	  else if(milis>10 && milis<100) {milis = "0"+milis;}

	  return minutes + ':' + seconds + ':' + milis;
	}

	$("#changeTrack").click(function(){
		doSend("T");
    });

    $("#validate").click(function(){

		resetSemafros();

	   if(document.getElementById("team1").innerHTML!="" && document.getElementById("team2").innerHTML!=""){
		var team1Name = document.getElementById("team1").innerHTML;
		var time1 = document.getElementById("Timeteam1").innerHTML;
		var partsOfStr1 = time1.split(':');
		var minuteRand1 = parseFloat(partsOfStr1[0]).toFixed(0);
		var secondRand1 = parseFloat(partsOfStr1[1]).toFixed(0);
		var miliRand1 = parseFloat(partsOfStr1[2]).toFixed(0);
		var tempo1F = minuteRand1+secondRand1+miliRand1;

		var team2Name = document.getElementById("team2").innerHTML;
		var time2 = document.getElementById("Timeteam2").innerHTML;
		var partsOfStr2 = time2.split(':');
		var minuteRand2 = parseFloat(partsOfStr2[0]).toFixed(0);
		var secondRand2 = parseFloat(partsOfStr2[1]).toFixed(0);
		var miliRand2 = parseFloat(partsOfStr2[2]).toFixed(0);
		var tempo2F = minuteRand2+secondRand2+miliRand2;


			if(time1<time2) {

				var r = confirm("Give victory to "+document.getElementById("team1").innerHTML+" ?");
				if (r == true) {
					if(document.getElementById(OnPosNow+"T1").innerHTML ==team1Name) {
						var vitorias = document.getElementById(OnPosNow+"T1L").innerHTML;
						vitorias++;
						document.getElementById(OnPosNow+"T1L").innerHTML = vitorias;


						$.post( "updateResults.php", {
						pos:OnPosNow+"T1L",valor:vitorias
						})
						.done(function( data ) {
							console.log(data);
						});

						addPositionTeam(OnPosNow,team1Name,vitorias,team2Name);

		  			 }
					else if(document.getElementById(OnPosNow+"T2").innerHTML == team1Name) {
						var vitorias = document.getElementById(OnPosNow+"T2L").innerHTML;
						vitorias++;
						document.getElementById(OnPosNow+"T2L").innerHTML = vitorias;

						$.post( "updateResults.php", {
						pos:OnPosNow+"T2L",valor:vitorias
						})
						.done(function( data ) {
							console.log(data);
						});
						addPositionTeam(OnPosNow,team1Name,vitorias,team2Name);
					 }
				}
				else {
					var r = confirm("Give victory to "+document.getElementById("team2").innerHTML+" ?");
					if (r == true) {
						if(document.getElementById(OnPosNow+"T1").innerHTML ==team2Name) {
							var vitorias = document.getElementById(OnPosNow+"T1L").innerHTML;
							vitorias++;
							document.getElementById(OnPosNow+"T1L").innerHTML = vitorias;

							$.post( "updateResults.php", {
							pos:OnPosNow+"T1L",valor:vitorias
							})
							.done(function( data ) {
								console.log(data);
							});
							addPositionTeam(OnPosNow,team2Name,vitorias,team1Name);
						 }
						else if(document.getElementById(OnPosNow+"T2").innerHTML == team2Name) {
							var vitorias = document.getElementById(OnPosNow+"T2L").innerHTML;
							vitorias++;
							document.getElementById(OnPosNow+"T2L").innerHTML = vitorias;
							$.post( "updateResults.php", {
							pos:OnPosNow+"T2L",valor:vitorias
							})
							.done(function( data ) {
								console.log(data);
							});
							addPositionTeam(OnPosNow,team2Name,vitorias,team1Name);
						 }
					}
				}
			}
			else {
				var r = confirm("Give victory to "+document.getElementById("team2").innerHTML+" ?");
				if (r == true) {
					if(document.getElementById(OnPosNow+"T1").innerHTML ==team2Name) {
							var vitorias = document.getElementById(OnPosNow+"T1L").innerHTML;
							vitorias++;
							document.getElementById(OnPosNow+"T1L").innerHTML = vitorias;
							console.log(OnPosNow+"T1L "+vitorias);
							$.post( "updateResults.php", {
							pos:OnPosNow+"T1L",valor:vitorias
							})
							.done(function( data ) {
								console.log(data);
							});
							addPositionTeam(OnPosNow,team2Name,vitorias,team1Name);
						 }
						else if(document.getElementById(OnPosNow+"T2").innerHTML == team2Name) {
							var vitorias = document.getElementById(OnPosNow+"T2L").innerHTML;
							vitorias++;
							document.getElementById(OnPosNow+"T2L").innerHTML = vitorias;
							console.log(OnPosNow+"T2L "+vitorias);
							$.post( "updateResults.php", {
							pos:OnPosNow+"T2L",valor:vitorias
							})
							.done(function( data ) {
								console.log(data);
							});
							addPositionTeam(OnPosNow,team2Name,vitorias,team1Name);
						 }
				}
				else {
					var r = confirm("Give victory to "+document.getElementById("team1").innerHTML+" ?");
					if (r == true) {
						if(document.getElementById(OnPosNow+"T1").innerHTML ==team1Name) {
						var vitorias = document.getElementById(OnPosNow+"T1L").innerHTML;
						vitorias++;
						document.getElementById(OnPosNow+"T1L").innerHTML = vitorias;
						console.log(OnPosNow+"T1L "+vitorias);
						$.post( "updateResults.php", {
							pos:OnPosNow+"T1L",valor:vitorias
							})
							.done(function( data ) {
								console.log(data);
							});
							addPositionTeam(OnPosNow,team1Name,vitorias,team2Name);
		  			 }
					else if(document.getElementById(OnPosNow+"T2").innerHTML == team1Name) {
						var vitorias = document.getElementById(OnPosNow+"T2L").innerHTML;
						vitorias++;
						document.getElementById(OnPosNow+"T2L").innerHTML = vitorias;
						console.log(OnPosNow+"T1L "+vitorias);
						$.post( "updateResults.php", {
							pos:OnPosNow+"T2L",valor:vitorias
							})
							.done(function( data ) {
								console.log(data);
							});
							addPositionTeam(OnPosNow,team1Name,vitorias,team2Name);
					 }
					}
				}
			}

		}
   });

	function acertAltura(altura) {
	document.getElementById("Timeteam1").style.lineHeight = $("#Timeteam1").height()+"px";
	document.getElementById("Timeteam2").style.lineHeight = $("#Timeteam2").height()+"px";
	document.getElementById("team1").style.lineHeight = $("#team1").height()+"px";
	document.getElementById("team2").style.lineHeight = $("#team2").height()+"px";
	document.getElementById("VS").style.lineHeight = $("#VS").height()+"px";
	document.getElementById("VSF").style.lineHeight = $("#VSF").height()+"px";
	document.getElementById("VSFT").style.lineHeight = $("#VSFT").height()+"px";

		var elements = document.getElementsByClassName("btsM");
		for (var i = 0; i < elements.length; i++) {
			elements[i].style.lineHeight = $(elements[i]).height()+"px";
		}
		elements = document.getElementsByClassName("OTeams");
		for (var i = 0; i < elements.length; i++) {
			elements[i].style.lineHeight = $(elements[i]).height()+"px";
		}
		elements = document.getElementsByClassName("OVS");
		for (var i = 0; i < elements.length; i++) {
			elements[i].style.lineHeight = $(elements[i]).height()+"px";
		}
		elements = document.getElementsByClassName("OVS2");
		for (var i = 0; i < elements.length; i++) {
			elements[i].style.lineHeight = $(elements[i]).height()+"px";
		}
		elements = document.getElementsByClassName("QTeams");
		for (var i = 0; i < elements.length; i++) {
			elements[i].style.lineHeight = $(elements[i]).height()+"px";
		}
		elements = document.getElementsByClassName("MTeams");
		for (var i = 0; i < elements.length; i++) {
			elements[i].style.lineHeight = $(elements[i]).height()+"px";
		}
		elements = document.getElementsByClassName("TeamFinals");
		for (var i = 0; i < elements.length; i++) {
			//elements[i].style.lineHeight = $(elements[i]).height()+"px";
		}


	}

	window.addEventListener("resize", myResize);

	function myResize()
	{
		var delay=200; //1 seconds
		setTimeout(function(){
	 	 acertAltura(innerHeight);
		}, delay);
	}


		// Find the right method, call on correct element
	function launchIntoFullscreen(element) {
	  if(element.requestFullscreen) {
		element.requestFullscreen();
	  } else if(element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	  } else if(element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	  } else if(element.msRequestFullscreen) {
		element.msRequestFullscreen();
	  }

	  	var delay=200; //1 seconds
		setTimeout(function(){
	 	 acertAltura(innerHeight);
		}, delay);
	}

	function exitFullscreen() {
	  if(document.exitFullscreen) {
		document.exitFullscreen();
	  } else if(document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	  } else if(document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	  }
	  var delay=200; //1 seconds
		setTimeout(function(){
	 	 acertAltura(innerHeight);
		}, delay);
	}

	document.getElementById("Timeteam1").style.lineHeight = $("#Timeteam1").height()+"px";
	document.getElementById("Timeteam2").style.lineHeight = $("#Timeteam2").height()+"px";
	document.getElementById("team1").style.lineHeight = $("#team1").height()+"px";
	document.getElementById("team2").style.lineHeight = $("#team2").height()+"px";
	document.getElementById("VS").style.lineHeight = $("#VS").height()+"px";
	document.getElementById("VSF").style.lineHeight = $("#VSF").height()+"px";
	document.getElementById("VSFT").style.lineHeight = $("#VSFT").height()+"px";



	var elements = document.getElementsByClassName("btsM");
	for (var i = 0; i < elements.length; i++) {
		elements[i].style.lineHeight = $(elements[i]).height()+"px";
	}

	elements = document.getElementsByClassName("OTeams");
	for (var i = 0; i < elements.length; i++) {
		elements[i].style.lineHeight = $(elements[i]).height()+"px";
	}
	elements = document.getElementsByClassName("OVS");
	for (var i = 0; i < elements.length; i++) {
		elements[i].style.lineHeight = $(elements[i]).height()+"px";
	}
	elements = document.getElementsByClassName("OVS2");
	for (var i = 0; i < elements.length; i++) {
		elements[i].style.lineHeight = $(elements[i]).height()+"px";
	}
	elements = document.getElementsByClassName("QTeams");
	for (var i = 0; i < elements.length; i++) {
		elements[i].style.lineHeight = $(elements[i]).height()+"px";
	}
	elements = document.getElementsByClassName("MTeams");
	for (var i = 0; i < elements.length; i++) {
		elements[i].style.lineHeight = $(elements[i]).height()+"px";
	}
	elements = document.getElementsByClassName("TeamFinals");
	for (var i = 0; i < elements.length; i++) {
		elements[i].style.lineHeight = $(elements[i]).height()+"px";
	}


	 $("#O1").dblclick(function(){
		var randNum =  Math.floor((Math.random() * 50) + 1);
		if(randNum>25) document.getElementById("team1").innerHTML = document.getElementById("O1T1").innerHTML;
		else  document.getElementById("team1").innerHTML = document.getElementById("O1T2").innerHTML;

		if(randNum>25) document.getElementById("team2").innerHTML = document.getElementById("O1T2").innerHTML;
		else  document.getElementById("team2").innerHTML = document.getElementById("O1T1").innerHTML;

		OnPosNow = "O1";
		limitPass = oitavos;
   	});
	$("#O2").dblclick(function(){
		var randNum =  Math.floor((Math.random() * 50) + 1);
		if(randNum>25) document.getElementById("team1").innerHTML = document.getElementById("O2T1").innerHTML;
		else  document.getElementById("team1").innerHTML = document.getElementById("O2T2").innerHTML;

		if(randNum>25) document.getElementById("team2").innerHTML = document.getElementById("O2T2").innerHTML;
		else  document.getElementById("team2").innerHTML = document.getElementById("O2T1").innerHTML;

		OnPosNow = "O2";
		limitPass = oitavos;
   	});
	$("#O3").dblclick(function(){
		var randNum =  Math.floor((Math.random() * 50) + 1);
		if(randNum>25) document.getElementById("team1").innerHTML = document.getElementById("O3T1").innerHTML;
		else  document.getElementById("team1").innerHTML = document.getElementById("O3T2").innerHTML;

		if(randNum>25) document.getElementById("team2").innerHTML = document.getElementById("O3T2").innerHTML;
		else  document.getElementById("team2").innerHTML = document.getElementById("O3T1").innerHTML;

		OnPosNow = "O3";
		limitPass = oitavos;
   	});
	$("#O4").dblclick(function(){
		var randNum =  Math.floor((Math.random() * 50) + 1);
		if(randNum>25) document.getElementById("team1").innerHTML = document.getElementById("O4T1").innerHTML;
		else  document.getElementById("team1").innerHTML = document.getElementById("O4T2").innerHTML;

		if(randNum>25) document.getElementById("team2").innerHTML = document.getElementById("O4T2").innerHTML;
		else  document.getElementById("team2").innerHTML = document.getElementById("O4T1").innerHTML;

		OnPosNow = "O4";
		limitPass = oitavos;
   	});

	$("#O5").dblclick(function(){
		var randNum =  Math.floor((Math.random() * 50) + 1);
		if(randNum>25) document.getElementById("team1").innerHTML = document.getElementById("O5T1").innerHTML;
		else  document.getElementById("team1").innerHTML = document.getElementById("O5T2").innerHTML;

		if(randNum>25) document.getElementById("team2").innerHTML = document.getElementById("O5T2").innerHTML;
		else  document.getElementById("team2").innerHTML = document.getElementById("O5T1").innerHTML;

		OnPosNow = "O5";
		limitPass = oitavos;
   	});

	$("#O6").dblclick(function(){
		var randNum =  Math.floor((Math.random() * 50) + 1);
		if(randNum>25) document.getElementById("team1").innerHTML = document.getElementById("O6T1").innerHTML;
		else  document.getElementById("team1").innerHTML = document.getElementById("O6T2").innerHTML;

		if(randNum>25) document.getElementById("team2").innerHTML = document.getElementById("O6T2").innerHTML;
		else  document.getElementById("team2").innerHTML = document.getElementById("O6T1").innerHTML;

		OnPosNow = "O6";
		limitPass = oitavos;

   	});

	$("#O7").dblclick(function(){
		var randNum =  Math.floor((Math.random() * 50) + 1);
		if(randNum>25) document.getElementById("team1").innerHTML = document.getElementById("O7T1").innerHTML;
		else  document.getElementById("team1").innerHTML = document.getElementById("O7T2").innerHTML;

		if(randNum>25) document.getElementById("team2").innerHTML = document.getElementById("O7T2").innerHTML;
		else  document.getElementById("team2").innerHTML = document.getElementById("O7T1").innerHTML;

		OnPosNow = "O7";
		limitPass = oitavos;
   	});

	$("#O8").dblclick(function(){
		var randNum =  Math.floor((Math.random() * 50) + 1);
		if(randNum>25) document.getElementById("team1").innerHTML = document.getElementById("O8T1").innerHTML;
		else  document.getElementById("team1").innerHTML = document.getElementById("O8T2").innerHTML;

		if(randNum>25) document.getElementById("team2").innerHTML = document.getElementById("O8T2").innerHTML;
		else  document.getElementById("team2").innerHTML = document.getElementById("O8T1").innerHTML;

		OnPosNow = "O8";
		limitPass = oitavos;
   	});


	$("#Q1").dblclick(function(){
		var randNum =  Math.floor((Math.random() * 50) + 1);
		if(randNum>25) document.getElementById("team1").innerHTML = document.getElementById("Q1T1").innerHTML;
		else  document.getElementById("team1").innerHTML = document.getElementById("Q1T2").innerHTML;

		if(randNum>25) document.getElementById("team2").innerHTML = document.getElementById("Q1T2").innerHTML;
		else  document.getElementById("team2").innerHTML = document.getElementById("Q1T1").innerHTML;

		OnPosNow = "Q1";
		limitPass = quartos;
   	});

	$("#Q2").dblclick(function(){
		var randNum =  Math.floor((Math.random() * 50) + 1);
		if(randNum>25) document.getElementById("team1").innerHTML = document.getElementById("Q2T1").innerHTML;
		else  document.getElementById("team1").innerHTML = document.getElementById("Q2T2").innerHTML;

		if(randNum>25) document.getElementById("team2").innerHTML = document.getElementById("Q2T2").innerHTML;
		else  document.getElementById("team2").innerHTML = document.getElementById("Q2T1").innerHTML;

		OnPosNow = "Q2";
		limitPass = quartos;

   	});

	$("#Q3").dblclick(function(){
		var randNum =  Math.floor((Math.random() * 50) + 1);
		if(randNum>25) document.getElementById("team1").innerHTML = document.getElementById("Q3T1").innerHTML;
		else  document.getElementById("team1").innerHTML = document.getElementById("Q3T2").innerHTML;

		if(randNum>25) document.getElementById("team2").innerHTML = document.getElementById("Q3T2").innerHTML;
		else  document.getElementById("team2").innerHTML = document.getElementById("Q3T1").innerHTML;

		OnPosNow = "Q3";
		limitPass = quartos;
   	});

	$("#Q4").dblclick(function(){
		var randNum =  Math.floor((Math.random() * 50) + 1);
		if(randNum>25) document.getElementById("team1").innerHTML = document.getElementById("Q4T1").innerHTML;
		else  document.getElementById("team1").innerHTML = document.getElementById("Q4T2").innerHTML;

		if(randNum>25) document.getElementById("team2").innerHTML = document.getElementById("Q4T2").innerHTML;
		else  document.getElementById("team2").innerHTML = document.getElementById("Q4T1").innerHTML;

		OnPosNow = "Q4";
		limitPass = quartos;
   	});

	$("#M1").dblclick(function(){
		var randNum =  Math.floor((Math.random() * 50) + 1);
		if(randNum>25) document.getElementById("team1").innerHTML = document.getElementById("M1T1").innerHTML;
		else  document.getElementById("team1").innerHTML = document.getElementById("M1T2").innerHTML;

		if(randNum>25) document.getElementById("team2").innerHTML = document.getElementById("M1T2").innerHTML;
		else  document.getElementById("team2").innerHTML = document.getElementById("M1T1").innerHTML;

		OnPosNow = "M1";
		limitPass = meias;
   	});

	$("#M2").dblclick(function(){
		var randNum =  Math.floor((Math.random() * 50) + 1);
		if(randNum>25) document.getElementById("team1").innerHTML = document.getElementById("M2T1").innerHTML;
		else  document.getElementById("team1").innerHTML = document.getElementById("M2T2").innerHTML;

		if(randNum>25) document.getElementById("team2").innerHTML = document.getElementById("M2T2").innerHTML;
		else  document.getElementById("team2").innerHTML = document.getElementById("M2T1").innerHTML;

		OnPosNow = "M2";
		limitPass = meias;
   	});

	$("#FinalMainDiv").dblclick(function(){
		var randNum =  Math.floor((Math.random() * 50) + 1);
		if(randNum>25) document.getElementById("team1").innerHTML = document.getElementById("F1T1").innerHTML;
		else  document.getElementById("team1").innerHTML = document.getElementById("F1T2").innerHTML;

		if(randNum>25) document.getElementById("team2").innerHTML = document.getElementById("F1T2").innerHTML;
		else  document.getElementById("team2").innerHTML = document.getElementById("F1T1").innerHTML;

		OnPosNow = "F1";
		limitPass = final;
   	});

	$("#terceirosMainDiv").dblclick(function(){
		var randNum =  Math.floor((Math.random() * 50) + 1);
		if(randNum>25) document.getElementById("team1").innerHTML = document.getElementById("T1T1").innerHTML;
		else  document.getElementById("team1").innerHTML = document.getElementById("T1T2").innerHTML;

		if(randNum>25) document.getElementById("team2").innerHTML = document.getElementById("T1T2").innerHTML;
		else  document.getElementById("team2").innerHTML = document.getElementById("T1T1").innerHTML;

		OnPosNow = "T1";
		limitPass = terceiro;
   	});



			function addPositionTeam(positT,nameT,vitoriasT,otherTeam)
			{
				console.log("addPositionTeam "+positT+" - "+nameT+" - "+vitoriasT+" - "+otherTeam+" - "+limitPass);
				if(vitoriasT>=limitPass)
				{
					var goTo = "";
					if(positT == "O1") goTo = "Q1T1";
					else if(positT == "O2") goTo = "Q1T2";
					else if(positT == "O3") goTo = "Q2T1";
					else if(positT == "O4") goTo = "Q2T2";
					else if(positT == "O5") goTo = "Q3T1";
					else if(positT == "O6") goTo = "Q3T2";
					else if(positT == "O7") goTo = "Q4T1";
					else if(positT == "O8") goTo = "Q4T2";

					else if(positT == "Q1") goTo = "M1T1";
					else if(positT == "Q2") goTo = "M1T2";
					else if(positT == "Q3") goTo = "M2T1";
					else if(positT == "Q4") goTo = "M2T2";

					else if(positT == "M1") goTo = "F1T1";
					else if(positT == "M2") goTo = "F1T2";
					else if(positT == "T1") 
					{

						if(document.getElementById("T1T1").innerHTML == nameT){
							document.getElementById("T1T1L").innerHTML = "";
							document.getElementById("T1T1DIV").style.width = "100%";
							document.getElementById("T1T1DIV").style.height = "60%";
							document.getElementById("T1T2DIV").style.display = "none";
						}
						else{
							document.getElementById("T1T2L").innerHTML = "";
							document.getElementById("T1T2DIV").style.width = "100%";
							document.getElementById("T1T2DIV").style.height = "60%";
							document.getElementById("T1T1DIV").style.display = "none";
						}
						document.getElementById("VSFT").style.display = "none";

					}
					else if(positT == "F1") 
					{
						document.getElementById("winner").innerHTML = nameT;
						document.getElementById("winner").style.display = "inherit";
					}

					if(positT != "T1" && positT != "F1")
					{
						console.log("goTo: "+goTo+" name:"+nameT);
						$.post( "addposition.php", {
						pos:goTo,name:nameT
						})
						.done(function( data ) {
							console.log(data);
							//alert(data);
						});
					}

					if(goTo=="F1T1")
					{
						document.getElementById("F1T1").innerHTML = nameT;
						document.getElementById("F1T1L").innerHTML = "0";

						$.post( "addposition.php", {
							pos:"T1T1",name:otherTeam
							})
							.done(function( data ) {
								console.log(data);
								//alert(data);
							});

						document.getElementById("T1T1").innerHTML = otherTeam;
						document.getElementById("T1T1L").innerHTML = "0";
					}
					else if(goTo=="F1T2")
					{
						document.getElementById("F1T2").innerHTML = nameT;
						document.getElementById("F1T2L").innerHTML = "0";

						$.post( "addposition.php", {
							pos:"T1T2",name:otherTeam
							})
							.done(function( data ) {
								console.log(data);
								//alert(data);
							});

						document.getElementById("T1T2").innerHTML = otherTeam;
						document.getElementById("T1T2L").innerHTML = "0";
					}
					else 
					{
						document.getElementById(goTo).innerHTML = nameT;
						document.getElementById(goTo+"L").innerHTML = "0";
					}

					console.log("goTo: "+goTo);
			}
		}
});


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function generateTeams()
{
   /*var NomesNovaOrdem = new Array();
   var IdsNovaOrdem = new Array();*/

   var NomesNovaOrdem = "";
   var IdsNovaOrdem = "";

   var arrayNum = new Array();
   for(var i=0;i<16;i++)
   {
	   arrayNum[i] = i;
   }

   shuffle(arrayNum);

   $.post( "clean.php", {
   	check:"RoboParty"
	})
	.done(function( data ) {
		console.log(data);
	});

    var num = 0;
	document.getElementById("O1T1").innerHTML = nomeFinal[arrayNum[num]];
	/*NomesNovaOrdem[num] = nomeFinal[arrayNum[num]];
	IdsNovaOrdem[num] = idTeamFinal[arrayNum[num]];*/
	NomesNovaOrdem += nomeFinal[arrayNum[num]]+",";
	IdsNovaOrdem += idTeamFinal[arrayNum[num]]+",";
	num++;
	document.getElementById("O1T2").innerHTML = nomeFinal[arrayNum[num]];
	NomesNovaOrdem += nomeFinal[arrayNum[num]]+",";
	IdsNovaOrdem += idTeamFinal[arrayNum[num]]+",";
	num++;
	document.getElementById("O2T1").innerHTML = nomeFinal[arrayNum[num]];
	NomesNovaOrdem += nomeFinal[arrayNum[num]]+",";
	IdsNovaOrdem += idTeamFinal[arrayNum[num]]+",";
	num++;
	document.getElementById("O2T2").innerHTML = nomeFinal[arrayNum[num]];
	NomesNovaOrdem += nomeFinal[arrayNum[num]]+",";
	IdsNovaOrdem += idTeamFinal[arrayNum[num]]+",";
	num++;
	document.getElementById("O3T1").innerHTML = nomeFinal[arrayNum[num]];
	NomesNovaOrdem += nomeFinal[arrayNum[num]]+",";
	IdsNovaOrdem += idTeamFinal[arrayNum[num]]+",";
	num++;
	document.getElementById("O3T2").innerHTML = nomeFinal[arrayNum[num]];
	NomesNovaOrdem += nomeFinal[arrayNum[num]]+",";
	IdsNovaOrdem += idTeamFinal[arrayNum[num]]+",";
	num++;
	document.getElementById("O4T1").innerHTML = nomeFinal[arrayNum[num]];
	NomesNovaOrdem += nomeFinal[arrayNum[num]]+",";
	IdsNovaOrdem += idTeamFinal[arrayNum[num]]+",";
	num++;
	document.getElementById("O4T2").innerHTML = nomeFinal[arrayNum[num]];
	NomesNovaOrdem += nomeFinal[arrayNum[num]]+",";
	IdsNovaOrdem += idTeamFinal[arrayNum[num]]+",";
	num++;
	document.getElementById("O5T1").innerHTML = nomeFinal[arrayNum[num]];
	NomesNovaOrdem += nomeFinal[arrayNum[num]]+",";
	IdsNovaOrdem += idTeamFinal[arrayNum[num]]+",";
	num++;
	document.getElementById("O5T2").innerHTML = nomeFinal[arrayNum[num]];
	NomesNovaOrdem += nomeFinal[arrayNum[num]]+",";
	IdsNovaOrdem += idTeamFinal[arrayNum[num]]+",";
	num++;
	document.getElementById("O6T1").innerHTML = nomeFinal[arrayNum[num]];
	NomesNovaOrdem += nomeFinal[arrayNum[num]]+",";
	IdsNovaOrdem += idTeamFinal[arrayNum[num]]+",";
	num++;
	document.getElementById("O6T2").innerHTML = nomeFinal[arrayNum[num]];
	NomesNovaOrdem += nomeFinal[arrayNum[num]]+",";
	IdsNovaOrdem += idTeamFinal[arrayNum[num]]+",";
	num++;
	document.getElementById("O7T1").innerHTML = nomeFinal[arrayNum[num]];
	NomesNovaOrdem += nomeFinal[arrayNum[num]]+",";
	IdsNovaOrdem += idTeamFinal[arrayNum[num]]+",";
	num++;
	document.getElementById("O7T2").innerHTML = nomeFinal[arrayNum[num]];
	NomesNovaOrdem += nomeFinal[arrayNum[num]]+",";
	IdsNovaOrdem += idTeamFinal[arrayNum[num]]+",";
	num++;
	document.getElementById("O8T1").innerHTML = nomeFinal[arrayNum[num]];
	NomesNovaOrdem += nomeFinal[arrayNum[num]]+",";
	IdsNovaOrdem += idTeamFinal[arrayNum[num]]+",";
	num++;
	document.getElementById("O8T2").innerHTML = nomeFinal[arrayNum[num]];
	NomesNovaOrdem += nomeFinal[arrayNum[num]];
	IdsNovaOrdem += idTeamFinal[arrayNum[num]];

	document.getElementById("nomesTeam").value = NomesNovaOrdem;
	document.getElementById("idsTeam").value = IdsNovaOrdem;
	document.getElementById("saveNewsTeamsForm").submit();

	/*document.getElementById("O1T1L").innerHTML = "0";
	document.getElementById("O1T2L").innerHTML = "0";
	document.getElementById("O2T1L").innerHTML = "0";
	document.getElementById("O2T2L").innerHTML = "0";
	document.getElementById("O3T1L").innerHTML = "0";
	document.getElementById("O3T2L").innerHTML = "0";
	document.getElementById("O4T1L").innerHTML = "0";
	document.getElementById("O4T2L").innerHTML = "0";
	document.getElementById("O5T1L").innerHTML = "0";
	document.getElementById("O5T2L").innerHTML = "0";
	document.getElementById("O6T1L").innerHTML = "0";
	document.getElementById("O6T2L").innerHTML = "0";
	document.getElementById("O7T1L").innerHTML = "0";
	document.getElementById("O7T2L").innerHTML = "0";
	document.getElementById("O8T1L").innerHTML = "0";
	document.getElementById("O8T2L").innerHTML = "0";

	document.getElementById("Q1T1").innerHTML = "";
	document.getElementById("Q1T2").innerHTML = "";
	document.getElementById("Q2T1").innerHTML = "";
	document.getElementById("Q2T2").innerHTML = "";
	document.getElementById("Q3T1").innerHTML = "";
	document.getElementById("Q3T2").innerHTML = "";
	document.getElementById("Q4T1").innerHTML = "";
	document.getElementById("Q4T2").innerHTML = "";
	document.getElementById("M1T1").innerHTML = "";
	document.getElementById("M1T2").innerHTML = "";
	document.getElementById("M2T1").innerHTML = "";
	document.getElementById("M2T2").innerHTML = "";
	document.getElementById("F1T1").innerHTML = "";
	document.getElementById("F1T2").innerHTML = "";
	document.getElementById("T1T1").innerHTML = "";
	document.getElementById("T1T2").innerHTML = "";

	document.getElementById("Q1T1L").innerHTML = "";
	document.getElementById("Q1T2L").innerHTML = "";
	document.getElementById("Q2T1L").innerHTML = "";
	document.getElementById("Q2T2L").innerHTML = "";
	document.getElementById("Q3T1L").innerHTML = "";
	document.getElementById("Q3T2L").innerHTML = "";
	document.getElementById("Q4T1L").innerHTML = "";
	document.getElementById("Q4T2L").innerHTML = "";
	document.getElementById("M1T1L").innerHTML = "";
	document.getElementById("M1T2L").innerHTML = "";
	document.getElementById("M2T1L").innerHTML = "";
	document.getElementById("M2T2L").innerHTML = "";
	document.getElementById("F1T1L").innerHTML = "";
	document.getElementById("F1T2L").innerHTML = "";
	document.getElementById("T1T1L").innerHTML = "";
	document.getElementById("T1T2L").innerHTML = "";*/
}

function setResults()
{
	for(var i=0;i<posResult.length;i++){

		document.getElementById(posResult[i]).innerHTML = valorResult[i];
	}
}

function resetSemafros()
{
	count1 = 1;
	count2 = 1;
	document.getElementById("semafro1").style.backgroundColor = "rgba(231,138,20,1.00)";
	document.getElementById("semafro2").style.backgroundColor = "rgba(231,138,20,1.00)";
	document.getElementById("semafro3").style.backgroundColor = "rgba(231,138,20,1.00)";
	document.getElementById("semafro21").style.backgroundColor = "rgba(231,138,20,1.00)";
	document.getElementById("semafro22").style.backgroundColor = "rgba(231,138,20,1.00)";
	document.getElementById("semafro23").style.backgroundColor = "rgba(231,138,20,1.00)";
	desqualify1 = false;
	desqualify2 = false;
}
