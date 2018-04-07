<?php 

$module = isset($_POST["module"]) ? $_POST["module"] : "";
$action = isset($_POST["action"]) ? $_POST["action"] : "";
$params	= isset($_POST["params"]) ? $_POST["params"] : "";

echo json_encode($params);

?>