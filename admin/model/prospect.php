<?php

	require_once("glb/db.php");

	class Prospect{
	
		private $dbc;

		public function __construct($dbc){
			$this->dbc = $dbc;
		}
		
		public function __destruct(){
		}
		
		public function countRecords(){
		    $records = 0;
		    try{
		        $stmt = "SELECT COUNT(0) FROM ES_CLIENT WHERE STATUS = 1";
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
		    $stmt = "SELECT ID, NAME, EMAIL FROM ES_CLIENT WHERE STATUS = 1 ORDER BY 1 DESC LIMIT 10 OFFSET " . ($startAt);
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
		
		public function add($params){
		    $id = 0;
		    $rowsAffected = 0;
		    try{
		        $this->dbc->beginTransaction();

		        // Create header row
		        $stmt = "INSERT INTO ES_CLIENT (ID, NAME, EMAIL, STATUS, PASSWORD, LAST_UPDATE, TEL1, TEL2) VALUES(NULL, :name, :email, 1, :password, CURRENT_TIMESTAMP, :tel1, :tel2)";
		        $rowsAffected = $this->dbc->execute($stmt, array(
		            "name"     => $params["NAME"],
		            "email"    => $params["EMAIL"],
		            "password" => crypt(explode(' ',trim($params["NAME"]))[0], "essencial"),
		            "tel1"     => $params["TEL1"],
		            "tel2"     => $params["TEL2"]
		        ));   
		        
		        // Create details row
		        $stmt  = "INSERT INTO ES_PROFILE (CLIENT, ISPORTUGUESE, BONDS, ";
	            for ($i=1; $i<6; $i++){
	                $stmt .= sprintf("P%uNAME, P%uDOB, P%uDEC, ", $i, $i, $i);
	            }
	            $stmt .= "GOAL, SCHOLARSHIP, GRADUATION, PROFESSION, LINKEDINURL, GRADLOCATION, ENEM, GRADCOURSE, COMMENT1, INVSEGMENT, PREVISIT, INVTLOCATION, INVBUDGET, COMMENT3, RETDSTATUS, RETWAGE, RETDLOCATION, RETDALONE, RETMINORSPON, COMMENT2, COMMENT4, COMMENT5) VALUES (";
                $stmt .= ":client, :isportuguese, :bonds, ";
                for ($i=1; $i<6; $i++){
                    $stmt .= sprintf(":p%uname, :p%udob, :p%udec, ", $i, $i, $i);
                }
                $stmt .= ":goal, :scholarship, :graduation, :profession, :linkedinurl, :gradlocation, :enem, :gradcourse, :comment1, :invsegment, :previsit, :invtlocation, :invbudget, :comment3, :retdstatus, :retwage, :retdlocation, :retdalone, :retminorspon, :comment2, :comment4, :comment5)";
		        $client = $this->getLastId();
		        $goal = (empty($params["fldGoal"]) ? 0 : $params["fldGoal"]);
		        $rowsAffected = $this->dbc->execute($stmt, array(
                    "client"        => $client,
                    "isportuguese"  => $params["ISPORTUGUESE"],
                    "bonds"         => $params["BONDS"],
		            "p1name"        => (empty($params["fldParentName1"]) ? NULL : $params["fldParentName1"]),
		            "p1dob"         => (empty($params["fldDoB1"]) ? NULL : $params["fldDoB1"]),
                    "p1dec"         => (empty($params["fldDec1"]) ? NULL : $params["fldDec1"]),
                    "p2name"        => (empty($params["fldParentName2"]) ? NULL : $params["fldParentName2"]),
                    "p2dob"         => (empty($params["fldDoB2"]) ? NULL : $params["fldDoB2"]),
                    "p2dec"         => (empty($params["fldDec2"]) ? NULL : $params["fldDec2"]),
                    "p3name"        => (empty($params["fldParentName3"]) ? NULL : $params["fldParentName3"]),
                    "p3dob"         => (empty($params["fldDoB3"]) ? NULL : $params["fldDoB3"]),
                    "p3dec"         => (empty($params["fldDec3"]) ? NULL : $params["fldDec3"]),
                    "p4name"        => (empty($params["fldParentName4"]) ? NULL : $params["fldParentName4"]),
                    "p4dob"         => (empty($params["fldDoB4"]) ? NULL : $params["fldDoB4"]),
                    "p4dec"         => (empty($params["fldDec4"]) ? NULL : $params["fldDec4"]),
                    "p5name"        => (empty($params["fldParentName5"]) ? NULL : $params["fldParentName5"]),
                    "p5dob"         => (empty($params["fldDoB5"]) ? NULL : $params["fldDoB5"]),
                    "p5dec"         => (empty($params["fldDec5"]) ? NULL : $params["fldDec5"]),
		            "goal"          => (empty($params["fldGoal"]) ? NULL : $params["fldGoal"]),
		            "scholarship"   => (empty($params["fldScholarship"]) ? NULL : $params["fldScholarship"]),
                    "graduation"    => (empty($params["fldGraduation"]) ? NULL : $params["fldGraduation"]),
                    "profession"    => (empty($params["fldProfession"]) ? NULL : $params["fldProfession"]),
                    "linkedinurl"   => (empty($params["fldLinkedin"]) ? NULL : $params["fldLinkedin"]),		            
                    "gradlocation"  => (empty($params["fldGradLocation"]) ? NULL : $params["fldGradLocation"]),
                    "enem"          => (($goal == "2") ? $params["fldENEM"] : NULL),
                    "gradcourse"    => (empty($params["fldCourse"]) ? NULL : $params["fldCourse"]),
		            "comment1"      => (($goal == "1") ? $params["fldObs"] : NULL),
                    "invsegment"    => (empty($params["fldMarketSeg"]) ? NULL : $params["fldMarketSeg"]),
                    "previsit"      => (($goal == "3") ? $params["fldPrevVisit"] : NULL),
                    "invtlocation"  => (($goal == "3") ? $params["fldLocationToInv"] : NULL),
                    "invbudget"     => (($goal == "3") ? $params["fldInvest"] : NULL),
                    "comment3"      => (($goal == "3") ? $params["fldBPlan"] : NULL),
                    "retdstatus"    => (($goal == "4") ? $params["fldSitRet"] : NULL),
                    "retwage"       => (($goal == "4") ? $params["fldRetWage"] : NULL),
                    "retdlocation"  => (($goal == "4") ? $params["fldLocationToRet"] : NULL),
                    "retdalone"     => (($goal == "4") ? $params["fldRetCompany"] : NULL),
                    "retminorspon"  => (($goal == "4") ? $params["fldIsSponsor"] : NULL),
                    "comment2"      => (($goal == "2") ? $params["fldObs"] : NULL),
                    "comment4"      => (($goal == "4") ? $params["fldObs"] : NULL),
                    "comment5"      => (($goal == "5") ? $params["fldObs"] : NULL)           
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
				$stmt .= "GOAL = :goal, ISPORTUGUESE = :isportuguese, BONDS = :bonds, SCHOLARSHIP = :scholarship, GRADLOCATION = gradlocation, ENEM = :enem, PREVISIT = :previsit, ";
				$stmt .= "INVTLOCATION = :invtlocation, RETDSTATUS = :retdstatus, RETDLOCATION = :retdlocation, RETMINORSPON = :retminorspon, RETDALONE = :retdalone, GRADUATION = :graduation, ";
				$stmt .= "PROFESSION = :profession, LINKEDINURL = :linkedinurl, GRADCOURSE = :gradcourse, INVSEGMENT = :invsegment, INVBUDGET = :invbudget, RETWAGE = :retwage, COMMENT = :comment ";
				$stmt .= "WHERE CLIENT = :client";
				$this->dbc->execute($stmt, array(
				    "client" => $params["id"],
				    "goal" => $params["fldGoal"],
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