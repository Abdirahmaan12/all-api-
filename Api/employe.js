btnAction = "Insert";
fill_employe_type();
loademploye();

$("#employeform").on("submit", function(event){
    
    event.preventDefault();
  
  
    let full_name= $("#full_name").val();
    let phone= $("#phone").val();
    let adress= $("#adress").val();
    let employe_type= $("#employe_type").val();
    let date= $("#date").val();
    let id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {
        "full_name": full_name,
        "phone": phone,
        "adress": adress,
        "employe_type": employe_type,
        "date": date,
        "action": "register_employe"
    }
  
    }else{
        sendingData = {
            "employe_id": id,
            "full_name": full_name,
            "phone": phone,
            "adress": adress,
            "employe_type": employe_type,
            "date": date,
            "action": "update_employe"
     }
     }
  
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/employe.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         employemessage("success", response);
         btnAction="Insert";
         $("#employeform")[0].reset();
         loademploye();
    
  
        }else{
          employemessage("error", response);
        }
        
    },
    error: function(data){
        employemessage("error", data.responseText);
  
    }
  
  })
  
  })


  
function fill_employe_type(){
 
    let sendingData ={
        "action": "read_all_em_type"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/em_type.php",
      data : sendingData,
  
        success : function(data){
            let status= data.status;
            let response= data.data;
            let html='';
            let tr= '';
  
            if(status){
                response.forEach(res=>{
                  html+= `<option value="${res['em_type_id']}">${res['name']}</option>`;
                   
                })
  
                $("#employe_type").append(html);
  
               
            }else{
              displaymessage("error", response);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }

  function loademploye(){
    $("#employeTable tbody").html('');
    $("#employeTable thead").html('');
   
    let sendingData ={
        "action": "read_all_employe"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/employe.php",
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
                $("#employeTable thead").append(th);
                $("#employeTable tbody").append(tr);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }

  function get_employe_info(employe_id){
  
    let sendingData ={
      "action": "get_employe_info",
      "employe_id": employe_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/employe.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
               btnAction= "update";
               
                $("#update_id").val(response['employe_id']);
                $("#full_name").val(response['full_name']);
                $("#phone").val(response['phone']);
                $("#adress").val(response['adress']);
                $("#type").val(response['em_type_id']);
                $("#date").val(response['date']);
                $("#employemodal").modal('show');
              
                
              
  
          }else{
            employemessage("error", response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }


  function Delete_employe(employe_id){
  
    let sendingData ={
      "action": "Delete_employe",
      "employe_id": employe_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/employe.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
            swal("Good job!", response, "success");
            loademploye();
  
              
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }

  function employemessage(type, message){
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
  
  $("#employeTable").on('click', "a.update_info", function(){
    let id= $(this).attr("update_id");
    get_employe_info(id)
  })
  

  $("#employeTable").on('click', "a.delete_info", function(){
    let id= $(this).attr("delete_id");
    if(confirm("Are you sure To Delete")){
        Delete_employe(id)
  
    }
   
  })