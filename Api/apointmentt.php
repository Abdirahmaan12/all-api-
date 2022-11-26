<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];


function read_patient_result($conn){
    $data = array();
    $array_data = array();
   $query ="CALL read_all_patient_result";
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


function register_apointment($conn){
    extract($_POST);
    $data = array();
    $query = "INSERT INTO apointment (patient_id, description, start_date, return_date)
     values('$peytient_name', '$Decsriprion', '$start_date', '$return_date')";

    $result = $conn->query($query);


    if($result){

       
            $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


function read_all_apointment($conn){
    $data = array();
    $array_data = array();
   $query ="CALL read_all_apointment";
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


function read_all_apointment_statement($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="CALL read_all_apointment_statement('$apointment_id')";
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



function get_apointment($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="SELECT *FROM apointment where apointment_id= '$apointment_id'";
    $result = $conn->query($query);


    if($result){
        $row = $result->fetch_assoc();
        
        $data = array("status" => true, "data" => $row);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


function update_apointment($conn){
    extract($_POST);

    $data = array();

    $query = "UPDATE apointment set patient_id = '$peytient_name',description = '$Decsriprion', start_date= '$start_date', return_date= '$return_date'  WHERE apointment_id = '$apointment_id'";
     

    $result = $conn->query($query);


    if($result){

            $data = array("status" => true, "data" => "successfully updated 😂😊😒😎");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}



function Delete_apointment($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="DELETE FROM apointment where apointment_id= '$apointment_id'";
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