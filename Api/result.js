loadresult();
fillpatient_xray();
function fillpatient_xray(){
 
    let sendingData ={
        "action": "read_patient_xray"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/resultt.php",
      data : sendingData,
  
        success : function(data){
            let status= data.status;
            let response= data.data;
            let html='';
            let tr= '';
  
            if(status){
                response.forEach(res=>{
                  html+= `<option value="${res['patient_id']}">${res['patient_name']}</option>`;
                   
                })
  
                $("#p_namee").append(html);
  
               
            }else{
              displaymessage("error", response);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }

  btnAction = "Insert";

  $("#resultform").on("submit", function(event){
    
    event.preventDefault();
  
  
    let p_namee= $("#p_namee").val();
    let result= $("#result").val();
    let id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {
        "p_namee": p_namee,
        "result": result,
        "action": "register_result"
    }
  
    }else{
       sendingData = {
        "result_id": id,
        "p_namee": p_namee,
        "result": result,
        "action": "update_result"
    }
    }
  
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/resultt.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         resultmessage("success", response);
         btnAction="Insert";
         $("#resultform")[0].reset();
         loadresult();
      

  
        }else{
          resultmessage("error", response);
        }
        
    },
    error: function(data){
        resultmessage("error", data.responseText);
  
    }
  
  })
  
  })


  function resultmessage(type, message){
    let success =   document.querySelector(".alert-success");
    let error =   document.querySelector(".alert-danger");
    if(type== "success"){
      error.classList= "alert alert-danger d-none";
       success.classList= "alert alert-success";
       success.innerHTML= message;
  
       setTimeout(function(){
        // $("#doctormodal").modal("hide");
        success.classList= "alert alert-success d-none";
       
  
       },2000);
    }else{
      error.classList= "alert alert-danger";
      error.innerHTML= message;
    }
  }

  function loadresult(){
    $("#resultTable tbody").html('');
    $("#resultTable thead").html('');
   
    let sendingData ={
        "action": "read_all_result"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/resultt.php",
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
  
                    tr += `<td> <a class="btn btn-info update_info"  update_id=${res['result_id']}><i class="fas fa-edit" style="color: #fff"></i></a>&nbsp;&nbsp <a class="btn btn-danger delete_info" delete_id=${res['result_id']}><i class="fas fa-trash"style="color: #fff"></i></a> </td>`
                    tr+= "</tr>"
                  
                })
                $("#resultTable thead").append(th);
                $("#resultTable tbody").append(tr);
            }
  
            
  
        },
        error: function(data){
  
        }
  
    })
  }

  
  function get_result(result_id){
  
    let sendingData ={
      "action": "get_result",
      "result_id": result_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/resultt.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
               btnAction= "update";
               
                $("#update_id").val(response['result_id']);
                $("#p_namee").val(response['patient_id']);
                $("#result").val(response['result']);
                $("#resultmodal").modal('show');
              
                
              
  
          }else{
            resultmessage("error", response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }


  function Delete_result(result_id){
  
    let sendingData ={
      "action": "Delete_result",
      "result_id": result_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/resultt.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
            swal("Good job!", response, "success");
            loadresult();
  
              
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }



  $("#resultTable").on('click', "a.update_info", function(){
    let id= $(this).attr("update_id");
    get_result(id)
  })
  
  
  $("#resultTable").on('click', "a.delete_info", function(){
    let id= $(this).attr("delete_id");
    if(confirm("Are you sure To Delete")){
        Delete_result(id)
  
    }
   
  })