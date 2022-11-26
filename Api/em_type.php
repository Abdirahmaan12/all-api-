<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];



function register_em_type($conn){
    extract($_POST);
    $data = array();
    $query = "INSERT INTO employe_type(name)
     values('$em_type')";

    $result = $conn->query($query);


    if($result){

       
            $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function read_all_em_type($conn){
    $data = array();
    $array_data = array();
   $query ="SELECT * from employe_type";
    $result = $conn->query($query);


    if($result){
        while($row = $result->fetch_assoc()){
            $array_data[] = $row;
        }
        $data = array("status" => true, "data" => $array_data);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function get_em_type($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="SELECT *FROM employe_type where em_type_id= '$em_type_id'";
    $result = $conn->query($query);


    if($result){
        $row = $result->fetch_assoc();
        
        $data = array("status" => true, "data" => $row);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


function update_em_type($conn){
    extract($_POST);

    $data = array();

    $query = "UPDATE employe_type set name = '$em_type' WHERE em_type_id = '$em_type_id'";
     

    $result = $conn->query($query);


    if($result){

            $data = array("status" => true, "data" => "successfully updated 😂😊😒😎");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}
function Delete_em_type($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="DELETE FROM employe_type where em_type_id= '$em_type_id'";
    $result = $conn->query($query);


    if($result){
   
        
        $data = array("status" => true, "data" => "successfully Deleted😎");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

if(isset($_POST['action'])){
    $action = $_POST['action'];
    $action($conn);
}else{
    echo json_encode(array("status" => false, "data"=> "Action Required....."));
}



?>