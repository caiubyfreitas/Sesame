<?php

	require_once("glb/db.php");

	class Admin{
	
		private $dbc;

		public function __construct($dbc){
			$this->dbc = $dbc;
		}
		
		public function __destruct(){
		}
		
		private function encrypt($string){
			return crypt($string, "essencial");
		}
		
		public function validate($params){	
			$row = NULL;
			$stmt = "SELECT ID, NAME, EMAIL, USERNAME, PASSWORD, PICTURE FROM ES_USER WHERE USERNAME = :username AND PASSWORD = :password";
			try{
				$row = $this->dbc->getRows($stmt, array(
					"username" => $params["fldName"], 
				    "password" => $this->encrypt($params["fldPassword"])
				));
			}
			catch(Exception $e){
				throw $e;
			}
			return $row;
		}
		
		public function findById($params){
			$row = NULL;
			$stmt = "SELECT USERNAME, NAME, EMAIL, PICTURE FROM ES_USER WHERE ID = :id";
			try{
				$row = $this->dbc->getRows($stmt, array( "id" => $params["id"] ));
			}
			catch(Exception $e){
				throw $e;
			}
			finally{
			}
			return $row;
		}
		
		public function update($params){
			$rowsAffected = 0;
			$stmt = "UPDATE ES_USER SET NAME = :fullname, USERNAME = :name, EMAIL = :email, PASSWORD = :password WHERE ID = :id";
			try{
				$this->dbc->beginTransaction();
				$rowsAffected = $this->dbc->execute($stmt, array(
					"id" => $params["id"],
					"fullname" => $params["fullname"],
					"name" => $params["name"],
					"email" => $params["email"],
					"password" => $this->encrypt($params["password"])
				));
				$this->dbc->endTransaction();
			}
			catch(Exception $e){
				$this->dbc->cancelTransaction();
				throw $e;
			}
			finally{
			}
			return $rowsAffected;
		}
	
	}
	
?>