
<?php
	require_once ("glb/helpers.php");
	use function Globals\helpers\redirect;

	// Creates session 
	if (version_compare(phpversion(), '5.4.0', '<')) {
		if(session_id() == ''){
			session_start();
		}
	}
	else{
		if (session_status() == PHP_SESSION_NONE){
			session_start();
		}
	}
	
	//Check if user's credential is still valid. if not, redirect to the login page
	if (!isset($_SESSION["USER_ID"])){
		redirect("es_login.html");
	}
	
	// Retrieve information from session variables
	function getUserPicture(){
		if (isset($_SESSION["PICTURE"])){
			echo $_SESSION["PICTURE"];
		}
	}
	function getUserId(){
		if (isset($_SESSION["USER_ID"])){
			echo $_SESSION["USER_ID"];
		}
	}
	function getUserName(){
		if (isset($_SESSION["FULLNAME"])){
			echo $_SESSION["FULLNAME"] . "<br>Administrador(a)";
		}
	}	
?>

<!DOCTYPE html>
<html lang="en">

<head>

	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Essencial</title>

    <!-- FontAwesome CSS -->
	<link href="../css/font-awesome.min.css" rel="stylesheet">

    <!-- Bootstrap Reboot CSS -->
    <link href="../css/bootstrap-reboot.min.css" rel="stylesheet">
	
    <!-- Bootstrap Core CSS -->
    <link href="../css/bootstrap.min.css" rel="stylesheet">

    <!-- Bootstrap Grid CSS -->
    <link href="../css/bootstrap-grid.min.css" rel="stylesheet">
	
	<!-- Custom styles for this template-->
	<link href="css/es_dashboard.css" rel="stylesheet">
	<link href="css/es_admin.css" rel="stylesheet">
	<link href="css/es_prospect.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

    <div class="page">
	
		<!-- Main Navbar-->
		<header class="header"> 
			<nav class="navbar navbar-toggleable-md navbar-light bg-faded">
				<div class="container-fluid">
					<div class="navbar-holder d-flex align-items-center justify-content-between" >
						<!-- Navbar Header-->
						<div class="navbar-header">
							<!-- Navbar Brand -->
							<div class="brand-text">
								<strong>Essencial</strong>&nbsp;Content Management System <i>Dashboard</i><BR><small><span id="fldToday"></span></small>
							</div>
						</div>
						<!-- Navbar Menu -->
						<ul class="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
							<!-- Logout -->
							<li class="nav-item"><a href="es_disconnect.php" class="nav-link logout">Desconectar<i class="fa fa-sign-out"></i></a></li>
						</ul>				  
					</div>
				</div>
			</nav>
		</header> 

		<div class="page-content d-flex align-items-stretch"> 

			<!-- Side Navbar -->
			<nav class="side-navbar">

				<!-- Sidebar Header-->	
				<div id="sidebar-profile">
					<img src="<?php getUserPicture(); ?>" alt="..." class="img-fluid rounded-circle">
					<div style="float: right;">
						<a href="#" id="Admin-lnk" data-id="<?php getUserId(); ?>"><?php getUserName(); ?></a>
					</div>
				</div>
				
				<!-- Sidebar Navidation Menus-->
				<span class="heading">Principal</span>
				<ul class="list-unstyled">
					<li><a href="es_prospect.php"> <i id="icoProspects" class="fa fa-flag"></i>Prospectos </a></li>
					<li><a href="es_client.php"> <i id="icoProspects" class="fa fa-address-card-o"></i>Clientes </a></li>
				</ul>
				<!--
				<span class="heading">Processos</span>
				<ul class="list-unstyled">
					<li> <a href="#"> <i class="icon-flask"></i>Demo </a></li>
					<li><a href="#exampledropdownDropdown" aria-expanded="false" data-toggle="collapse"> <i class="icon-interface-windows"></i>Example dropdown </a>
						<ul id="exampledropdownDropdown" class="collapse list-unstyled ">
							<li><a href="#">Page</a></li>
							<li><a href="#">Page</a></li>
							<li><a href="#">Page</a></li>
						</ul>
					</li>
				</ul>
				-->
			</nav>

			<div class="content-inner">

				<!-- Page Header
				<header class="page-header shadow-nohover">
					<div class="container-fluid">
						<h4 class="no-margin-bottom">Dashboard</h4>
					</div>
				</header>-->

				<!-- Page Content -->
				<div id="page-content">