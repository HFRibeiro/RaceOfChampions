<html>
<meta http-equiv=Content-Type content="text/html; charset=windows-1252">
<title>RaceOfChampions</title>
<link rel="shortcut icon" href="imagens/logo.png">
<?php
require('Dados_BD.php');

try{
$pdo = new pdo( 'mysql:host='.$servidor.';dbname='.$banco_dados.'',$user,$senha,array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));


$query = "SELECT * FROM `teams`";
try
{
	$stmt = $pdo->prepare($query);
	$data = $stmt->execute();
	$primary_search = $stmt->fetchAll();

	$k=0;
	Foreach($primary_search as $match)
	{
			$id[$k] = $match['id'];
			$nome[$k] = $match['nome'];
			$tempo[$k] = $match['tempo'];
			$voltas[$k] = $match['voltas'];
			$k++;
	}

}
catch (PDOException $e) {
	echo "Error: " . $e->getMessage() . "<br />\n";
}


$query = "SELECT * FROM `configs`";
try
{
	$stmt = $pdo->prepare($query);
	$data = $stmt->execute();
	$primary_search = $stmt->fetchAll();

	Foreach($primary_search as $match)
	{
		if($match['nome']=="colorsLaps"){
		$colorsLaps = $match['valor'];
		}
		else if($match['nome']=="oitavos"){
		$oitavos = $match['valor'];
		}
		else if($match['nome']=="quartos"){
		$quartos = $match['valor'];
		}
		else if($match['nome']=="meias"){
		$meias = $match['valor'];
		}
		else if($match['nome']=="terceiro"){
		$terceiro = $match['valor'];
		}
		else if($match['nome']=="final"){
		$final = $match['valor'];
		}
	}

}
catch (PDOException $e) {
	echo "Error: " . $e->getMessage() . "<br />\n";
}


}
catch(PDOException $ex){
	die(json_encode(array('outcome' => false, 'message' => 'Unable to connect')));
}


$Colors = explode(';', $colorsLaps);

?>
<link rel="stylesheet" type="text/css" href="css/hover.css" />
<link rel="stylesheet" type="text/css" href="css/race16CSS.css?dummy=<?php echo rand(); ?>" />
<script src="js/jquery-1.10.2.js"></script>
<script>
	var id = new Array("<?php echo implode('","', $id);?>");
	var nome = new Array("<?php echo implode('","', $nome);?>");
	var tempo = new Array("<?php echo implode('","', $tempo);?>");
	var voltas = new Array("<?php echo implode('","', $voltas);?>");
	var Colors = new Array("<?php echo implode('","', $Colors);?>");
	var Nvoltas = Colors.length;
</script>
<script src="js/ComunicationJS.js?dummy=<?php echo rand(); ?>"></script>
<script src="js/race16JS.js?dummy=<?php echo rand(); ?>"></script>
<script src="js/isotope.pkgd.js"></script>

<body class="noselect">
<div id="MainPic" class="noselect">
<div id="TeamsDiv" class="table-like"></div>
</div>
<div id="RigthSquareDiv">
<div id="semafros1" class="semafros">
<div id="semafro1" class="semafro"></div>
<div id="semafro2" class="semafro"></div>
<div id="semafro3" class="semafro"></div>
</div>
<div id="team1" class=""></div>
<div id="Disqlteam1" class="hvr-float-shadow"><div id="endTime1" class="bts">End1</div><div id="Disqualify1"  class="bts">Disqualify1</div></div>
<div id="Timeteam1">00:00:000</div>
<div id="buttons"><div id="setup" class="btsM hvr-float-shadow">Setup</div><div id="start" class="btsM hvr-float-shadow">Start</div><div id="validate" class="btsM hvr-float-shadow">Validate</div><div id="change_color" class="btsM hvr-float-shadow">Change Track</div></div>
<div id="Timeteam2">00:00:000</div>

<div id="Disqlteam2" class="hvr-float-shadow"><div id="endTime2"  class="bts">End2</div><div id="Disqualify2"  class="bts">Disqualify2</div></div>
<div id="semafros2" class="semafros">
<div id="semafro21" class="semafro"></div>
<div id="semafro22" class="semafro"></div>
<div id="semafro23" class="semafro"></div>
</div>
<div id="team2" class=""></div>
</div>
<div id="topPub">
<div id="ordenacao">Sort by:<select id="selc" onChange="changeOrdem()"><option>Time</option><option>Name</option><option>Races</option><option>ID</option></select></div>
<div id="brcode">BarCodeBlue:<input id="barcodeBlue" onChange="changeBarcodeBlue()"></input><div id="bt_accept_blue" class="bt_accept bts hvr-float-shadow">Accept Blue</div></div>
<div id="brcode2">BarCodeRed:<input id="barcodeRed" onChange="changeBarcodeRed()"></input><div id="bt_accept_red" class="bt_accept bts hvr-float-shadow">Accept Red</div></div>
</div>
<div id="scrollHide"></div>
<div id="bottomPub"><textarea id="debugTextArea"></textarea></div>
<div id="maxima"></div>
<div id="GetReady">3</div>
<div id="configs" class="masterTooltip" title="Back to configure"></div>
<div id="finals" class="masterTooltip" title="Navigate to finals"></div>
<div id="raceOfChamps">&nbsp;&nbsp;&nbsp;&nbsp;RoboParty RaceOfChampions Best10&nbsp;&nbsp;&nbsp;&nbsp;</div>
<div id="connection" title="Disconnected" ></div>
<div id="ruminho"></div>
</body>

</html>
