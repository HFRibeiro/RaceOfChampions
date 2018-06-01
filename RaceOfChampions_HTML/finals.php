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
			}

		}
		catch (PDOException $e) {
			echo "Error: " . $e->getMessage() . "<br />\n";
		}


			$Colors = explode(';', $colorsLaps);

			//////////////////////////////////////////////////////

			$query = "SELECT * FROM `finalsteams`";
			try
			{
				$stmt = $pdo->prepare($query);
				$data = $stmt->execute();
				$primary_search = $stmt->fetchAll();

				$k=0;
				Foreach($primary_search as $match)
				{
					$idFinal[$k] = $match['id'];
					$idTeamFinal[$k] = $match['idTeam'];
					$nomeFinal[$k] = $match['nomeTeam'];
					$positions[$k] = $match['positions'];
						$k++;
				}

			}
			catch (PDOException $e) {
				echo "Error: " . $e->getMessage() . "<br />\n";
			}



			//////////////////////////////////////////////////////

			$query = "SELECT * FROM `resultados_final`";
			try
			{
				$stmt = $pdo->prepare($query);
				$data = $stmt->execute();
				$primary_search = $stmt->fetchAll();

				$k=0;
				Foreach($primary_search as $match)
				{
					$posResult[$k] = $match['pos'];
					$valorResult[$k] = $match['valor'];
						$k++;
				}

			}
			catch (PDOException $e) {
				echo "Error: " . $e->getMessage() . "<br />\n";
			}

			//////////////////////////////////////////////////////

			$query = "SELECT * FROM `configs`";
			try
			{
				$stmt = $pdo->prepare($query);
				$data = $stmt->execute();
				$primary_search = $stmt->fetchAll();

				$k=0;
				Foreach($primary_search as $match)
				{
					if($match['nome'] == "oitavos") $oitavos = $match['valor'];
					if($match['nome'] == "quartos") $quartos = $match['valor'];
					if($match['nome'] == "meias") $meias = $match['valor'];
					if($match['nome'] == "terceiro") $terceiro = $match['valor'];
					if($match['nome'] == "final") $final = $match['valor'];
						$k++;
				}

			}
			catch (PDOException $e) {
				echo "Error: " . $e->getMessage() . "<br />\n";
			}

}
catch(PDOException $ex){
	die(json_encode(array('outcome' => false, 'message' => 'Unable to connect')));
}



?>
<link rel="stylesheet" type="text/css" href="css/hover.css" />
<link rel="stylesheet" type="text/css" href="css/finalsCSS.css?dummy=<?php echo rand(); ?>" />
<script src="js/jquery-1.10.2.js"></script>
<script src="js/ComunicationJS.js?dummy=<?php echo rand(); ?>"></script>
<script>
	var id = new Array("<?php echo implode('","', $id);?>");
	var nome = new Array("<?php echo implode('","', $nome);?>");
	var tempo = new Array("<?php echo implode('","', $tempo);?>");
	var voltas = new Array("<?php echo implode('","', $voltas);?>");
	var Colors = new Array("<?php echo implode('","', $Colors);?>");
	var Nvoltas = Colors.length;

	var idFinal = new Array("<?php echo implode('","', $idFinal);?>");
	var idTeamFinal = new Array("<?php echo implode('","', $idTeamFinal);?>");
	var nomeFinal = new Array("<?php echo implode('","', $nomeFinal);?>");
	var positions = new Array("<?php echo implode('","', $positions);?>");

	var posResult = new Array("<?php echo implode('","', $posResult);?>");
	var valorResult = new Array("<?php echo implode('","', $valorResult);?>");

	var oitavos = ("<?php echo $oitavos;?>");
	var quartos = ("<?php echo $quartos;?>");
	var meias = ("<?php echo $meias;?>");
	var terceiro = ("<?php echo $terceiro;?>");
	var final = ("<?php echo $final;?>");



</script>
<script src="js/finalsJS.js?dummy=<?php echo rand(); ?>"></script>


