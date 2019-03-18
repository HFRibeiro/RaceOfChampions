<?php
	$pos = $_POST['pos'];
	$name = $_POST['name'];
	require('Dados_BD.php');

	try{
	$pdo = new pdo( 'mysql:host='.$servidor.';dbname='.$banco_dados.'',$user,$senha,array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));


	$nome_tabela="finalsteams";

	$query = "SELECT * FROM `".$nome_tabela."` WHERE `finalsteams`.`nomeTeam` = '".$name."';";
	try
	{
		$stmt = $pdo->prepare($query);
		$data = $stmt->execute();
		$primary_search = $stmt->fetchAll();

		Foreach($primary_search as $match)
		{
			$oldPos = $match['positions'];
			$idTeam = $match['idTeam'];
		}

	}
	catch (PDOException $e) {
		echo "Error: " . $e->getMessage() . "<br />\n";
	}


	//$query = "UPDATE `".$banco_dados."`.`finalsteams` SET `positions` = '".$pos."' WHERE `finalsteams`.`nomeTeam` = '".$name."';";
	$query = "INSERT INTO `finalsteams` (`id`, `idTeam`, `nomeTeam`, `positions`) VALUES (NULL, '".$idTeam."', '".$name."', '".$pos."');";
	try
	{
		$stmt = $pdo->prepare($query);
		$data = $stmt->execute();
		echo $query."<br>";
	}
	catch (PDOException $e) {
		echo "Error: " . $e->getMessage() . "<br />\n";
	}


	////////////////////////////////////////////

	$query = "UPDATE `".$banco_dados."`.`resultados_final` SET `valor` = '0' WHERE `resultados_final`.`pos` = '".$pos."L';";
	try
	{
		$stmt = $pdo->prepare($query);
		$data = $stmt->execute();
		echo $query."<br>";
	}
	catch (PDOException $e) {
		echo "Error: " . $e->getMessage() . "<br />\n";
	}


}
catch(PDOException $ex){
	die(json_encode(array('outcome' => false, 'message' => 'Unable to connect')));
}
?>
