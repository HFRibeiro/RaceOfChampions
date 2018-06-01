<?php

$team = Array(Array());

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

	$query = "SELECT * FROM `teams` ORDER BY `teams`.`tempo` ASC LIMIT 16";
	try
	{
		$stmt = $pdo->prepare($query);
		$data = $stmt->execute();
		$primary_search = $stmt->fetchAll();

		$k=0;
		Foreach($primary_search as $match)
		{
			$team[$k]['id'] = $match['id'];
			$team[$k]['nome'] = $match['nome'];
			$team[$k]['tempo'] = $match['tempo'];
			$team[$k]['voltas'] = $match['voltas'];
			$k++;
		}

	}
	catch (PDOException $e) {
		echo "Error: " . $e->getMessage() . "<br />\n";
	}

	shuffle($team);

	for($i=0;$i<16;$i++)
	{
		switch($i)
		{
			case 0:
			$sql_select2="INSERT INTO `finalsteams` (`id`, `idTeam`, `nomeTeam`, `positions`) VALUES ('".($i+1)."', '".$team[$i]['id']."', '(".$team[$i]['id'].") ".$team[$i]['nome']."', 'O1T1');";
			break;
			case 1:
			$sql_select2="INSERT INTO `finalsteams` (`id`, `idTeam`, `nomeTeam`, `positions`) VALUES ('".($i+1)."', '".$team[$i]['id']."', '(".$team[$i]['id'].") ".$team[$i]['nome']."', 'O1T2');";
			break;
			case 2:
			$sql_select2="INSERT INTO `finalsteams` (`id`, `idTeam`, `nomeTeam`, `positions`) VALUES ('".($i+1)."', '".$team[$i]['id']."', '(".$team[$i]['id'].") ".$team[$i]['nome']."', 'O2T1');";
			break;
			case 3:
			$sql_select2="INSERT INTO `finalsteams` (`id`, `idTeam`, `nomeTeam`, `positions`) VALUES ('".($i+1)."', '".$team[$i]['id']."', '(".$team[$i]['id'].") ".$team[$i]['nome']."', 'O2T2');";
			break;
			case 4:
			$sql_select2="INSERT INTO `finalsteams` (`id`, `idTeam`, `nomeTeam`, `positions`) VALUES ('".($i+1)."', '".$team[$i]['id']."', '(".$team[$i]['id'].") ".$team[$i]['nome']."', 'O3T1');";
			break;
			case 5:
			$sql_select2="INSERT INTO `finalsteams` (`id`, `idTeam`, `nomeTeam`, `positions`) VALUES ('".($i+1)."', '".$team[$i]['id']."', '(".$team[$i]['id'].") ".$team[$i]['nome']."', 'O3T2');";
			break;
			case 6:
			$sql_select2="INSERT INTO `finalsteams` (`id`, `idTeam`, `nomeTeam`, `positions`) VALUES ('".($i+1)."', '".$team[$i]['id']."', '(".$team[$i]['id'].") ".$team[$i]['nome']."', 'O4T1');";
			break;
			case 7:
			$sql_select2="INSERT INTO `finalsteams` (`id`, `idTeam`, `nomeTeam`, `positions`) VALUES ('".($i+1)."', '".$team[$i]['id']."', '(".$team[$i]['id'].") ".$team[$i]['nome']."', 'O4T2');";
			break;
			case 8:
			$sql_select2="INSERT INTO `finalsteams` (`id`, `idTeam`, `nomeTeam`, `positions`) VALUES ('".($i+1)."', '".$team[$i]['id']."', '(".$team[$i]['id'].") ".$team[$i]['nome']."', 'O5T1');";
			break;
			case 9:
			$sql_select2="INSERT INTO `finalsteams` (`id`, `idTeam`, `nomeTeam`, `positions`) VALUES ('".($i+1)."', '".$team[$i]['id']."', '(".$team[$i]['id'].") ".$team[$i]['nome']."', 'O5T2');";
			break;
			case 10:
			$sql_select2="INSERT INTO `finalsteams` (`id`, `idTeam`, `nomeTeam`, `positions`) VALUES ('".($i+1)."', '".$team[$i]['id']."', '(".$team[$i]['id'].") ".$team[$i]['nome']."', 'O6T1');";
			break;
			case 11:
			$sql_select2="INSERT INTO `finalsteams` (`id`, `idTeam`, `nomeTeam`, `positions`) VALUES ('".($i+1)."', '".$team[$i]['id']."', '(".$team[$i]['id'].") ".$team[$i]['nome']."', 'O6T2');";
			break;
			case 12:
			$sql_select2="INSERT INTO `finalsteams` (`id`, `idTeam`, `nomeTeam`, `positions`) VALUES ('".($i+1)."', '".$team[$i]['id']."', '(".$team[$i]['id'].") ".$team[$i]['nome']."', 'O7T1');";
			break;
			case 13:
			$sql_select2="INSERT INTO `finalsteams` (`id`, `idTeam`, `nomeTeam`, `positions`) VALUES ('".($i+1)."', '".$team[$i]['id']."', '(".$team[$i]['id'].") ".$team[$i]['nome']."', 'O7T2');";
			break;
			case 14:
			$sql_select2="INSERT INTO `finalsteams` (`id`, `idTeam`, `nomeTeam`, `positions`) VALUES ('".($i+1)."', '".$team[$i]['id']."', '(".$team[$i]['id'].") ".$team[$i]['nome']."', 'O8T1');";
			break;
			case 15:
			$sql_select2="INSERT INTO `finalsteams` (`id`, `idTeam`, `nomeTeam`, `positions`) VALUES ('".($i+1)."', '".$team[$i]['id']."', '(".$team[$i]['id'].") ".$team[$i]['nome']."', 'O8T2');";
			break;
		}

		try
		{
			$stmt = $pdo->prepare($sql_select2);
			$data = $stmt->execute();
		}
		catch (PDOException $e) {
			echo "Error: " . $e->getMessage() . "<br />\n";
		}
		//echo $team[$i]['id'].":".$team[$i]['nome']."<br>";
	}

	


}
catch(PDOException $ex){
	die(json_encode(array('outcome' => false, 'message' => 'Unable to connect')));
}


	header("Location: finals.php");
	exit();



?>
