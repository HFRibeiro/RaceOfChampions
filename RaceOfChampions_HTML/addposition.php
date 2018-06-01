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
		}

	}
	catch (PDOException $e) {
		echo "Error: " . $e->getMessage() . "<br />\n";
	}


	$query = "UPDATE `".$banco_dados."`.`finalsteams` SET `positions` = '".$oldPos."' WHERE `finalsteams`.`nomeTeam` = '".$name."';";
	try
	{
		$stmt = $pdo->prepare($query);
		$data = $stmt->execute();
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
	}
	catch (PDOException $e) {
		echo "Error: " . $e->getMessage() . "<br />\n";
	}


}
catch(PDOException $ex){
	die(json_encode(array('outcome' => false, 'message' => 'Unable to connect')));
}
?>
