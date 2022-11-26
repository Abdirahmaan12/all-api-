<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];

function register_specialist($conn){
    extract($_POST);
    $data = array();
    $query = "INSERT INTO specialist(specialist_name)
     values('$specialist_name')";

    $result = $conn->query($query);


    if($result){

       
            $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function read_all_specialist($conn){
    $data = array();
    $array_data = array();
   $query ="SELECT * from specialist";
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

function get_specialist($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="SELECT *FROM specialist where specialist_id= '$specialist_id'";
    $result = $conn->query($query);


    if($result){
        $row = $result->fetch_assoc();
        
        $data = array("status" => true, "data" => $row);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function update_specialist($conn){
    extract($_POST);

    $data = array();

    $query = "UPDATE specialist set specialist_name = '$specialist_name' WHERE specialist_id = '$specialist_id'";
     

    $result = $conn->query($query);


    if($result){

            $data = array("status" => true, "data" => "successfully updated 😂😊😒😎");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function Delete_specialist($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="DELETE FROM specialist where specialist_id= '$specialist_id'";
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