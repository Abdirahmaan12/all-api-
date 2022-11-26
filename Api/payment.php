<?php
header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];


function register_payment($conn){
    extract($_POST);
    $data = array();
    $query = "CALL register_payment_sp('', '$patient_id', '$amount', '$accoun_id', '$p_method_id', '$date')";

    $result = $conn->query($query);


    if($result){

        $row= $result->fetch_assoc();
        if($row['message']== 'Deny'){
            $data = array("status" => false, "data" => "Enter Reall Amount 😂😊😒😎");


        }elseif ($row['message']== 'Registered'){
            $data = array("status" => true, "data" => "Registered succesfully 😂😊😒😎");
        }


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


function read_patient($conn){
    $data = array();
    $array_data = array();
   $query ="CALL read_patient_booking";
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


function read_patient_pending($conn){
    $data = array();
    $array_data = array();
   $query ="CALL get_all_patient_pending";
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


function get_payment_info($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="SELECT * FROM payment where payment_id= '$payment_id'";
    $result = $conn->query($query);


    if($result){
        $row = $result->fetch_assoc();
        
        $data = array("status" => true, "data" => $row);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


function read_all_payment($conn){
    $data = array();
    $array_data = array();
   $query ="CALL read_all_payment";
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


function read_alll_payment($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="CALL read_all_payment_statement('$payment_id')";
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



function update_payment($conn){
    extract($_POST);

    $data = array();

    $query = "UPDATE payment set patient_id = '$patient_id', amount = '$amount', accoun_id = '$accoun_id', p_method_id = '$p_method_id', date= '$date'  WHERE payment_id= '$payment_id'";

    $result = $conn->query($query);


    if($result){

            $data = array("status" => true, "data" => "successfully updated 😂😊😒😎");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


function Delete_payment($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="DELETE FROM payment where payment_id= '$payment_id'";
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