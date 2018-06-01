<?php

	require('Dados_BD.php');


	try{
	$pdo = new pdo( 'mysql:host='.$servidor.';dbname='.$banco_dados.'',$user,$senha,array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));

	$nome_tabela="finalsteams";
	$query = "DELETE FROM `".$nome_tabela."` WHERE 1;";
	try
	{
		$stmt = $pdo->prepare($query);
		$data = $stmt->execute();
	}
	catch (PDOException $e) {
		echo "Error: " . $e->getMessage() . "<br />\n";
	}

	$query = "ALTER TABLE `".$nome_tabela."` AUTO_INCREMENT = 1;";
	try
	{
		$stmt = $pdo->prepare($query);
		$data = $stmt->execute();
	}
	catch (PDOException $e) {
		echo "Error: " . $e->getMessage() . "<br />\n";
	}

	$nome_tabela="resultados_final";

	for($i=1;$i<9;$i++)
	{
		$query="UPDATE `".$banco_dados."`.`".$nome_tabela."` SET `valor` = '0' WHERE `resultados_final`.`pos` = 'O".$i."T1L';";
		try
		{
			$stmt = $pdo->prepare($query);
			$data = $stmt->execute();
		}
		catch (PDOException $e) {
			echo "Error: " . $e->getMessage() . "<br />\n";
		}
		$query="UPDATE `".$banco_dados."`.`".$nome_tabela."` SET `valor` = '0' WHERE `resultados_final`.`pos` = 'O".$i."T2L';";
		try
		{
			$stmt = $pdo->prepare($query);
			$data = $stmt->execute();
		}
		catch (PDOException $e) {
			echo "Error: " . $e->getMessage() . "<br />\n";
		}

	}

	for($i=1;$i<5;$i++)
	{
		$query="UPDATE `".$banco_dados."`.`".$nome_tabela."` SET `valor` = '' WHERE `resultados_final`.`pos` = 'Q".$i."T1L';";
		try
		{
			$stmt = $pdo->prepare($query);
			$data = $stmt->execute();
		}
		catch (PDOException $e) {
			echo "Error: " . $e->getMessage() . "<br />\n";
		}
		$query="UPDATE `".$banco_dados."`.`".$nome_tabela."` SET `valor` = '' WHERE `resultados_final`.`pos` = 'Q".$i."T2L';";
		try
		{
			$stmt = $pdo->prepare($query);
			$data = $stmt->execute();
		}
		catch (PDOException $e) {
			echo "Error: " . $e->getMessage() . "<br />\n";
		}
	}

	for($i=1;$i<3;$i++)
	{
		$query="UPDATE `".$banco_dados."`.`".$nome_tabela."` SET `valor` = '' WHERE `resultados_final`.`pos` = 'M".$i."T1L';";
		try
		{
			$stmt = $pdo->prepare($query);
			$data = $stmt->execute();
		}
		catch (PDOException $e) {
			echo "Error: " . $e->getMessage() . "<br />\n";
		}
		$query="UPDATE `".$banco_dados."`.`".$nome_tabela."` SET `valor` = '' WHERE `resultados_final`.`pos` = 'M".$i."T2L';";
		try
		{
			$stmt = $pdo->prepare($query);
			$data = $stmt->execute();
		}
		catch (PDOException $e) {
			echo "Error: " . $e->getMessage() . "<br />\n";
		}
	}

	$query="UPDATE `".$banco_dados."`.`".$nome_tabela."` SET `valor` = '' WHERE `resultados_final`.`pos` = 'T1T1L';";
	try
	{
		$stmt = $pdo->prepare($query);
		$data = $stmt->execute();
	}
	catch (PDOException $e) {
		echo "Error: " . $e->getMessage() . "<br />\n";
	}
	$query="UPDATE `".$banco_dados."`.`".$nome_tabela."` SET `valor` = '' WHERE `resultados_final`.`pos` = 'T1T2L';";
	try
	{
		$stmt = $pdo->prepare($query);
		$data = $stmt->execute();
	}
	catch (PDOException $e) {
		echo "Error: " . $e->getMessage() . "<br />\n";
	}

	$query="UPDATE `".$banco_dados."`.`".$nome_tabela."` SET `valor` = '' WHERE `resultados_final`.`pos` = 'F1T1L';";
	try
	{
		$stmt = $pdo->prepare($query);
		$data = $stmt->execute();
	}
	catch (PDOException $e) {
		echo "Error: " . $e->getMessage() . "<br />\n";
	}
	$query="UPDATE `".$banco_dados."`.`".$nome_tabela."` SET `valor` = '' WHERE `resultados_final`.`pos` = 'F1T2L';";
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
