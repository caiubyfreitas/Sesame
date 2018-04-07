<?php

require_once("glb/controller.php");
require_once("model/prospect.php");

class ProspectController extends Controller{
    
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
        $this->model = new Prospect($this->dbc);
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
    
    public function changeStatus($params){
        $rowsAffected = 0;
        $this->connect();
        $this->model = new Prospect($this->dbc);
        try{
            $rowsAffected = $this->model->changeStatus($this->params);
            switch((int)$params["status"]){
                case 1:
                    $msg = "Cliente alterado para Prospecto.";
                    break;
                case 2:
                    $msg = "Prospecto promovido a Cliente.";
                    break;
                case 3:
                    $msg = "Cliente inativado.";
                    break;
                default:
                    $msg = "Status indefinido.";
            }
            $this->setResult($rowsAffected, array(), 0, utf8_encode($msg));
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
        $this->model = new Prospect($this->dbc);
        try{
            $rowsAffected = $this->model->update($this->params);
            $this->setResult($rowsAffected, array(), 0, utf8_encode("Dados originais do prospecto foram modificados."));
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
        $this->model = new Prospect($this->dbc);
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
        $this->model = new Prospect($this->dbc);
        try{
            $totalRecords = $this->model->countRecords();
            if ($page > ceil($totalRecords / ProspectController::MAX_PER_PAGE) && $page > 1)
                $page--;
                $startAt = ( ($page - 1) * ProspectController::MAX_PER_PAGE);
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
       
    public function add(){
        $rowsAffected = 0;
        $this->connect();
        $this->model = new Prospect($this->dbc);
        try{
            $rowsAffected = $this->model->add($this->params);
            $this->setResult($rowsAffected, array(), 0, utf8_encode("Cadastro concluído."));
        }
        catch(Exception $e){
            $this->setResult(0, $this->params, 0, $e->getMessage());
        }
        finally{
            $this->model = NULL;
            $this->disconnect();
        }
    }
}

?>