<body class="noselect">
<div id="MainPic" class="noselect">
<div id="topDiv"><div id="semafros1" class="semafros">
<div id="semafro1" class="semafro"></div>
<div id="semafro2" class="semafro"></div>
<div id="semafro3" class="semafro"></div>
</div>
<div id="team1"  class="hvr-overline-from-center"></div><div id="desqf1" class="desqbt">Disqualify1</div><div id="Timeteam1">00:00:000</div><div id="VS">VS</div><div id="Timeteam2">00:00:000</div><div id="buttonsDiv"><div id="setup" class="btsM hvr-float-shadow">Setup</div><div id="start" class="btsM hvr-float-shadow">Start</div><div id="validate" class="btsM hvr-float-shadow">Validate</div><div id="changeTrack" class="btsM hvr-float-shadow">Change Track</div><div id="generate" class="btsM hvr-float-shadow" style="font-size:1.1vw;">Randomize Teams</div></div><div id="semafros2" class="semafros">
<div id="semafro21" class="semafro"></div>
<div id="semafro22" class="semafro"></div>
<div id="semafro23" class="semafro"></div>
</div><div id="team2" class="hvr-overline-from-center2"></div><div id="desqf2" class="desqbt">Disqualify2</div>
<div id="middleDiv">
<div id="line1">
<div id="O1" class="oitavosCSS"><div class="OTeams"><a id="O1T1" ></a><a id="O1T1L" class="Victsotys">0</a></div><div id="O1Match" class="OVS">VS</div><div class="OTeams"><a id="O1T2" ></a><a id="O1T2L" class="Victsotys">0</a></div></div><div class="SepareOit"></div>
<div id="O2" class="oitavosCSS"><div  class="OTeams"><a id="O2T1" ></a><a id="O2T1L" class="Victsotys">0</a></div><div id="O2Match" class="OVS">VS</div><div class="OTeams"><a id="O2T2" ></a><a id="O2T2L" class="Victsotys">0</a></div></div><div class="SepareOit"></div>
<div id="O3" class="oitavosCSS"><div class="OTeams"><a id="O3T1" ></a><a id="O3T1L" class="Victsotys">0</a></div><div id="O3Match" class="OVS">VS</div><div class="OTeams"><a id="O3T2" ></a><a id="O3T2L" class="Victsotys">0</a></div></div><div class="SepareOit"></div>
<div id="O4" class="oitavosCSS"><div id="" class="OTeams"><a id="O4T1" ></a><a id="O4T1L" class="Victsotys">0</a></div><div id="O4Match" class="OVS">VS</div><div id="" class="OTeams"><a id="O4T2" ></a><a id="O4T2L" class="Victsotys">0</a></div></div>
</div>
<div id="line2">
<div id="Q1" class="quartosCSS"><div id="" class="QTeams"><a id="Q1T1" ></a><a id="Q1T1L" class="Victsotys"></a></div><div id="Q1Match" class="OVS2">VS</div><div id="" class="QTeams"><a id="Q1T2" ></a><a id="Q1T2L" class="Victsotys"></a></div></div>
<div id="Q2" class="quartosCSS moreSpace"><div id="" class="QTeams"><a id="Q2T1" ></a><a id="Q2T1L" class="Victsotys"></a></div><div id="Q2Match" class="OVS2">VS</div><div id="" class="QTeams"><a id="Q2T2" ></a><a id="Q2T2L" class="Victsotys"></a></div></div>
</div>
<div id="line3"><div class="spacerMeia"></div>
<div id="M1" class="meiasCSS"><div id="" class="MTeams"><a id="M1T1" ></a><a id="M1T1L" class="Victsotys"></a></div><div id="M1Match" class="OVS2" style="height:35%">VS</div><div id="" class="MTeams"><a id="M1T2" ></a><a id="M1T2L" class="Victsotys"></a></div></div>
</div>
<div id="line45"><div class="spacerFinal"></div>

