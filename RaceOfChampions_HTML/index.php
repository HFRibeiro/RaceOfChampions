<html>
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
<link rel="stylesheet" type="text/css" href="css/indexCSS.css" />
<script src="js/jquery-1.10.2.js"></script>
<script>
	var id = new Array("<?php echo implode('","', $id);?>");
	var nome = new Array("<?php echo implode('","', $nome);?>");
	var tempo = new Array("<?php echo implode('","', $tempo);?>");
	var voltas = new Array("<?php echo implode('","', $voltas);?>");
	var Colors = new Array("<?php echo implode('","', $Colors);?>");
	var Nvoltas = Colors.length;
	var oitavos = <?php echo $oitavos;?>;
	var quartos = <?php echo $quartos;?>;
	var meias = <?php echo $meias;?>;
	var terceiro = <?php echo $terceiro;?>;
	var final = <?php echo $final;?>;
</script>
<script src="js/indexJS.js"></script>
<script src="js/isotope.pkgd.js"></script>
<script src="js/jscolor.js"></script>
<form id="saveForm" action="saveAll.php" method="post">
<body class="noselect">
<div id="MainPic" class="noselect">
<div id="TeamsDiv" class="table-like"></div>
<a id="lbTop">RoboParty RaceOfChampions Configuration</a><div id="TeamsControlDiv"><!--<a></a><a id="lb1"><br>Color Text 1: </a><input id="cor_texto_cabecalho" class="color" value="ff3300" autocomplete="off" onChange="mudou_cor_texto_cabecalho()">-->
<div id="Race16Config"></div>
<div id="FinalsConfig"><a>Final configuration:<br></a><a>The 8th Finals necessary victories to pass: </a><input type="number" class="numberinputs" value="<?php echo $oitavos; ?>" id="InputOitavos"/><br>
<a>Quarter Finals necessary victories to pass </a><input type="number" class="numberinputs" min="1" value="<?php echo $quartos; ?>" id="InputQuartos"/><br>
<a>Semis necessary victories to pass: </a><input type="number" class="numberinputs" min="1" value="<?php echo $meias; ?>" id="InputMeias"/><br>
<a>Necessary victories to win 3rd Place: </a><input type="number" class="numberinputs" min="1" value="<?php echo $terceiro; ?>" id="InputTerceiro"/><br>
<a>Necessary victories to win Final: </a><input type="number" class="numberinputs" min="1" value="<?php echo $final; ?>" id="InputFinal"/>
</div>
<div id="TeamEditOptions">
<div id="addTeam" class="bts" style="background-image:url(imagens/add.png);">Add Team</div>
<div id="saveAll" class="bts" style="background-image:url(imagens/saveall.png);">Save All</div>
<div id="startCompetition" class="bts" style="background-image:url(imagens/logo.png);">Start Race</div>
</div>
</div>
</div>
<div id="maxima"></div>
<div id="TeamEdit"><a style="margin-left:14vw;">ID: </a><input id="ID" type="number" placeholder="ID" class="inputsEdit"/>&nbsp;&nbsp;&nbsp;Name: <input id="NAME" type="text" placeholder="NAME" class="inputsEdit" style="width:8vw;"/>&nbsp;&nbsp;&nbsp;Time:<input id="MINUTES" type="number" placeholder="MINUTES" class="inputsEdit"/>:<input id="SECONDS" type="number" placeholder="SECONDS" class="inputsEdit" style="margin-left:0;"/>:<input id="MILISECONDS" type="number" placeholder="MILISECONDS" class="inputsEdit" style="margin-left:0;"/>&nbsp;&nbsp;&nbsp;Races:<input id="RACES" type="number" placeholder="RACES" class="inputsEdit"/><div id="saveTeam" class="bts " style="background-image:url(imagens/add.png); height:4vw; background-size:35%; width:8vw; margin-left:20%; margin-top:1%;">Add</div><div id="delete" class="bts" style="background-image:url(imagens/delete.png); height:4vw; background-size:35%; width:8vw; margin-left:5%; margin-top:1%;">Delete</div><div id="cancel" class="bts" style="background-image:url(imagens/cancel.png); height:4vw; background-size:35%; width:8vw; margin-left:5%; margin-top:1%;">Cancel</div></div>

</body>
<input type="hidden" name="TotalTeams" id="TotalTeams" />
<input type="hidden" name="TotalRaces" id="TotalRaces" />

<input type="hidden" name="oitavos" id="oitavos" />
<input type="hidden" name="quartos" id="quartos" />
<input type="hidden" name="meias" id="meias" />
<input type="hidden" name="terceiro" id="terceiro" />
<input type="hidden" name="final" id="final" />
</form>
</html>
