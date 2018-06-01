<?php

	require('Dados_BD.php');

	try{
	$pdo = new pdo( 'mysql:host='.$servidor.';dbname='.$banco_dados.'',$user,$senha,array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));

	$nome_tabela="finalsteams";
	$sql_select="DELETE FROM `".$nome_tabela."` WHERE 1;";
	$sql_select2="ALTER TABLE `".$nome_tabela."` AUTO_INCREMENT = 1;";

	try
	{
		$stmt = $pdo->prepare($sql_select);
		$data = $stmt->execute();
	}
	catch (PDOException $e) {
		echo "Error: " . $e->getMessage() . "<br />\n";
	}

	try
	{
		$stmt = $pdo->prepare($sql_select2);
		$data = $stmt->execute();
	}
	catch (PDOException $e) {
		echo "Error: " . $e->getMessage() . "<br />\n";
	}


	$nome_tabela="resultados_final";
	for($i=1;$i<9;$i++)
	{
		//$sql_select="UPDATE `".$banco_dados."`.`".$nome_tabela."` SET `valor` = '0' WHERE `resultados_final`.`pos` = 'O".$i."T1L';";
		$sql_select = "INSERT INTO `resultados_final` (`id`, `pos`, `valor`) VALUES (NULL, '0', 'O".$i."T1L');";
		try
		{
			$stmt = $pdo->prepare($sql_select);
			$data = $stmt->execute();
		}
		catch (PDOException $e) {
			echo "Error: " . $e->getMessage() . "<br />\n";
		}
		//$sql_select="UPDATE `".$banco_dados."`.`".$nome_tabela."` SET `valor` = '0' WHERE `resultados_final`.`pos` = 'O".$i."T2L';";
		$sql_select = "INSERT INTO `resultados_final` (`id`, `pos`, `valor`) VALUES (NULL, '0', 'O".$i."T2L');";
		try
		{
			$stmt = $pdo->prepare($sql_select);
			$data = $stmt->execute();
		}
		catch (PDOException $e) {
			echo "Error: " . $e->getMessage() . "<br />\n";
		}
	}

	for($i=1;$i<5;$i++)
	{
		$sql_select = "INSERT INTO `resultados_final` (`id`, `pos`, `valor`) VALUES (NULL, '0', 'Q".$i."T1L');";
		//$sql_select="UPDATE `".$banco_dados."`.`".$nome_tabela."` SET `valor` = '' WHERE `resultados_final`.`pos` = 'Q".$i."T1L';";
		try
		{
			$stmt = $pdo->prepare($sql_select);
			$data = $stmt->execute();
		}
		catch (PDOException $e) {
			echo "Error: " . $e->getMessage() . "<br />\n";
		}
		$sql_select = "INSERT INTO `resultados_final` (`id`, `pos`, `valor`) VALUES (NULL, '0', 'Q".$i."T2L');";
		//$sql_select="UPDATE `".$banco_dados."`.`".$nome_tabela."` SET `valor` = '' WHERE `resultados_final`.`pos` = 'Q".$i."T2L';";
		try
		{
			$stmt = $pdo->prepare($sql_select);
			$data = $stmt->execute();
		}
		catch (PDOException $e) {
			echo "Error: " . $e->getMessage() . "<br />\n";
		}
	}

	for($i=1;$i<3;$i++)
	{
		$sql_select = "INSERT INTO `resultados_final` (`id`, `pos`, `valor`) VALUES (NULL, '0', 'M".$i."T1L');";
		//$sql_select="UPDATE `".$banco_dados."`.`".$nome_tabela."` SET `valor` = '' WHERE `resultados_final`.`pos` = 'M".$i."T1L';";
		try
		{
			$stmt = $pdo->prepare($sql_select);
			$data = $stmt->execute();
		}
		catch (PDOException $e) {
			echo "Error: " . $e->getMessage() . "<br />\n";
		}
		$sql_select = "INSERT INTO `resultados_final` (`id`, `pos`, `valor`) VALUES (NULL, '0', 'M".$i."T2L');";
		//$sql_select="UPDATE `".$banco_dados."`.`".$nome_tabela."` SET `valor` = '' WHERE `resultados_final`.`pos` = 'M".$i."T2L';";
		try
		{
			$stmt = $pdo->prepare($sql_select);
			$data = $stmt->execute();
		}
		catch (PDOException $e) {
			echo "Error: " . $e->getMessage() . "<br />\n";
		}
	}

		//$sql_select="UPDATE `".$banco_dados."`.`".$nome_tabela."` SET `valor` = '' WHERE `resultados_final`.`pos` = 'T1T1L';";
		$sql_select = "INSERT INTO `resultados_final` (`id`, `pos`, `valor`) VALUES (NULL, '0', 'T1T1L');";
		try
		{
			$stmt = $pdo->prepare($sql_select);
			$data = $stmt->execute();
		}
		catch (PDOException $e) {
			echo "Error: " . $e->getMessage() . "<br />\n";
		}
		$sql_select = "INSERT INTO `resultados_final` (`id`, `pos`, `valor`) VALUES (NULL, '0', 'T1T2L');";
		//$sql_select="UPDATE `".$banco_dados."`.`".$nome_tabela."` SET `valor` = '' WHERE `resultados_final`.`pos` = 'T1T2L';";
		try
		{
			$stmt = $pdo->prepare($sql_select);
			$data = $stmt->execute();
		}
		catch (PDOException $e) {
			echo "Error: " . $e->getMessage() . "<br />\n";
		}

		$sql_select = "INSERT INTO `resultados_final` (`id`, `pos`, `valor`) VALUES (NULL, '0', 'F1T1L');";
		//$sql_select="UPDATE `".$banco_dados."`.`".$nome_tabela."` SET `valor` = '' WHERE `resultados_final`.`pos` = 'F1T1L';";
		try
		{
			$stmt = $pdo->prepare($sql_select);
			$data = $stmt->execute();
		}
		catch (PDOException $e) {
			echo "Error: " . $e->getMessage() . "<br />\n";
		}
		$sql_select = "INSERT INTO `resultados_final` (`id`, `pos`, `valor`) VALUES (NULL, '0', 'F1T2L');";
		//$sql_select="UPDATE `".$banco_dados."`.`".$nome_tabela."` SET `valor` = '' WHERE `resultados_final`.`pos` = 'F1T2L';";
		try
		{
			$stmt = $pdo->prepare($sql_select);
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
