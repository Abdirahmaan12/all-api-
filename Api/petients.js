loadDatapetient();

btnAction = "Insert";


$("#patientform").on("submit", function(event){
    
    event.preventDefault();
  
  
    let first_name= $("#first_name").val();
    let last_name= $("#last_name").val();
    let phone= $("#phone").val();
    let adress= $("#adress").val();
    let state= $("#state").val();
    let id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {
        "first_name": first_name,
        "last_name": last_name,
        "phone": phone,
        "adress": adress,
        "state": state,
        "action": "register_patient"
    }
  
    }else{
        sendingData = {
            "patient_id": id,
            "first_name": first_name,
            "last_name": last_name,
            "phone": phone,
            "adress": adress,
            "state": state,
            "action": "update_patient"
     }
     }
  
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/petient.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         dispalaymessage("success", response);
         btnAction="Insert";
         $("#patientform")[0].reset();
         $("patientmodal").modal("hide");
         loadDatapetient();
  
       
        
         
  
        }else{
          dispalaymessage("error", response);
        }
        
    },
    error: function(data){
        displaymessage("error", data.responseText);
  
    }
  
  })
  
  })


 function loadDatapetient(){
    $("#patientTable tbody").html('');
    $("#patientTable thead").html('');
   
    let sendingData ={
        "action": "read_all_patient"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/petient.php",
      data : sendingData,
  
        success : function(data){
            let status= data.status;
            let response= data.data;
            let html='';
            let tr= '';
            let th= '';
       
            
          if(status){
            response.forEach(res=>{
                tr += "<tr>";
                th = "<tr>";
                for(let r in res){
                  th += `<th>${r}</th>`;

               if(r == "status"){
                if(res[r] == "booking"){
                  tr += `<td><span class="badge badge-success">${res[r]}</span></td>`;
                }else{
                  tr += `<td><span class="badge badge-danger">${res[r]}</span></td>`;
                }
               }else{
                tr += `<td>${res[r]}</td>`;
               }

                }
                th += "<td>Action</td></tr>";

                tr += `<td> <a class="btn btn-info update_info"  update_id=${res['patient_id']}><i class="fas fa-edit" style="color: #fff"></i></a>&nbsp;&nbsp <a class="btn btn-danger delete_info" delete_id=${res['patient_id']}><i class="fas fa-trash"style="color: #fff"></i></a> </td>`
                tr+= "</tr>"
              
            })

            $("#patientTable thead").append(th);
            $("#patientTable tbody").append(tr);
        }

            
  
        },
        error: function(data){
  
        }
  
    })
  }

  function get_patient_info(patient_id){
  
    let sendingData ={
      "action": "get_patient_info",
      "patient_id": patient_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/petient.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
               btnAction= "update";
               
                $("#update_id").val(response['patient_id']);
                $("#first_name").val(response['first_name']);
                $("#last_name").val(response['last_name']);
                $("#phone").val(response['phone']);
                $("#adress").val(response['adress']);
                $("#state").val(response['state']);
                $("#patientmodal").modal('show');
              
                
              
  
          }else{
            dispalaymessage("error", response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }
  
  

  function dispalaymessage(type, message){
    let success =   document.querySelector(".alert-success");
    let error =   document.querySelector(".alert-danger");
    if(type== "success"){
      error.classList= "alert alert-danger d-none";
       success.classList= "alert alert-success";
       success.innerHTML= message;
  
       setTimeout(function(){
        $("#patientmodal").modal("hide");
        success.classList= "alert alert-success d-none";
        $("#patientform")[0].reset();
  
       },2000);
    }else{
      error.classList= "alert alert-danger";
      error.innerHTML= message;
    }
  }


  function Delete_patient(patient_id){
  
    let sendingData ={
      "action": "Delete_patient",
      "patient_id": patient_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/petient.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
            swal("Good job!", response, "success");
            loadDatapetient();
  
              
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }

  $("#patientTable").on('click', "a.update_info", function(){
    let id= $(this).attr("update_id");
    get_patient_info(id)
  })
  
  
  $("#patientTable").on('click', "a.delete_info", function(){
    let id= $(this).attr("delete_id");
    if(confirm("Are you sure To Delete")){
        Delete_patient(id)
  
    }
   
  })