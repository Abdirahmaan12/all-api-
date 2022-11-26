<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];

function register_doctor($conn){
    extract($_POST);
    $data = array();
    $query = "INSERT INTO doctor(full_Name, specialist_id, age, phone, adress)
     values('$full_name', '$specialist_name', '$age', '$phone', '$adress')";

    $result = $conn->query($query);


    if($result){

       
            $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function read_all_doctor($conn){
    $data = array();
    $array_data = array();
   $query ="CALL read_doctor_sp";
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

function get_doctor_info($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="SELECT *FROM doctor where doctor_id= '$doctor_id'";
    $result = $conn->query($query);


    if($result){
        $row = $result->fetch_assoc();
        
        $data = array("status" => true, "data" => $row);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}



function update_doctor($conn){
    extract($_POST);

    $data = array();

    $query = "UPDATE doctor set full_Name = '$full_name',specialist_id = '$specialist_name', age = '$age',phone = '$phone', adress= '$adress' WHERE doctor_id = '$doctor_id'";
     

    $result = $conn->query($query);


    if($result){

            $data = array("status" => true, "data" => "successfully updated 😂😊😒😎");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function Delete_doctor($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="DELETE FROM doctor where doctor_id= '$doctor_id'";
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