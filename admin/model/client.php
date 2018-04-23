<?php

    require_once("glb/db.php");
    require_once("glb/helpers.php");
    
    use function Globals\helpers\cleanup_string;

	class Client{
	
		private $dbc;

		public function __construct($dbc){
			$this->dbc = $dbc;
		}
		
		public function __destruct(){
		}
		
		public function countRecords(){
		    $records = 0;
		    try{
		        $stmt = "SELECT COUNT(0) FROM ES_CLIENT WHERE STATUS = 2";
		        $records = $this->dbc->countRecords($stmt);
		    }
		    catch(Exception $e){
		        throw $e;
		    }
		    finally{
		    }
		    return $records;
		}
		
		public function getLastId(){
		    $id = 0;
		    try{
		        $stmt = "SELECT MAX(ID) FROM ES_CLIENT";
		        $id = $this->dbc->getLastId($stmt);
		    }
		    catch(Exception $e){
		        throw $e;
		    }
		    finally{
		    }
		    return $id;
		}
		
		public function getAllRecords($startAt){
		    $records = 0;
		    $rows = array();
		    $stmt = "SELECT C.ID, NAME, EMAIL, LAST_UPDATE FROM ES_CLIENT C WHERE STATUS = 2 ORDER BY 1 DESC LIMIT 10 OFFSET " . ($startAt);
		    try{
		        $rows = $this->dbc->getRows($stmt, array());
		    }
		    catch(Exception $e){
		        throw $e;
		    }
		    finally{
		    }
		    return $rows;
		}
		
		public function findById($params){
			$row = NULL;
			$stmt  = "SELECT NAME, EMAIL, TEL1, TEL2, ISPORTUGUESE, BONDS, SCHOLARSHIP, GRADLOCATION, ENEM, PREVISIT, INVTLOCATION, RETDSTATUS, ";
			$stmt .= "RETDLOCATION, RETMINORSPON, RETDALONE, GRADUATION, PROFESSION, LINKEDINURL, GRADCOURSE, INVSEGMENT, INVBUDGET, RETWAGE, ";
			$stmt .= "COMMENT1, COMMENT2, COMMENT3, COMMENT4, COMMENT5 FROM ES_CLIENT a INNER JOIN ES_PROFILE b ON a.ID = b.CLIENT WHERE a.ID = :id";
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
		
		public function exists($params){
		    $row = NULL;
		    $result = false;
		    $stmt = "SELECT ID FROM ES_CLIENT WHERE EMAIL = :email OR NAME = :name";
		    try{
		        $row = $this->dbc->getRows($stmt, array ( 
		            "email"   => cleanup_string(strtolower($params["EMAIL"])),
		            "name"    => cleanup_string(strtoupper($params["NAME"]))
		        ));
		    }
		    catch(Exception $e){
		        throw $e;
		    }
		    finally{
		        $result = ($row != NULL) ? true : false;
		    }
		    return $result;
		}
		
		public function changeStatus($params){
		    $rowsAffected = 0;
		    $stmt = "UPDATE ES_CLIENT SET STATUS = :status WHERE ID = :id";		    
		    try{
		        $this->dbc->beginTransaction();
		        $rowsAffected = $this->dbc->execute($stmt, array(
		            "id"      => $params["id"],
		            "status"  => $params["status"]
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
    		
		public function update($params){
			$rowsAffected = 0;
			try{
				// Update master data 
				$stmt = "UPDATE ES_CLIENT SET NAME = :name, EMAIL = :email, TEL1 = :tel1, TEL2 = :tel2  WHERE ID = :id";
				$this->dbc->beginTransaction();
				$rowsAffected = $this->dbc->execute($stmt, array(
					"id" => $params["id"],
					"name" => $params["name"],
					"email" => $params["email"],
					"tel1" => $params["tel1"],
					"tel2" => $params["tel2"]
				));
				// Update detail data
				$stmt  = "UPDATE ES_PROFILE SET   WHERE CLIENT = :client";
				$stmt .= "ISPORTUGUESE = :isportuguese, BONDS = :bonds, SCHOLARSHIP = :scholarship, GRADLOCATION = gradlocation, ENEM = :enem, PREVISIT = :previsit, ";
				$stmt .= "INVTLOCATION = :invtlocation, RETDSTATUS = :retdstatus, RETDLOCATION = :retdlocation, RETMINORSPON = :retminorspon, RETDALONE = :retdalone, GRADUATION = :graduation, ";
				$stmt .= "PROFESSION = :profession, LINKEDINURL = :linkedinurl, GRADCOURSE = :gradcourse, INVSEGMENT = :invsegment, INVBUDGET = :invbudget, RETWAGE = :retwage, COMMENT = :comment ";
				$stmt .= "WHERE CLIENT = :client";
				$this->dbc->execute($stmt, array(
				    "client" => $params["id"],
				    "isportuguese" => $params["isportuguese"],
				    "bonds" => $params["bonds"],
				    "scholarship" => $params["scholarship"],
				    "gradlocation" => $params["gradlocation"],
				    "scholarship" => $params["scholarship"],
				    "enem" => $params["enem"],
				    "previsit" => $params["previsit"],
				    "invtlocation" => $params["invtlocation"],
				    "retdstatus" => $params["retdstatus"],
				    "retdlocation" => $params["retdlocation"],
				    "retminorspon" => $params["retminorspon"],
				    "retdalone" => $params["retdalone"],
				    "graduation" => $params["graduation"],
				    "profession" => $params["profession"],
				    "linkedinurl" => $params["linkedinurl"],
				    "gradcourse" => $params["gradcourse"],
				    "invsegment" => $params["invsegment"],
				    "invbudget" => $params["invbudget"],
				    "retwage" => $params["retwage"],
				    "comment" => $params["comment"]
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
		
		public function remove($params){
		    $rowsAffected = 0;
		    $stmt = "DELETE FROM ES_CLIENT WHERE STATUS = 1 AND ID = :id";
		    try{
		        $this->dbc->beginTransaction();
		        $rowsAffected = $this->dbc->execute($stmt, array("id" => $params["id"]));
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