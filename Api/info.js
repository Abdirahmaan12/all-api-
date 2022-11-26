loadinfo();
fillpatient_payment();
function fillpatient_payment(){
 
    let sendingData ={
        "action": "read_patient_payment"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/info.php",
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
  
                $("#peetient_name").append(html);
  
               
            }else{
              displaymessage("error", response);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }
  btnAction = "Insert";

  $("#infoform").on("submit", function(event){
    
    event.preventDefault();
  
  
    let peetient_name= $("#peetient_name").val();
    let type= $("#type").val();
    let date= $("#date").val();
    let id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {
        "peetient_name": peetient_name,
        "type": type,
        "date": date,
        "action": "register_info"
    }
  
    }else{
       sendingData = {
        "info_id": id,
        "peetient_name": peetient_name,
        "type": type,
        "date": date,
        "action": "update_info"
    }
    }
  
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/info.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         infomessage("success", response);
         btnAction="Insert";
         $("#infoform")[0].reset();
        //  $("#usermodal").modal("hide");
        loadinfo();
        
       
  
        }else{
          infomessage("error", response);
        }
        
    },
    error: function(data){
        infomessage("error", data.responseText);
  
    }
  
  })
  
  })
  

  
 function loadinfo(){
  $("#infoTable tbody").html('');
  $("#infoTable thead").html('');
 
  let sendingData ={
      "action": "read_all_info"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/info.php",
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
              if(res[r] == "process"){
                tr += `<td><span class="badge badge-danger">${res[r]}</span></td>`;
              }else{
                tr += `<td><span class="badge badge-success">${res[r]}</span></td>`;

              }
             }else{
              tr += `<td>${res[r]}</td>`;
             }

              }
              th += "<td>Action</td></tr>";

              tr += `<td> <a class="btn btn-info update_info"  update_id=${res['info_id']}><i class="fas fa-edit" style="color: #fff"></i></a>&nbsp;&nbsp <a class="btn btn-danger delete_info" delete_id=${res['info_id']}><i class="fas fa-trash"style="color: #fff"></i></a> </td>`
              tr+= "</tr>"
            
          })

          $("#infoTable thead").append(th);
          $("#infoTable tbody").append(tr);
      }

          

      },
      error: function(data){

      }

  })
}

  
function infomessage(type, message){
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

  function get_info(info_id){
  
    let sendingData ={
      "action": "get_info",
      "info_id": info_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/info.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
               btnAction= "update";
               
                $("#update_id").val(response['info_id']);
                $("#peetient_name").val(response['patient_id']);
                $("#type").val(response['type']);
                $("#date").val(response['date']);
                $("#info_modal").modal('show');
              
                
              
  
          }else{
            infomessage("error", response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }

  function Delete_info(info_id){
  
    let sendingData ={
      "action": "Delete_info",
      "info_id": info_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/info.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
            swal("Good job!", response, "success");
            loadinfo();
  
              
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }

  $("#infoTable").on('click', "a.update_info", function(){
    let id= $(this).attr("update_id");
    get_info(id)
  })
  
  
  $("#infoTable").on('click', "a.delete_info", function(){
    let id= $(this).attr("delete_id");
    if(confirm("Are you sure To Delete")){
        Delete_info(id)
  
    }
   
  })