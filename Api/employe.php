<?php


header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];

function register_employe($conn){
    extract($_POST);
    $data = array();
    $query = "INSERT INTO employee(full_name, phone, adress, em_type_id, date)
     values('$full_name', '$phone', '$adress', '$employe_type', '$date')";

    $result = $conn->query($query);


    if($result){

       
            $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function read_all_employe($conn){
    $data = array();
    $array_data = array();
   $query ="CALL read_all_employe";
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


function get_employe_info($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="SELECT *FROM employee where employe_id= '$employe_id'";
    $result = $conn->query($query);


    if($result){
        $row = $result->fetch_assoc();
        
        $data = array("status" => true, "data" => $row);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


function update_employe($conn){
    extract($_POST);

    $data = array();

    $query = "UPDATE employee set full_Name = '$full_name', phone = '$phone', adress= '$adress', em_type_id= '$employe_type', date= '$date' WHERE employe_id = '$employe_id'";
     

    $result = $conn->query($query);


    if($result){

            $data = array("status" => true, "data" => "successfully updated 😂😊😒😎");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


function Delete_employe($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="DELETE FROM employee where employe_id= '$employe_id'";
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