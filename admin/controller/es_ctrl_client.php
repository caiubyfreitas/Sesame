<?php

require_once("glb/controller.php");
require_once("model/client.php");

class ClientController extends Controller{
    
    const MAX_PER_PAGE = 10;
    
    public function __construct(){
        parent::__construct();
    }
    
    public function __destruct(){
        parent::__destruct();
    }
    
    public function call($action, $params){
        return parent::call($action, $params);
    }
    
    public function findById(){
        $this->connect();
        $this->model = new Client($this->dbc);
        try{
            $row = $this->model->findById($this->params);
            $this->setResult(1, $row, 0, $this->params);
        }
        catch(Exception $e){
            $this->setResult(0, array(), 0, $e->getMessage());
        }
        finally{
            $this->model = NULL;
            $this->disconnect();
        }
    }

   public function update(){
        $rowsAffected = 0;
        $this->connect();
        $this->model = new Client($this->dbc);
        try{
            $rowsAffected = $this->model->update($this->params);
            $this->setResult($rowsAffected, array(), 0, utf8_encode("Dados originais do cliente foram modificados."));
        }
        catch(Exception $e){
            $this->setResult(0, array(), 0, $e->getMessage());
        }
        finally{
            $this->model = NULL;
            $this->disconnect();
        }
    }
    
    public function remove(){
        $rowsAffected = 0;
        $this->connect();
        $this->model = new Client($this->dbc);
        try{
            $rowsAffected = $this->model->remove($this->params);
            $this->setResult($rowsAffected, array(), 0, "Registro removido.");
        }
        catch(Exception $e){
            $this->setResult(0, array(), 0, $e->getMessage());
        }
        finally{
            $this->model = NULL;
            $this->disconnect();
        }
    }
    
    public function getAllRecords($page = 1){
        $totalRecords = 0;
        $this->connect();
        $this->model = new Client($this->dbc);
        try{
            $totalRecords = $this->model->countRecords();
            if ($page > ceil($totalRecords / ClientController::MAX_PER_PAGE) && $page > 1)
                $page--;
                $startAt = ( ($page - 1) * ClientController::MAX_PER_PAGE);
                $rows = $this->model->getAllRecords($startAt);
                if (count($rows) === 0){
                    $this->setResult(0, array(), 0, utf8_encode("Não há registro de novas aplicações."));
                }
                else{
                    $this->setResult($totalRecords, $rows, $page, "");
                }
        }
        catch(Exception $e){
            $this->setResult(0, array(), 0, $e->getMessage());
        }
        finally{
            $this->model = NULL;
            $this->disconnect();
        }
    }
       
}

?>