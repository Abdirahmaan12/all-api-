loadapointment();
fillpatient_result();

function fillpatient_result(){
 
    let sendingData ={
        "action": "read_patient_result"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/apointmentt.php",
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
  
                $("#peytient_name").append(html);
  
               
            }else{
              displaymessage("error", response);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }

  btnAction = "Insert";

  $("#apointment_form").on("submit", function(event){
    
    event.preventDefault();
  
  
    let peytient_name= $("#peytient_name").val();
    let Decsriprion= $("#Decsriprion").val();
    let start_date= $("#start_date").val();
    let return_date= $("#return_date").val();
    let id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {
        "peytient_name": peytient_name,
        "Decsriprion": Decsriprion,
        "start_date": start_date,
        "return_date": return_date,
        "action": "register_apointment"
    }
  
    }else{
       sendingData = {
        "apointment_id": id,
        "peytient_name": peytient_name,
        "Decsriprion": Decsriprion,
        "start_date": start_date,
        "return_date": return_date,
        "action": "update_apointment"
    }
    }
  
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/apointmentt.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         apointmentmessage("success", response);
         btnAction="Insert";
         $("#apointment_form")[0].reset();
         loadapointment();
        
       
  
        }else{
          apointmentmessage("error", response);
        }
        
    },
    error: function(data){
        apointmentmessage("error", data.responseText);
  
    }
  
  })
  
  })
  

  function loadapointment(){
    $("#apointment_Table tbody").html('');
    $("#apointment_Table thead").html('');
   
    let sendingData ={
        "action": "read_all_apointment"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/apointmentt.php",
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
  
                    tr += `<td> <a class="btn btn-info update_info"  update_id=${res['ID']}><i class="fas fa-edit" style="color: #fff"></i></a>&nbsp;&nbsp <a class="btn btn-danger delete_info" delete_id=${res['ID']}><i class="fas fa-trash"style="color: #fff"></i></a> </td>`
                    tr+= "</tr>"
                  
                })
                $("#apointment_Table thead").append(th);
                $("#apointment_Table tbody").append(tr);
            }
  
  
            
  
        },
        error: function(data){
  
        }
  
    })
   }

   function get_apointment(apointment_id){
  
    let sendingData ={
      "action": "get_apointment",
      "apointment_id": apointment_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/apointmentt.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
               btnAction= "update";
               
                $("#update_id").val(response['apointment_id']);
                $("#peytient_name").val(response['patient_id']);
                $("#Decsriprion").val(response['description']);
                $("#start_date").val(response['start_date']);
                $("#return_date").val(response['return_date']);
                $("#apointment_modal").modal('show');
              
                
              
  
          }else{
            apointmentmessage("error", response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }


  function apointmentmessage(type, message){
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

  function Delete_apointment(apointment_id){
  
    let sendingData ={
      "action": "Delete_apointment",
      "apointment_id": apointment_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/apointmentt.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
            swal("Good job!", response, "success");
            loadapointment();
  
              
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }












  $("#apointment_Table").on('click', "a.update_info", function(){
    let id= $(this).attr("update_id");
    get_apointment(id)
  })
  
  
  $("#apointment_Table").on('click', "a.delete_info", function(){
    let id= $(this).attr("delete_id");
    if(confirm("Are you sure To Delete")){
        Delete_apointment(id)
  
    }
   
  })