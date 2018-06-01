<?php
	$check = $_POST['check'];
	require('Dados_BD.php');

	try{
	$pdo = new pdo( 'mysql:host='.$servidor.';dbname='.$banco_dados.'',$user,$senha,array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));


	$nome_tabela="finalsteams";
	$sql_select="DELETE FROM `".$nome_tabela."` WHERE 1;";
	$sql_select2="ALTER TABLE `".$nome_tabela."` AUTO_INCREMENT=1;";

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

}
catch(PDOException $ex){
	die(json_encode(array('outcome' => false, 'message' => 'Unable to connect')));
}
?>
