<?php

    require_once("glb/db.php");
    require_once("glb/helpers.php");
    
    use function Globals\helpers\cleanup_string;

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
		    $stmt = "SELECT C.ID, NAME, EMAIL, LAST_UPDATE, P.GOAL FROM ES_CLIENT C INNER JOIN ES_PROFILE P ON C.ID = P.CLIENT WHERE STATUS = 1 ORDER BY 1 DESC LIMIT 10 OFFSET " . ($startAt);
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
			$stmt  = "SELECT NAME, EMAIL, TEL1, TEL2, ISPORTUGUESE, BONDS, GOAL, SCHOLARSHIP, GRADLOCATION, ENEM, PREVISIT, INVTLOCATION, RETDSTATUS, ";
			$stmt .= "RETDLOCATION, RETMINORSPON, RETDALONE, GRADUATION, PROFESSION, LINKEDINURL, GRADCOURSE, INVSEGMENT, INVBUDGET, RETWAGE, ";
			$stmt .= "COMMENT1, COMMENT2, COMMENT3, COMMENT4, COMMENT5, P1NAME, P1DOB, P1DEC, P2NAME, P2DOB, P2DEC, P3NAME, P3DOB, P3DEC, P4NAME, P4DOB, P4DEC, P5NAME, P5DOB, P5DEC ";
			$stmt .= "FROM ES_CLIENT a INNER JOIN ES_PROFILE b ON a.ID = b.CLIENT WHERE a.ID = :id";
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
		
		public function add($params){
		    $id = 0;
		    $rowsAffected = 0;
		    try{
		        $this->dbc->beginTransaction();

		        // Create header row
		        $stmt = "INSERT INTO ES_CLIENT (ID, NAME, EMAIL, STATUS, PASSWORD, LAST_UPDATE, TEL1, TEL2) VALUES(NULL, :name, :email, 1, :password, CURRENT_TIMESTAMP, :tel1, :tel2)";
		        $rowsAffected = $this->dbc->execute($stmt, array(
		            "name"     => cleanup_string(strtoupper($params["NAME"])),
		            "email"    => cleanup_string(strtolower($params["EMAIL"])),
		            "password" => crypt(explode(' ',trim($params["NAME"]))[0], "essencial"),
		            "tel1"     => $params["TEL1"],
		            "tel2"     => $params["TEL2"]
		        ));   
		        
		        // Create details row
		        $stmt = "";
		        $flds = "CLIENT, ISPORTUGUESE, BONDS, GOAL, ";
		        $prms = ":client, :isportuguese, :bonds, :goal, ";
		        
		        if ($params["BONDS"] != "00000"){
    	            for ($i=1; $i<6; $i++){
    	                $flds .= sprintf("P%uNAME, P%uDOB, P%uDEC, ", $i, $i, $i);
    	            }
    	            $flds = rtrim($flds,', ');
    	            for ($i=1; $i<6; $i++){
    	                $prms .= sprintf(":p%uname, :p%udob, :p%udec, ", $i, $i, $i);
    	            }
    	            $prms = rtrim($prms,', ');
		        }
		        else{
		            $goal = (empty($params["fldGoal"]) ? 0 : $params["fldGoal"]);
		            switch($goal){
		                case 1: //Profissional qualificado
		                    $flds .= "SCHOLARSHIP, GRADUATION, PROFESSION, LINKEDINURL, GRADLOCATION, COMMENT1";
		                    $prms .= ":scholarship, :graduation, :profession, :linkedinurl, :gradlocation, :comment1";
		                    break;
		                case 2: //Estudante universitário
		                    $flds .= "SCHOLARSHIP, GRADUATION, GRADLOCATION, ENEM, GRADCOURSE, COMMENT2";
		                    $prms .= ":scholarship, :graduation, :gradlocation, :enem, :gradcourse, :comment2";
		                    break;
		                case 3: //Empreendedor / Investidor
		                    $flds .= "INVSEGMENT, PREVISIT, INVTLOCATION, INVBUDGET, COMMENT3";
		                    $prms .= ":invsegment, :previsit, :invtlocation, :invbudget, :comment3";
		                    break;
		                case 4: //Aposentado
		                    $flds .= "RETDSTATUS, RETWAGE, RETDLOCATION, RETDALONE, RETMINORSPON";
		                    $prms .= ":retdstatus, :retwage, :retdlocation, :retdalone, :retminorspon";
		                    break;
		                case 5: //Titular de Rendimentos Próprios
		                    $flds .= "COMMENT4";
		                    $prms .= ":comment4";
		                    break;
		                case 6: //Pessoa notória
		                    $flds .= "COMMENT5";
		                    $prms .= ":comment5";
		                    break;
		            }
		        }
		        		        
	            $client = $this->getLastId();
		        $profile = array(
		            "client"        => $client,
		            "isportuguese"  => $params["ISPORTUGUESE"],
		            "bonds"         => $params["BONDS"],
		            "goal"          => (empty($params["fldGoal"]) ? NULL : $params["fldGoal"])
		        );
		        
		        if ($params["BONDS"] != "00000"){
		            $profile = array_merge($profile, 
		                array(
                            "p1name"        => (empty($params["fldParentName1"]) ? NULL : cleanup_string(strtoupper($params["fldParentName1"]))),
                            "p1dob"         => (empty($params["fldDoB1"]) ? NULL : $params["fldDoB1"]),
                            "p1dec"         => (empty($params["fldDec1"]) ? NULL : $params["fldDec1"]),
                            "p2name"        => (empty($params["fldParentName2"]) ? NULL : cleanup_string(strtoupper($params["fldParentName2"]))),
                            "p2dob"         => (empty($params["fldDoB2"]) ? NULL : $params["fldDoB2"]),
                            "p2dec"         => (empty($params["fldDec2"]) ? NULL : $params["fldDec2"]),
                            "p3name"        => (empty($params["fldParentName3"]) ? NULL : cleanup_string(strtoupper($params["fldParentName3"]))),
                            "p3dob"         => (empty($params["fldDoB3"]) ? NULL : $params["fldDoB3"]),
                            "p3dec"         => (empty($params["fldDec3"]) ? NULL : $params["fldDec3"]),
                            "p4name"        => (empty($params["fldParentName4"]) ? NULL : cleanup_string(strtoupper($params["fldParentName4"]))),
                            "p4dob"         => (empty($params["fldDoB4"]) ? NULL : $params["fldDoB4"]),
                            "p4dec"         => (empty($params["fldDec4"]) ? NULL : $params["fldDec4"]),
                            "p5name"        => (empty($params["fldParentName5"]) ? NULL : cleanup_string(strtoupper($params["fldParentName5"]))),
                            "p5dob"         => (empty($params["fldDoB5"]) ? NULL : $params["fldDoB5"]),
                            "p5dec"         => (empty($params["fldDec5"]) ? NULL : $params["fldDec5"])
		              )
		            ); 
		        }
		        else{
		            switch($goal){
		                case 1: //Profissional qualificado
		                    $dados = array(
		                        "scholarship"   => (empty($params["fldScholarship"]) ? NULL : $params["fldScholarship"]),
		                        "graduation"    => (empty($params["fldGraduation"]) ? NULL : cleanup_string(strtoupper($params["fldGraduation"]))),
		                        "profession"    => (empty($params["fldProfession"]) ? NULL : cleanup_string(strtoupper($params["fldProfession"]))),
		                        "linkedinurl"   => (empty($params["fldLinkedin"]) ? NULL : cleanup_string(strtolower($params["fldLinkedin"]))),
		                        "gradlocation"  => (empty($params["fldGradLocation"]) ? NULL : $params["fldGradLocation"]),
		                        "comment1"      => cleanup_string($params["fldObs"])
		                    );
		                    break;
		                case 2: //Estudante universitário
		                    $dados = array(
		                        "scholarship"   => (empty($params["fldScholarship"]) ? NULL : $params["fldScholarship"]),
		                        "graduation"    => (empty($params["fldGraduation"]) ? NULL : $params["fldGraduation"]),
		                        "gradlocation"  => (empty($params["fldGradLocation"]) ? NULL : $params["fldGradLocation"]),
		                        "enem"          => $params["fldENEM"],
		                        "gradcourse"    => (empty($params["fldCourse"]) ? NULL : cleanup_string(strtoupper($params["fldCourse"]))),
		                        "comment2"      => cleanup_string($params["fldObs"])
		                    );
		                    break;
		                case 3: //Empreendedor / Investidor
		                    $dados = array(
                                "invsegment"    => (empty($params["fldMarketSeg"]) ? NULL : cleanup_string(strtoupper($params["fldMarketSeg"]))),
                                "previsit"      => $params["fldPrevVisit"],
                                "invtlocation"  => $params["fldLocationToInv"],
                                "invbudget"     => $params["fldInvest"],
                                "comment3"      => cleanup_string($params["fldBPlan"])
		                    );
		                    break;
		                case 4: //Aposentado
		                    $dados = array(
		                        "retdstatus"    => $params["fldSitRet"],
		                        "retwage"       => $params["fldRetWage"],
		                        "retdlocation"  => $params["fldLocationToRet"],
		                        "retdalone"     => $params["fldRetCompany"],
		                        "retminorspon"  => $params["fldIsSponsor"]
		                    );
		                    break;
		                case 5: //Titular de Rendimentos Próprios
		                    $dados = array(
                                "comment4"      => cleanup_string($params["fldObs"])
		                    );
		                    break;
		                case 6: //Pessoa notória
		                    $dados = array(
                                "comment5"      => cleanup_string($params["fldObs"])
		                    );
		                    break;
		            }
		            
		        }
		        $stmt  = sprintf("INSERT INTO ES_PROFILE (%s) VALUES (%s)", $flds, $prms);
		        if (!isset($dados)){
		            $rowsAffected = $this->dbc->execute($stmt, $profile);
		        }
		        else{
		            $rowsAffected = $this->dbc->execute($stmt, array_merge($profile, $dados));
		        }
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