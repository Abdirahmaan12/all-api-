loadDatadoctor();
fillspecialistname();
btnAction = "Insert";


$("#doctorform").on("submit", function(event){
    
    event.preventDefault();
  
  
    let full_name= $("#full_name").val();
    let specialist_name= $("#specialist_name").val();
    let age= $("#age").val();
    let phone= $("#phone").val();
    let adress= $("#adress").val();
    let id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {
        "full_name": full_name,
        "specialist_name": specialist_name,
        "age": age,
        "phone": phone,
        "adress": adress,
        "action": "register_doctor"
    }
  
    }else{
        sendingData = {
            "doctor_id": id,
            "full_name": full_name,
            "specialist_name": specialist_name,
            "age": age,
            "phone": phone,
            "adress": adress,
            "action": "update_doctor"
     }
     }
  
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/doctor.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         dissplaymessage("success", response);
         btnAction="Insert";
         $("#doctorform")[0].reset();
        //  $("#doctormodal").modal("hide");
         loadDatadoctor();
  
       
        
         
  
        }else{
          dissplaymessage("error", response);
        }
        
    },
    error: function(data){
        displaymessage("error", data.responseText);
  
    }
  
  })
  
  })


  function dissplaymessage(type, message){
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

  function loadDatadoctor(){
    $("#doctorTable tbody").html('');
    $("#doctorTable thead").html('');
   
    let sendingData ={
        "action": "read_all_doctor"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/doctor.php",
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
  
                    tr += `<td> <a class="btn btn-info update_info"  update_id=${res['doctor_id']}><i class="fas fa-edit" style="color: #fff"></i></a>&nbsp;&nbsp <a class="btn btn-danger delete_info" delete_id=${res['doctor_id']}><i class="fas fa-trash"style="color: #fff"></i></a> </td>`
                    tr+= "</tr>"
                  
                })
                $("#doctorTable thead").append(th);
                $("#doctorTable tbody").append(tr);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }


  function get_doctor_info(doctor_id){
  
    let sendingData ={
      "action": "get_doctor_info",
      "doctor_id": doctor_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/doctor.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
               btnAction= "update";
               
                $("#update_id").val(response['doctor_id']);
                $("#full_name").val(response['full_Name']);
                $("#specialist_name").val(response['specialist_id']);
                $("#age").val(response['age']);
                $("#phone").val(response['phone']);
                $("#adress").val(response['adress']);
                $("#doctormodal").modal('show');
              
                
              
  
          }else{
            dissplaymessage("error", response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }




function fillspecialistname(){
 
    let sendingData ={
        "action": "read_all_specialist"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/spacialist.php",
      data : sendingData,
  
        success : function(data){
            let status= data.status;
            let response= data.data;
            let html='';
            let tr= '';
  
            if(status){
                response.forEach(res=>{
                  html+= `<option value="${res['specialist_id']}">${res['specialist_name']}</option>`;
                   
                })
  
                $("#specialist_name").append(html);
  
               
            }else{
              dissplaymessage("error", response);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }

  function Delete_doctor(doctor_id){
  
    let sendingData ={
      "action": "Delete_doctor",
      "doctor_id": doctor_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/doctor.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
            swal("Good job!", response, "success");
            loadDatadoctor();
  
              
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }



  $("#doctorTable").on('click', "a.update_info", function(){
    let id= $(this).attr("update_id");
    get_doctor_info(id)
  })
  

  $("#doctorTable").on('click', "a.delete_info", function(){
    let id= $(this).attr("delete_id");
    if(confirm("Are you sure To Delete")){
        Delete_doctor(id)
  
    }
   
  })