<div id="FinalMainDiv"><div id="cupSpacer"></div>
<div id="" class="TeamFinals"><a id="F1T1" ></a><a id="F1T1L" class="Victsotys"></a></div><div id="VSF">VS</div><div id="" class="TeamFinals"><a id="F1T2" ></a><a id="F1T2L" class="Victsotys2"></a></div>
</div>

<div class="spacerFinal"></div>

<div id="terceirosMainDiv"><div id="Rd3Spacer"></div>
<div id="T1T1DIV" class="TeamFinals " ><a id="T1T1" ></a><a id="T1T1L" class="Victsotys"></a></div><div id="VSFT" >VS</div><div id="T1T2DIV" class="TeamFinals " ><a id="T1T2" ></a><a id="T1T2L" class="Victsotys2"></a></div>
</div>

</div>

<div id="line6"><div class="spacerMeia"></div>
<div id="M2" class="meiasCSS"><div id="" class="MTeams"><a id="M2T1" ></a><a id="M2T1L" class="Victsotys2"></a></div><div id="M2Match" class="OVS2" style="height:35%">VS</div><div id="" class="MTeams"><a id="M2T2" ></a><a id="M2T2L" class="Victsotys2"></a></div>
</div>
</div>
<div id="line7">
<div id="Q3" class="quartosCSS"><div id="" class="QTeams"><a id="Q3T1" ></a><a id="Q3T1L" class="Victsotys2"></a></div><div id="Q3Match" class="OVS2">VS</div><div id="" class="QTeams"><a id="Q3T2" ></a><a id="Q3T2L" class="Victsotys2"></a></div></div>
<div id="Q4" class="quartosCSS moreSpace"><div id="" class="QTeams"><a id="Q4T1" ></a><a id="Q4T1L" class="Victsotys2"></a></div><div id="Q4Match" class="OVS2">VS</div><div id="" class="QTeams"><a id="Q4T2" ></a><a id="Q4T2L" class="Victsotys2"></a></div></div>
</div>
<div id="line8">
<div id="O5" class="oitavosCSS"><div id="" class="OTeams"><a id="O5T1" ></a><a id="O5T1L" class="Victsotys2">0</a></div><div id="O5Match" class="OVS">VS</div><div id="" class="OTeams"><a id="O5T2" ></a><a id="O5T2L" class="Victsotys2">0</a></div></div><div class="SepareOit"></div>
<div id="O6" class="oitavosCSS"><div id="" class="OTeams"><a id="O6T1" ></a><a id="O6T1L" class="Victsotys2">0</a></div><div id="O6Match" class="OVS">VS</div><div id="" class="OTeams"><a id="O6T2" ></a><a id="O6T2L" class="Victsotys2">0</a></div></div><div class="SepareOit"></div>
<div id="O7" class="oitavosCSS"><div id="" class="OTeams"><a id="O7T1" ></a><a id="O7T1L" class="Victsotys2">0</a></div><div id="O7Match" class="OVS">VS</div><div id="" class="OTeams"><a id="O7T2" ></a><a id="O7T2L" class="Victsotys2">0</a></div></div><div class="SepareOit"></div>
<div id="O8" class="oitavosCSS"><div id="" class="OTeams"><a id="O8T1" ></a><a id="O8T1L" class="Victsotys2">0</a></div><div id="O8Match" class="OVS">VS</div><div id="" class="OTeams"><a id="O8T2" ></a><a id="O8T2L" class="Victsotys2">0</a></div></div><div class="SepareOit"></div>
</div>
</div>

</div>
</div>
<div id="maxima" class="masterTooltip" title="Maximize"></div>
<div id="winner">TEAM ONE</div>
<div id="GetReady">3</div>
<div id="bottomPub"><textarea id="debugTextArea"></textarea></div>
<div id="connection" title="Disconnected" ></div>
<div id="ruminho"></div>
<span id="ruler"></span>
<form id="saveNewsTeamsForm" action="saveNewsFinalTeam.php" method="post">
<input name="nomesTeam" id="nomesTeam" type="hidden"/>
<input name="idsTeam" id="idsTeam" type="hidden"/>
</form>
</body>

</html>
