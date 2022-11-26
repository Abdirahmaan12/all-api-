<?php
header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];

function register_account($conn){
    extract($_POST);
    $data = array();
    $query = "INSERT INTO account(bank_name, holder_name, Accoun_number, Balance, date)
     values('$bank_name', '$holder_name','$Accoun_number', '$Balance', '$date')";

    $result = $conn->query($query);


    if($result){

       
            $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


function read_account($conn){
    $data = array();
    $array_data = array();
   $query ="SELECT * FROM account";
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


function get_account_info($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="SELECT * FROM account where accoun_id= '$accoun_id'";
    $result = $conn->query($query);


    if($result){
        $row = $result->fetch_assoc();
        
        $data = array("status" => true, "data" => $row);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function update_account($conn){
    extract($_POST);

    $data = array();

    $query = "UPDATE account set bank_name = '$bank_name', holder_name = '$holder_name', Accoun_number= '$Accoun_number', Balance = '$Balance', date = '$date' WHERE accoun_id= '$accoun_id'";

    $result = $conn->query($query);


    if($result){

            $data = array("status" => true, "data" => "successfully updated 😂😊😒😎");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}



function Delete_account($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="DELETE FROM account where accoun_id= '$accoun_id'";
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






