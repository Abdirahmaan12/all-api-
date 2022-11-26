<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];


function read_patient_payment($conn){
    $data = array();
    $array_data = array();
   $query ="CALL read_patient_payment_sp";
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

function register_info($conn){
    extract($_POST);
    $data = array();
    $query = "INSERT INTO information (patient_id, type, date)
     values('$peetient_name', '$type', '$date')";

    $result = $conn->query($query);


    if($result){

       
            $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


function read_all_info($conn){
    $data = array();
    $array_data = array();
   $query ="CALL read_information";
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



function get_info($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="SELECT *FROM information where info_id= '$info_id'";
    $result = $conn->query($query);


    if($result){
        $row = $result->fetch_assoc();
        
        $data = array("status" => true, "data" => $row);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}



function update_info($conn){
    extract($_POST);

    $data = array();

    $query = "UPDATE information set patient_id = '$peetient_name',type = '$type', date= '$date'  WHERE info_id = '$info_id'";
     

    $result = $conn->query($query);


    if($result){

            $data = array("status" => true, "data" => "successfully updated 😂😊😒😎");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


function Delete_info($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="DELETE FROM information where info_id= '$info_id'";
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