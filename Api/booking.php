<?php
header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];

function register_booking($conn){
    extract($_POST);
    $data = array();
    $query = "INSERT INTO booking(patient_id, booking_number, doctor_id, amount, shift_id, info, time)
     values('$patient_name', '$booking_number', '$doctor_name', '$amount', '$shift_name',  '$info', '$time')";

    $result = $conn->query($query);


    if($result){

       
            $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function read_all_booking($conn){
    $data = array();
    $array_data = array();
   $query ="CALL read_all_booking";
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

function read_alll_booking($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="CALL get_booking_sp('$booking_id')";
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

function get_booking_info($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="SELECT * FROM booking where booking_id= '$booking_id'";
    $result = $conn->query($query);


    if($result){
        $row = $result->fetch_assoc();
        
        $data = array("status" => true, "data" => $row);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


function update_booking($conn){
    extract($_POST);

    $data = array();

    $query = "UPDATE booking set patient_id = '$patient_name', booking_number = '$booking_number', doctor_id = '$doctor_name',amount = '$amount', shift_id= '$shift_name', info= '$info', time= '$time' WHERE booking_id= '$booking_id'";

    $result = $conn->query($query);


    if($result){

            $data = array("status" => true, "data" => "successfully updated 😂😊😒😎");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function Delete_booking($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="DELETE FROM booking where booking_id= '$booking_id'";
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