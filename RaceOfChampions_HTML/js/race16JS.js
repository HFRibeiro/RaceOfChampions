// JavaScript Document
$(document).on("scroll",function(){
});

var maxima = false;

var startTime,interval,checkConc,checkConectTime = 300 ;

var DebugTime1 = true, DebugTime2 = true,start = false;

var $container;

var tempTime1 = 0,tempTime2= 0;

var oldState = 0;

var desqualify1 = false,desqualify2 = false;
var id1ONRace = 0,id2ONRace = 0;


$(document).ready(function() {

	document.getElementById("barcodeBlue").focus();

	$("#bt_accept_blue").click(function(){
		var ID_team = document.getElementById("barcodeBlue").value;
		if(ID_team!="") setTeamBlue(getPositionID(ID_team));
		else alert("Select a team ID!");
	});

	$("#bt_accept_red").click(function(){
		var ID_team = document.getElementById("barcodeRed").value;
		if(ID_team!="") setTeamRed(getPositionID(ID_team));
		else alert("Select a team ID!");
	});

	$("#barcodeBlue").keydown(function(e){
	        if(e.which==17 || e.which==74){
	            e.preventDefault();
	        }
					else if(e.which==13)
					{
						e.preventDefault();
						var ID_team = document.getElementById("barcodeBlue").value;
						setTeamBlue(getPositionID(ID_team));
						document.getElementById("barcodeRed").focus();
					}
					else{
	            //console.log("Blue: "+e.which);
	        }
	    });

			$("#barcodeRed").keydown(function(e){
							if(e.which==17 || e.which==74){
									e.preventDefault();
							}
							else if(e.which==13)
							{
									e.preventDefault();
									var ID_team = document.getElementById("barcodeRed").value;
									setTeamRed(getPositionID(ID_team));
									document.getElementById("barcodeBlue").focus();
							}
							else{
									//console.log("Red: "+e.which);
							}
					});

	acertAltura(innerHeight);

	$("body").css("display", "none");
            $("body").fadeIn(1500);

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

	for(var k=0;k<Nvoltas;k++)
	{
		$("<style type='text/css'> .class"+k+"{ background:"+Colors[k]+";} </style>").appendTo("body");
	}

	 $('.masterTooltip').hover(function(){

                var title = $(this).attr('title');
                $(this).data('tipText', title).removeAttr('title');
                $('<p class="tooltip"></p>')
                .text(title)
                .appendTo('body')
                .fadeIn('slow');
        }, function() {
                // Hover out code
                $(this).attr('title', $(this).data('tipText'));
                $('.tooltip').remove();
        }).mousemove(function(e) {
                var mousex = e.pageX + 20; //Get X coordinates
                var mousey = e.pageY + 10; //Get Y coordinates
                $('.tooltip')
                .css({ top: mousey, left: mousex })
        });

  $("#configs").click(function(){
	  window.location.href = "index.php";
   });

   $("#finals").click(function(){
	   if(nome.length<16) alert("To go to the final 16 teams are required!");
	  else {
		  var r = confirm("To clean all data press OK, to use old data press Cancel");
			if (r == true) {
				$.post( "clean.php", {
				check:"RoboParty"
				})
				.done(function( data ) {
					window.location.href = "checkfinals.php";
				});
			} else {
				window.location.href = "finals.php";
			}

	  }
   });

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

    $("#team1").dblclick(function(){
		this.innerHTML = "";
		this.style.backgroundImage = "";
		document.getElementById("team1").className = "";
		document.getElementById('Timeteam1').innerHTML = "00:00:000";
		$("#item"+this.value).fadeIn(1000);
		var delay=1050; //1 seconds
		setTimeout(function(){
		 $container.isotope({ sortBy: "date" });
		}, delay);
		/*document.getElementById().style.display = "inherit";
		$container.isotope({ sortBy: "date" });*/
    });
	$("#team2").dblclick(function(){
		this.innerHTML = "";
		this.style.backgroundImage = "";
		document.getElementById("team2").className = "";
		document.getElementById('Timeteam2').innerHTML = "00:00:000";
		document.getElementById("item"+this.value).style.display = "inherit";
		$container.isotope({ sortBy: "date" });
    });

	$("#setup").click(function(){
		doSend("S");
		clearInterval(interval);
		document.getElementById('Timeteam1').innerHTML = "00:00:000";
  		document.getElementById('Timeteam2').innerHTML = "00:00:000";
		document.getElementById("team1").style.backgroundImage = "";
		document.getElementById("team2").style.backgroundImage = "";

		//Semafros
		resetSemafros();
		/////////////////

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


			}, Step3);

			//GetReady
			document.getElementById("GetReady").style.display = "inherit";
			//$("#GetReady").fadeIn(500);

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
	$("#validate").click(function(){
	if(!DebugTime1 && !DebugTime2)
	{

		var tempoTeam1 = document.getElementById("Timeteam1").innerHTML;
		var partsOfStr1 = tempoTeam1.split(':');
		var partsOfStr1TMP = tempTime1.split(':');
		var id1 = document.getElementById("team1").value;
		var date1 = document.getElementById("date"+id1);

		var tempoTeam2 = document.getElementById("Timeteam2").innerHTML;
		var partsOfStr2 = tempoTeam2.split(':');
		var partsOfStr2TMP = tempTime2.split(':');
		var id2 = document.getElementById("team2").value;
		var date2 = document.getElementById("date"+id2);

		var minuteRand1 = parseFloat(partsOfStr1[0]).toFixed(0);
		var secondRand1 = parseFloat(partsOfStr1[1]).toFixed(0);
		var miliRand1 = parseFloat(partsOfStr1[2]).toFixed(0);
		if(minuteRand1<10) minuteRand1 = "0"+minuteRand1;
		if(secondRand1<10) secondRand1 = "0"+secondRand1;
		if(miliRand1<10) miliRand1 = "00"+miliRand1;
		else if(miliRand1>10 && miliRand1<100) miliRand1 = "0"+miliRand1;

		var dats1 = minuteRand1+secondRand1+miliRand1;
		var dats1TMP = partsOfStr1TMP[0]+partsOfStr1TMP[1]+partsOfStr1TMP[2];

		var minuteRand2 = parseFloat(partsOfStr2[0]).toFixed(0);
		var secondRand2 = parseFloat(partsOfStr2[1]).toFixed(0);
		var miliRand2 = parseFloat(partsOfStr2[2]).toFixed(0);
		if(minuteRand2<10) minuteRand2 = "0"+minuteRand2;
		if(secondRand2<10) secondRand2 = "0"+secondRand2;
		if(miliRand2<10) miliRand2 = "00"+miliRand2;
		else if(miliRand2>10 && miliRand2<100) miliRand2 = "0"+miliRand2;

		var dats2 = minuteRand2+secondRand2+miliRand2;
		var dats2TMP = partsOfStr2TMP[0]+partsOfStr2TMP[1]+partsOfStr2TMP[2];
		var displ1 = "",displ2 = "";

		if(dats1<dats1TMP){
			//alert("Change TMP1 :"+dats1+"-"+dats1TMP);
			document.getElementById("date"+id1).value = parseFloat(dats1).toFixed(0);
			displ1 = minuteRand1+":"+ secondRand1 +":"+ miliRand1;
			document.getElementById("date"+id1).innerHTML = displ1;

		}
		else{
			 //alert("NOT Change TMP1");
			 displ1 = tempTime1;
		}

		if(dats2<dats2TMP){
			//alert("Change TMP2 :"+dats2+"-"+dats2TMP);
			document.getElementById("date"+id2).value = parseFloat(dats2).toFixed(0);
			displ2 = minuteRand2+":"+ secondRand2 +":"+ miliRand2;
			document.getElementById("date"+id2).innerHTML = displ2;

		}
		else {
			//alert("NOT Change TMP2");
			displ2 = tempTime2;
		}

		var idT1 = parseFloat(id1)+1;
		var idT2 = parseFloat(id2)+1;

		var voltasId1 = document.getElementById("item"+id1).name;
		var voltasId2 = document.getElementById("item"+id2).name;


		voltasId1++;
		voltasId2++;

		$('#item'+id1).addClass("class"+voltasId1);
		$('#item'+id2).addClass("class"+voltasId2);

		document.getElementById("item"+id1).name = voltasId1;
		document.getElementById("item"+id2).name = voltasId2;

		$.post( "updateTime.php", {
				id:id1ONRace , tempo: displ1, voltas: voltasId1
				})
			  .done(function( data ) {

				//alert(id1ONRace+": "+data);
			  });

		$.post( "updateTime.php", {
				id: id2ONRace, tempo: displ2, voltas: voltasId2
				})
			  .done(function( data ) {
				//alert(id2ONRace+": "+data);
			  });

		document.getElementById("team1").innerHTML = "";
		document.getElementById("team2").innerHTML = "";
		document.getElementById("Timeteam1").innerHTML = "00:00:000";
		document.getElementById("Timeteam2").innerHTML = "00:00:000";

		document.getElementById("item"+id1).style.display = "inherit";
		document.getElementById("item"+id2).style.display = "inherit";


		document.getElementById("team1").className = "";
		document.getElementById("team2").className = "";
		document.getElementById("team1").style.backgroundImage = "";
		document.getElementById("team2").style.backgroundImage = "";


		$container.isotope('updateSortData').isotope();

		$container.isotope({ sortBy: "date" });

		//Semafros
		resetSemafros();
		/////////////////

		document.getElementById("barcodeBlue").focus();
	}

    });
	$("#change_color").click(function(){
		doSend("T");
    });
	$("#endTime1").click(function(){
		DebugTime1 = false;
		if(!DebugTime1 && !DebugTime2){
			 clearInterval(interval);
			 start = false;
		}
    });
	$("#endTime2").click(function(){
		DebugTime2 = false;
		if(!DebugTime1 && !DebugTime2){
			 clearInterval(interval);
			 start = false;
		}
    });

	$("#Disqualify1").click(function(){
		if(document.getElementById("team1").innerHTML!=""){
			DebugTime1 = false;
			desqualify1 = true;
			doSend("b");
			//document.getElementById("Timeteam1").innerHTML = "59:59:999";
			document.getElementById("team1").style.backgroundImage =  "url(imagens/disqualified.png)";
		}
		else alert("Select a team first!");
    });
	$("#Disqualify2").click(function(){
		if(document.getElementById("team2").innerHTML!=""){
		DebugTime2 = false;
		desqualify2 = true;
		doSend("r");
		//document.getElementById("Timeteam2").innerHTML = "59:59:999";
		document.getElementById("team2").style.backgroundImage =  "url(imagens/disqualified.png)";
		}
		else alert("Select a team first!");
    });

   			for(var i=0;i<id.length;i++)
			{
						var painel = document.getElementById("TeamsDiv");
						var a = document.createElement('li');
						a.id = "item"+i;
						a.name = voltas[i];
						a.className = "table-like__item class"+voltas[i];
						a.ondblclick = function()
						{
							if(this.name<Nvoltas-1){

								var id = this.id.replace("item", "");
								if(document.getElementById("team1").innerHTML == "")
								{
									document.getElementById("team1").className = "hvr-overline-from-center";
									document.getElementById("team1").innerHTML = "("+document.getElementById("number"+id).value+") "+document.getElementById("name"+id).innerHTML;
									document.getElementById("team1").value = id;
									id1ONRace = document.getElementById("number"+id).value;
									tempTime1 = document.getElementById("date"+id).innerHTML;
									//alert("tempTime1: "+tempTime1);
									$("#"+this.id).fadeOut(1000);
									var delay=1050; //1 seconds
									setTimeout(function(){
									 $container.isotope({ sortBy: "date" });
									}, delay);

								}
								else if(document.getElementById("team2").innerHTML == "")
								{
									document.getElementById("team2").className = "hvr-underline-from-center";
									document.getElementById("team2").innerHTML = "("+document.getElementById("number"+id).value+") "+document.getElementById("name"+id).innerHTML;
									document.getElementById("team2").value = id;
									id2ONRace = document.getElementById("number"+id).value;
									tempTime2 = document.getElementById("date"+id).innerHTML;
									//alert("tempTime2: "+tempTime2);
									$("#"+this.id).fadeOut(1000);
									var delay=1050; //1 seconds
									setTimeout(function(){
									 $container.isotope({ sortBy: "date" });
									}, delay);
								}
							}
							else alert("This team has completed the maximum number of laps");
						};
						painel.appendChild(a);

						var b = document.createElement('div');
						b.id = "number"+i;
						b.className = "number";
						b.innerHTML = "ID:"+id[i];
						b.value = id[i];
						b.onclick = function()
						{
						};
						a.appendChild(b);

						var d = document.createElement('div');
						d.id = "name"+i;
						d.className = "name";
						d.innerHTML = nome[i];
						d.onclick = function()
						{
						};
						a.appendChild(d);

						var e = document.createElement('div');
						e.id = "vlt"+i;
						e.className = "vlt";
						e.value = voltas[i];
						a.appendChild(e);

						var c = document.createElement('div');
						c.id = "date"+i;
						c.className = "date";
						var partsOfStr = tempo[i].split(':');
						//year, month, day, hours, minutes, seconds, milliseconds
						var minuteRand = parseFloat(partsOfStr[0]).toFixed(0);
						var secondRand = parseFloat(partsOfStr[1]).toFixed(0);
						var miliRand = parseFloat(partsOfStr[2]).toFixed(0);
						if(minuteRand<10) minuteRand = "0"+minuteRand;
						if(secondRand<10) secondRand = "0"+secondRand;
						if(miliRand<10) miliRand = "00"+miliRand;
						else if(miliRand>10 && miliRand<100) miliRand = "0"+miliRand;
						//var dats = new Date(2000, 1, 1, 1, minuteRand, secondRand, miliRand);
						var dats = parseFloat((minuteRand+secondRand+miliRand)).toFixed(0);
						c.innerHTML =  tempo[i];
						c.value = dats;
						c.onclick = function()
						{
							//alert(this.value);
						};
						a.appendChild(c);
			}

		$container = $('.table-like').isotope({
		layoutMode: 'vertical',
		getSortData: {
		  number: function( itemElem ) {
			return parseInt($( itemElem ).find('.number').val());
		  },
		  vlt: function( itemElem ) {
			return parseInt($( itemElem ).find('.vlt').val());
		  },
		  name: '.name',
		  date: function( itemElem ) {
			return parseInt($( itemElem ).find('.date').val());
		  }
		}
	  });



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

	function acertAltura(altura) {
	document.getElementById("topPub").style.height = altura*0.15;
	document.getElementById("bottomPub").style.height = altura*0.1;
	document.getElementById("TeamsDiv").style.marginTop = altura*0.11;
	document.getElementById("TeamsDiv").style.marginBottom = altura*0.09;
	document.getElementById("RigthSquareDiv").style.marginTop = altura*0.11;
	document.getElementById("RigthSquareDiv").style.height = altura*0.78;
	document.getElementById("Timeteam1").style.lineHeight = $("#Timeteam1").height()+"px";
	document.getElementById("Timeteam2").style.lineHeight = $("#Timeteam2").height()+"px";
	document.getElementById("team1").style.lineHeight = $("#team1").height()+"px";
	document.getElementById("team2").style.lineHeight = $("#team2").height()+"px";

	var elements = document.getElementsByClassName("bts");
	for (var i = 0; i < elements.length; i++) {
		elements[i].style.lineHeight = $(elements[i]).height()+"px";
	}
		elements = document.getElementsByClassName("btsM");
		for (var i = 0; i < elements.length; i++) {
			elements[i].style.lineHeight = $(elements[i]).height()+"px";
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


	$container.isotope({ sortBy: "date" });

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

	var elements = document.getElementsByClassName("bts");
	for (var i = 0; i < elements.length; i++) {
		elements[i].style.lineHeight = $(elements[i]).height()+"px";
	}
	elements = document.getElementsByClassName("btsM");
	for (var i = 0; i < elements.length; i++) {
		elements[i].style.lineHeight = $(elements[i]).height()+"px";
	}


});

function changeOrdem()
{
	if(document.getElementById("selc").selectedIndex == 0)
	{
		$container.isotope({ sortBy: "date" });
	}
	else if(document.getElementById("selc").selectedIndex == 1)
	{
		$container.isotope({ sortBy: "name" });
	}
	else if(document.getElementById("selc").selectedIndex == 2)
	{
		$container.isotope({ sortBy: "vlt" });
	}
	else
	{
		$container.isotope({ sortBy: "number" });
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

function changeBarcodeBlue()
{
		//alert(document.getElementById("barcodeBlue").value);
}

function changeBarcodeRed()
{
	//alert(document.getElementById("barcodeRed").value);
}

function getPositionID(id_team)
{
	for(var i=0;i<nome.length;i++)
	{
		if(document.getElementById("number"+i).value==id_team)
		{
			//alert(document.getElementById("number"+i).value+"POS: "+i);
			return i;
		}
		//else console.log(document.getElementById("number"+i).value);
	}
	return 0;
}

function setTeamBlue(id)
{
	if(document.getElementById("item"+id).name<Nvoltas-1)
	{
		if(document.getElementById("team1").innerHTML == "")
		{
			if(document.getElementById("team2").value!=id)
			{
				document.getElementById("team1").className = "hvr-overline-from-center";
				document.getElementById("team1").innerHTML = "("+document.getElementById("number"+id).value+") "+document.getElementById("name"+id).innerHTML;
				document.getElementById("team1").value = id;
				id1ONRace = document.getElementById("number"+id).value;
				tempTime1 = document.getElementById("date"+id).innerHTML;
				//alert("tempTime1: "+tempTime1);
				$("#item"+id).fadeOut(1000);
				var delay=1050; //1 seconds
				setTimeout(function(){
				 $container.isotope({ sortBy: "date" });
				}, delay);
			}
			else
			{
				document.getElementById("barcodeBlue").value = "";
				document.getElementById("barcodeBlue").focus();
				alert("Team already assigned to Red");
			}
		}
	}
	else alert("This team has completed the maximum number of laps");
}

function setTeamRed(id)
{
	if(document.getElementById("item"+id).name<Nvoltas-1)
	{
		if(document.getElementById("team2").innerHTML == "")
		{
			if(document.getElementById("team1").value!=id)
			{
					document.getElementById("team2").className = "hvr-underline-from-center";
					document.getElementById("team2").innerHTML = "("+document.getElementById("number"+id).value+") "+document.getElementById("name"+id).innerHTML;
					document.getElementById("team2").value = id;
					id2ONRace = document.getElementById("number"+id).value;
					tempTime2 = document.getElementById("date"+id).innerHTML;
					//alert("tempTime2: "+tempTime2);
					$("#item"+id).fadeOut(1000);
					var delay=1050; //1 seconds
					setTimeout(function(){
					 $container.isotope({ sortBy: "date" });
					}, delay);
			}
			else
			{
				document.getElementById("barcodeRed").value = "";
				document.getElementById("barcodeRed").focus();
				alert("Team already assigned to Blue");
			}
		}
	}
	else alert("This team has completed the maximum number of laps");
}
