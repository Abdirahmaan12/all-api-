
loadaccount();
btnAction = "Insert";


$("#accountform").on("submit", function(event){
    
    event.preventDefault();
  
  
    let bank_name= $("#bank_name").val();
    let holder_name= $("#holder_name").val();
    let Accoun_number= $("#Accoun_number").val();
    let Balance= $("#Balance").val();
    let date= $("#date").val();
    let id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {
        "bank_name": bank_name,
        "holder_name": holder_name,
        "Accoun_number": Accoun_number,
        "Balance": Balance,
        "date": date,
        "action": "register_account"
    }
  
    }else{
        sendingData = {
            "accoun_id": id,
            "bank_name": bank_name,
            "holder_name": holder_name,
            "Accoun_number": Accoun_number,
            "Balance": Balance,
            "date": date,
            "action": "update_account"
     }
     }
  
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/Account.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         displaymesage("success", response);
         btnAction="Insert";
         $("#accountform")[0].reset();
        //  $("patientmodal").modal("hide");
        loadaccount();
  
       
        
         
  
        }else{
          displaymessage("error", response);
        }
        
    },
    error: function(data){
        displaymesage("error", data.responseText);
  
    }
  
  })
  
  })




  function loadaccount(){
    $("#accountTable tbody").html('');
    $("#accountTable thead").html('');
   
    let sendingData ={
        "action": "read_account"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/Account.php",
      data : sendingData,
  
        success : function(data){
            let status= data.status;
            let response= data.data;
            let html='';
            let tr= '';
            let th= '';
       
            
            if(status){
                response.forEach(res=>{
                  th = "<tr>";
                  for(let r in res){
                  th += `<th>${r}</th>`;
                 }
  
                 th += "<td>Action</td></tr>";
  
  
  
  
                    tr += "<tr>";
                    for(let r in res){
  
                
                    tr += `<td>${res[r]}</td>`;
                   
  
                    }
  
                    tr += `<td> <a class="btn btn-info update_info"  update_id=${res['accoun_id']}><i class="fas fa-edit" style="color: #fff"></i></a>&nbsp;&nbsp <a class="btn btn-danger delete_info" delete_id=${res['accoun_id']}><i class="fas fa-trash"style="color: #fff"></i></a> </td>`
                    tr+= "</tr>"
                  
                })
                $("#accountTable thead").append(th);
                $("#accountTable tbody").append(tr);
            }

            
  
        },
        error: function(data){
  
        }
  
    })
  }


  function get_accoun_info(accoun_id){
  
    let sendingData ={
      "action": "get_account_info",
      "accoun_id": accoun_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/Account.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
               btnAction= "update";
               
                $("#update_id").val(response['accoun_id']);
                $("#bank_name").val(response['bank_name']);
                $("#holder_name").val(response['holder_name']);
                $("#Accoun_number").val(response['Accoun_number']);
                $("#Balance").val(response['Balance']);
                $("#date").val(response['date']);
                $("#acountmodal").modal('show');
               loadaccount();
              
                
              
  
          }else{
            displaymesage("error", response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }
 
  function displaymesage(type, message){
    let success =   document.querySelector(".alert-success");
    let error =   document.querySelector(".alert-danger");
    if(type== "success"){
      error.classList= "alert alert-danger d-none";
       success.classList= "alert alert-success";
       success.innerHTML= message;
  
       setTimeout(function(){
        $("#accountmodal").modal("hide");
        success.classList= "alert alert-success d-none";
        // $("#patientform")[0].reset();
  
       },2000);
    }else{
      error.classList= "alert alert-danger";
      error.innerHTML= message;
    }
  }

  function Delete_account(accoun_id){
  
    let sendingData ={
      "action": "Delete_account",
      "accoun_id": accoun_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/Account.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
            swal("Good job!", response, "success");
            loadaccount();
  
              
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }


  $("#accountTable").on('click', "a.update_info", function(){
    let id= $(this).attr("update_id");
    get_accoun_info(id)
  })

  $("#accountTable").on('click', "a.delete_info", function(){
    let id= $(this).attr("delete_id");
    if(confirm("Are you sure To Delete")){
        Delete_account(id)
  
    }
   
  })