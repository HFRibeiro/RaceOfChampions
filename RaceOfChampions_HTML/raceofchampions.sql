-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 01-Jun-2018 às 19:58
-- Versão do servidor: 5.7.22-0ubuntu0.16.04.1
-- PHP Version: 7.0.30-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `raceofchampions`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `configs`
--

CREATE TABLE `configs` (
  `id` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `valor` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `configs`
--

INSERT INTO `configs` (`id`, `nome`, `valor`) VALUES
(1, 'colorsLaps', '#CCCCCC;#D9D93F;#4DFF40'),
(2, 'oitavos', '2'),
(3, 'quartos', '2'),
(4, 'meias', '2'),
(5, 'final', '3'),
(6, 'terceiro', '2');

-- --------------------------------------------------------

--
-- Estrutura da tabela `finals`
--

CREATE TABLE `finals` (
  `id` int(11) NOT NULL,
  `round` int(11) NOT NULL,
  `posicao` int(11) NOT NULL,
  `id_equipa` int(11) NOT NULL,
  `n_vitorias` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `finals`
--

INSERT INTO `finals` (`id`, `round`, `posicao`, `id_equipa`, `n_vitorias`) VALUES
(1, 1, 6, 8, 0),
(2, 1, 2, 4, 0),
(3, 1, 4, 9, 0),
(4, 1, 5, 5, 0),
(5, 1, 1, 6, 0),
(6, 1, 3, 3, 0),
(7, 1, 7, 7, 0),
(8, 1, 8, 2, 0),
(9, 1, 9, 1, 0),
(10, 1, 10, 10, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `finalsteams`
--

CREATE TABLE `finalsteams` (
  `id` int(11) NOT NULL,
  `idTeam` int(11) NOT NULL,
  `nomeTeam` varchar(50) NOT NULL,
  `positions` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `finalsteams`
--

INSERT INTO `finalsteams` (`id`, `idTeam`, `nomeTeam`, `positions`) VALUES
(1, 168, '(168) EPB_Team', 'O1T1'),
(2, 9, '(9) Team PolyTech 1', 'O1T2'),
(3, 10, '(10) Polytech_2', 'O2T1'),
(4, 18, '(18) INETEBOTI', 'O2T2'),
(5, 25, '(25) AEVA', 'O3T1'),
(6, 1, '(1) SARilhos', 'O3T2'),
(7, 19, '(19) INETEBOTII', 'O4T1'),
(8, 5, '(5) MECAS ER', 'O4T2'),
(9, 13, '(13) FireWheels', 'O5T1'),
(10, 16, '(16) RealBot', 'O5T2'),
(11, 11, '(11) Lampadinha', 'O6T1'),
(12, 20, '(20) ROBOTICA IEMA ', 'O6T2'),
(13, 17, '(17) RealPaco', 'O7T1'),
(14, 3, '(3) AntiVirus2', 'O7T2'),
(15, 4, '(4) MECAS PO', 'O8T1'),
(16, 14, '(14) Robotis', 'O8T2');

-- --------------------------------------------------------

--
-- Estrutura da tabela `resultados_final`
--

CREATE TABLE `resultados_final` (
  `id` int(11) NOT NULL,
  `pos` varchar(50) NOT NULL,
  `valor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `resultados_final`
--

INSERT INTO `resultados_final` (`id`, `pos`, `valor`) VALUES
(1, 'O1T1L', 0),
(2, 'O1T2L', 0),
(3, 'O2T1L', 0),
(4, 'O2T2L', 0),
(5, 'O3T1L', 0),
(6, 'O3T2L', 0),
(7, 'O4T1L', 0),
(8, 'O4T2L', 0),
(9, 'O5T1L', 0),
(10, 'O5T2L', 0),
(11, 'O6T1L', 0),
(12, 'O6T2L', 0),
(13, 'O7T1L', 0),
(14, 'O7T2L', 0),
(15, 'O8T1L', 0),
(16, 'O8T2L', 0),
(33, 'Q1T1L', 0),
(34, 'Q1T2L', 0),
(35, 'Q2T1L', 0),
(36, 'Q2T2L', 0),
(37, 'Q3T1L', 0),
(38, 'Q3T2L', 0),
(39, 'Q4T1L', 0),
(40, 'Q4T2L', 0),
(41, 'M1T1L', 0),
(42, 'M1T2L', 0),
(43, 'M2T1L', 0),
(44, 'M2T2L', 0),
(45, 'F1T1L', 0),
(46, 'F1T2L', 0),
(47, 'T1T1L', 0),
(48, 'T1T2L', 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `rounds`
--

CREATE TABLE `rounds` (
  `id` int(11) NOT NULL,
  `toWin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `rounds`
--

INSERT INTO `rounds` (`id`, `toWin`) VALUES
(1, 2),
(2, 2),
(3, 2),
(4, 3),
(5, 5);

-- --------------------------------------------------------

--
-- Estrutura da tabela `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `nome` varchar(200) NOT NULL,
  `tempo` varchar(150) NOT NULL DEFAULT '59:59:999',
  `voltas` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `teams`
--

INSERT INTO `teams` (`id`, `nome`, `tempo`, `voltas`) VALUES
(1, 'SARilhos', '59:59:999', 0),
(2, 'Virus2', '59:59:999', 0),
(3, 'AntiVirus2', '59:59:999', 0),
(4, 'MECAS PO', '59:59:999', 0),
(5, 'MECAS ER', '59:59:999', 0),
(9, 'Team PolyTech 1', '59:59:999', 0),
(10, 'Polytech_2', '59:59:999', 0),
(11, 'Lampadinha', '59:59:999', 0),
(13, 'FireWheels', '59:59:999', 0),
(14, 'Robotis', '59:59:999', 0),
(16, 'RealBot', '59:59:999', 0),
(17, 'RealPaco', '59:59:999', 0),
(18, 'INETEBOTI', '59:59:999', 0),
(19, 'INETEBOTII', '59:59:999', 0),
(20, 'ROBOTICA IEMA ', '59:59:999', 0),
(25, 'AEVA', '59:59:999', 0),
(27, 'ROBOYS2018', '59:59:999', 0),
(28, 'BitBytes', '59:59:999', 0),
(33, 'Guerreiros', '59:59:999', 0),
(35, 'Gago', '59:59:999', 0),
(36, 'Coutinho', '59:59:999', 0),
(37, 'Infante', '59:59:999', 0),
(42, 'AEGBETINHOS', '59:59:999', 0),
(43, 'Just4Fun', '59:59:999', 0),
(45, 'ROBOT3', '59:59:999', 0),
(48, 'SA_TEC', '59:59:999', 0),
(49, 'SA_GES', '59:59:999', 0),
(53, 'RoboESL', '59:59:999', 0),
(54, 'OCS4All', '59:59:999', 0),
(55, 'CPTEAC1', '59:59:999', 0),
(56, 'CPTEAC2', '59:59:999', 0),
(60, 'GEIBotica', '59:59:999', 0),
(61, 'Navis', '59:59:999', 0),
(62, 'Papichulo', '59:59:999', 0),
(63, 'Guccigang', '59:59:999', 0),
(64, 'OsMeca', '59:59:999', 0),
(68, 'CREPATV 1', '59:59:999', 0),
(69, 'CREPATV 2', '59:59:999', 0),
(70, 'Empadoes', '59:59:999', 0),
(71, 'Biscoito', '59:59:999', 0),
(72, 'BarcelinhosRC1', '59:59:999', 0),
(74, 'BarcelinhosRC2', '59:59:999', 0),
(75, 'ESMaia1', '59:59:999', 0),
(76, 'ESMaia2', '59:59:999', 0),
(77, 'Ribatejanos', '59:59:999', 0),
(78, 'TFG', '59:59:999', 0),
(80, 'HotWheels', '59:59:999', 0),
(81, 'Engrenagem', '59:59:999', 0),
(82, 'Pistoes', '59:59:999', 0),
(83, 'PowerPoint', '59:59:999', 0),
(84, 'RealCol1', '59:59:999', 0),
(85, 'ColReal', '59:59:999', 0),
(86, 'D2_R2', '59:59:999', 0),
(87, 'Soldadores', '59:59:999', 0),
(88, 'OsSistema', '59:59:999', 0),
(99, 'OsRoscaMoida', '59:59:999', 0),
(100, 'OSlamboes', '59:59:999', 0),
(101, 'Beta Coders', '59:59:999', 0),
(102, 'EletroBots', '59:59:999', 0),
(103, 'EletroCIOR', '59:59:999', 0),
(104, 'EsproRobot', '59:59:999', 0),
(105, 'EsproRobot II', '59:59:999', 0),
(106, 'ESARobots1', '59:59:999', 0),
(107, 'ESARobots2', '59:59:999', 0),
(108, 'ESARobots3', '59:59:999', 0),
(109, 'IGEP_1', '59:59:999', 0),
(111, 'EpraTeK', '59:59:999', 0),
(112, 'IGEP_2', '59:59:999', 0),
(113, 'CBB1', '59:59:999', 0),
(114, 'Plenitude Park', '59:59:999', 0),
(115, 'CBB2', '59:59:999', 0),
(116, 'CBB3', '59:59:999', 0),
(117, 'Guarda6F', '59:59:999', 0),
(118, 'RoboticaAEAAG', '59:59:999', 0),
(119, 'Gorilas AEAAG', '59:59:999', 0),
(120, 'ESABITS', '59:59:999', 0),
(121, 'AEV12', '59:59:999', 0),
(122, 'AEV11', '59:59:999', 0),
(124, 'EPA_BOT', '59:59:999', 0),
(125, 'ESAByte', '59:59:999', 0),
(126, 'MEC015', '59:59:999', 0),
(127, 'ATEC_ARCI', '59:59:999', 0),
(128, 'AEV10', '59:59:999', 0),
(129, 'The Bombers', '59:59:999', 0),
(130, 'EBMMO', '59:59:999', 0),
(131, 'ESJD', '59:59:999', 0),
(132, 'ESFA_1', '59:59:999', 0),
(133, 'ESFA_2', '59:59:999', 0),
(134, 'ESFA_3', '59:59:999', 0),
(135, 'ESFA_4', '59:59:999', 0),
(136, 'D Sancho I', '59:59:999', 0),
(137, 'AEDATFreamunde', '59:59:999', 0),
(138, 'cena10', '59:59:999', 0),
(139, 'cena11', '59:59:999', 0),
(140, 'LiceBotica', '59:59:999', 0),
(141, 'EPF', '59:59:999', 0),
(142, 'ROBOTSdoCASTELO', '59:59:999', 0),
(143, 'ProRob 1', '59:59:999', 0),
(144, 'ProRob 2', '59:59:999', 0),
(145, 'Baiao1', '59:59:999', 0),
(146, 'Baiao2', '59:59:999', 0),
(147, 'Baiao3', '59:59:999', 0),
(148, 'Baiao4', '59:59:999', 0),
(149, 'IBuyPower', '59:59:999', 0),
(150, 'DigiRobotics', '59:59:999', 0),
(151, 'AEGS Team', '59:59:999', 0),
(152, 'RobotESAS', '59:59:999', 0),
(153, 'EACESAS', '59:59:999', 0),
(154, 'Random 4 e 20', '59:59:999', 0),
(155, 'PIXEL', '59:59:999', 0),
(156, 'EMOJI', '59:59:999', 0),
(157, 'Robot Guys', '59:59:999', 0),
(158, 'Robot Club', '59:59:999', 0),
(159, 'Eletronicos', '59:59:999', 0),
(160, 'XPTO', '59:59:999', 0),
(161, 'basicByte', '59:59:999', 0),
(162, 'Roboscar 30', '59:59:999', 0),
(163, 'AEMGA1', '59:59:999', 0),
(164, 'AEMGA2', '59:59:999', 0),
(166, 'nanoesg', '59:59:999', 0),
(167, 'teraesg', '59:59:999', 0),
(168, 'EPB_Team', '59:59:999', 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tempos`
--

CREATE TABLE `tempos` (
  `id` int(11) NOT NULL,
  `round` int(11) NOT NULL,
  `id_equipa` int(11) NOT NULL,
  `tempo` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tempos`
--

INSERT INTO `tempos` (`id`, `round`, `id_equipa`, `tempo`) VALUES
(1, 3, 6, '00:00:03'),
(2, 3, 9, '00:00:13'),
(3, 1, 1, '00:04:11'),
(4, 1, 2, '00:10:23'),
(5, 1, 3, '00:12:23'),
(6, 2, 10, '00:10:21'),
(7, 2, 9, '00:05:23'),
(8, 2, 7, '00:04:07'),
(9, 2, 9, '00:00:02'),
(10, 2, 1, '00:00:00'),
(11, 2, 10, '00:00:00'),
(12, 2, 10, '00:00:00'),
(13, 2, 1, '00:00:00'),
(14, 3, 6, '00:00:00'),
(15, 3, 9, '00:00:00'),
(16, 3, 6, '00:00:00'),
(17, 3, 9, '00:00:00'),
(18, 3, 10, '00:00:00'),
(19, 3, 1, '00:00:00'),
(20, 3, 10, '00:00:00'),
(21, 3, 1, '00:00:00'),
(22, 3, 6, '00:00:00'),
(23, 3, 9, '00:00:00'),
(24, 3, 9, '00:00:00'),
(25, 3, 6, '00:00:00'),
(26, 1, 2, '00:00:00'),
(27, 1, 7, '00:00:00'),
(28, 3, 9, '00:00:00'),
(29, 3, 6, '00:00:00'),
(30, 3, 6, '00:00:00'),
(31, 3, 9, '00:00:00'),
(32, 3, 6, '00:00:00'),
(33, 3, 9, '00:00:00'),
(34, 3, 6, '00:00:00'),
(35, 3, 9, '00:00:00'),
(36, 3, 6, '00:00:00'),
(37, 3, 9, '00:00:00'),
(38, 3, 6, '00:00:00'),
(39, 3, 9, '00:00:00'),
(40, 3, 6, '00:00:00'),
(41, 3, 9, '00:00:00'),
(42, 3, 6, '00:00:00'),
(43, 3, 9, '00:00:00'),
(44, 3, 6, '00:00:00'),
(45, 3, 9, '00:00:00'),
(46, 3, 6, '00:00:00'),
(47, 3, 9, '00:00:00'),
(48, 3, 9, '00:00:00'),
(49, 3, 6, '00:00:00'),
(50, 3, 10, '00:00:00'),
(51, 3, 1, '00:00:00'),
(52, 3, 10, '00:00:00'),
(53, 3, 1, '00:00:00'),
(54, 3, 10, '00:00:00'),
(55, 3, 1, '00:00:00'),
(56, 4, 9, '00:00:00'),
(57, 4, 1, '00:00:00'),
(58, 4, 1, '00:00:00'),
(59, 4, 9, '00:00:00'),
(60, 4, 1, '00:00:00'),
(61, 4, 9, '00:00:00'),
(62, 4, 10, '00:00:00'),
(63, 4, 6, '00:00:00'),
(64, 4, 10, '00:00:00'),
(65, 4, 6, '00:00:00'),
(66, 4, 10, '00:00:00'),
(67, 4, 6, '00:00:00'),
(68, 3, 9, '00:00:00'),
(69, 3, 6, '00:00:00'),
(70, 3, 6, '00:00:00'),
(71, 3, 9, '00:00:00'),
(72, 3, 10, '00:00:00'),
(73, 3, 1, '00:00:00'),
(74, 3, 10, '00:00:00'),
(75, 3, 1, '00:00:00'),
(76, 4, 10, '00:00:00'),
(77, 4, 6, '00:00:00'),
(78, 4, 10, '00:00:00'),
(79, 4, 6, '00:00:00'),
(80, 4, 10, '00:00:00'),
(81, 4, 6, '00:00:00'),
(82, 4, 1, '00:00:00'),
(83, 4, 9, '00:00:00'),
(84, 4, 1, '00:00:00'),
(85, 4, 9, '00:00:00'),
(86, 4, 1, '00:00:00'),
(87, 4, 9, '00:00:00'),
(88, 4, 10, '00:00:00'),
(89, 4, 6, '00:00:00'),
(90, 4, 10, '00:00:00'),
(91, 4, 6, '00:00:00'),
(92, 4, 10, '00:00:00'),
(93, 4, 6, '00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `configs`
--
ALTER TABLE `configs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `finals`
--
ALTER TABLE `finals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `resultados_final`
--
ALTER TABLE `resultados_final`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pos` (`pos`);

--
-- Indexes for table `rounds`
--
ALTER TABLE `rounds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nome` (`nome`);

--
-- Indexes for table `tempos`
--
ALTER TABLE `tempos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `configs`
--
ALTER TABLE `configs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `finals`
--
ALTER TABLE `finals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `resultados_final`
--
ALTER TABLE `resultados_final`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
--
-- AUTO_INCREMENT for table `rounds`
--
ALTER TABLE `rounds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=169;
--
-- AUTO_INCREMENT for table `tempos`
--
ALTER TABLE `tempos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
