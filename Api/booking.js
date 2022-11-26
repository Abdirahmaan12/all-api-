loadbooking();
fillpetientname();
filldoctorname();
fillshift();
function fillpetientname(){
 
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
  
            if(status){
                response.forEach(res=>{
                  html+= `<option value="${res['patient_id']}">${res['first_name']} ${res['last_name']}</option>`;
                   
                })
  
                $("#patient_name").append(html);
  
               
            }else{
              displaymessage("error", response);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }

  function filldoctorname(){
 
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
  
            if(status){
                response.forEach(res=>{
                  html+= `<option value="${res['doctor_id']}">${res['full_Name']}</option>`;
                   
                })
  
                $("#doctor_name").append(html);
  
               
            }else{
              displaymessage("error", response);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }

  function fillshift(){
 
    let sendingData ={
        "action": "read_all_shift"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/shifti.php",
      data : sendingData,
  
        success : function(data){
            let status= data.status;
            let response= data.data;
            let html='';
            let tr= '';
  
            if(status){
                response.forEach(res=>{
                  html+= `<option value="${res['shift_id']}">${res['name']}</option>`;
                   
                })
  
                $("#shift_name").append(html);
  
               
            }else{
              displaymessage("error", response);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }

  btnAction = "Insert";


$("#bookingform").on("submit", function(event){
    
    event.preventDefault();
  
  
    let patient_name= $("#patient_name").val();
    let booking_number= $("#booking_number").val();
    let doctor_name= $("#doctor_name").val();
    let amount= $("#amount").val();
    let shift_name= $("#shift_name").val();
    let info= $("#info").val();
    let time= $("#time").val();
    let id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {
        "patient_name": patient_name,
        "booking_number": booking_number,
        "doctor_name": doctor_name,
        "amount": amount,
        "shift_name": shift_name,
        "info": info,
        "time": time,
        "action": "register_booking"
    }
  
    }else{
        sendingData = {
            "booking_id": id,
            "patient_name": patient_name,
            "booking_number": booking_number,
            "doctor_name": doctor_name,
            "amount": amount,
            "shift_name": shift_name,
            "info": info,
            "time": time,
            "action": "update_booking"
     }
     }
  
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/booking.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         dispplaymessage("success", response);
         btnAction="Insert";
         $("#bookingform")[0].reset();
        loadbooking();
  
       
        
         
  
        }else{
          dispplaymessage("error", response);
        }
        
    },
    error: function(data){
        displaymessage("error", data.responseText);
  
    }
  
  })
  
  })



  function loadbooking(){
    $("#bookingTable tbody").html('');
    $("#bookingTable thead").html('');
   
    let sendingData ={
        "action": "read_all_booking"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/booking.php",
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
                  if(res[r] == "pending"){
                    tr += `<td><span class="badge badge-danger">${res[r]}</span></td>`;

                  }else{
                    tr += `<td><span class="badge badge-success">${res[r]}</span></td>`;

                  }
                 }else{
                  tr += `<td>${res[r]}</td>`;
                 }
  
                  }
                  th += "<td>Action</td></tr>";
  
                  tr += `<td> <a class="btn btn-info update_info"  update_id=${res['ID']}><i class="fas fa-edit" style="color: #fff"></i></a>&nbsp;&nbsp <a class="btn btn-danger delete_info" delete_id=${res['ID']}><i class="fas fa-trash"style="color: #fff"></i></a> </td>`
                  tr+= "</tr>"
                
              })
  
              $("#bookingTable thead").append(th);
              $("#bookingTable tbody").append(tr);
          }
  
              
    
          },
          error: function(data){
    
          }
  
    })
  }
 

  function get_booking_info(booking_id){
  
    let sendingData ={
      "action": "get_booking_info",
      "booking_id": booking_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/booking.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
               btnAction= "update";
               
                $("#update_id").val(response['booking_id']);
                $("#patient_name").val(response['patient_id']);
                $("#booking_number").val(response['booking_number']);
                $("#doctor_name").val(response['doctor_id']);
                $("#amount").val(response['amount']);
                $("#shift_name").val(response['shift_id']);
                $("#info").val(response['info']);
                $("#time").val(response['time']);
                $("#bookingmodal").modal('show');
                loadbooking();
              
                
              
  
          }else{
            dispplaymessage("error", response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }

 

  function dispplaymessage(type, message){
    let success =   document.querySelector(".alert-success");
    let error =   document.querySelector(".alert-danger");
    if(type== "success"){
      error.classList= "alert alert-danger d-none";
       success.classList= "alert alert-success";
       success.innerHTML= message;
  
       setTimeout(function(){
        // $("#bookingmodal").modal("hide");
        success.classList= "alert alert-success d-none";
       
  
       },2000);
    }else{
      error.classList= "alert alert-danger";
      error.innerHTML= message;
    }
  }

 
  function Delete_booking(booking_id){
  
    let sendingData ={
      "action": "Delete_booking",
      "booking_id": booking_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/booking.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
            swal("Good job!", response, "success");
            loadbooking();
  
              
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }


  $("#bookingTable").on('click', "a.update_info", function(){
    let id= $(this).attr("update_id");
    get_booking_info(id)
  })

  $("#bookingTable").on('click', "a.delete_info", function(){
    let id= $(this).attr("delete_id");
    if(confirm("Are you sure To Delete")){
      Delete_booking(id)
  
    }
   
  })

