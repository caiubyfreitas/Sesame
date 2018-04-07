<?php

	$data = array();
	const MSG_ERR_GENERIC = "Desculpe, mas não foi possível enviar sua mensagem. Nossso serviço de envio de e-mail está temporariamente indisponível. Por favor, tente novamente mais tarde."; 
	const MSG_SUC_GENERIC = "Obrigado por entrar em contato conosco. Em breve enviaremos resposta à sua mensagem. ";
	
	//Reassembling message variables
	$nome = $_POST["nome"];
	$email = $_POST["email"];
	$message = wordwrap(str_replace("\n.", "\n..", $_POST["msg"]), 70, "\r\n");
	$to = "contato@essencialassessoria.pt";
	$subject = "Contato pelo site"; 
	
	//Coding email header
	$header = "MIME-Version: 1.0 \r\n";
	$header .= "Content-type: text/html; charset=iso-8859-1 \r\n";
	$header .= "From: ".$nome." <".$email."> \r\n";
	$header .= "To: Essencial Assessoria <".$to."> \r\n";
	$header .= "Reply-to: ".$nome." <".$email."> \r\n";
	$header .= "Date: ".date("r (T)")." \r\n";

	//Send
	 if (!mail($to, $subject, $message, $header)){
		$data["message"] = error_get_last()['message'];
	 }
	 else{
		$data["message"] = MSG_SUC_GENERIC;
	 }
	 
	 //Return
	 $data["json"] = json_encode($data);
	 echo json_encode($data);

?>