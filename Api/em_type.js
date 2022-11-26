
load_em_type();
btnAction = "Insert";

$("#em_type_form").on("submit", function(event){
    
  event.preventDefault();


  let em_type= $("#em_type").val();
  let id= $("#update_id").val();

  let sendingData = {}

  if(btnAction == "Insert"){
     sendingData = {
      "em_type": em_type,
      "action": "register_em_type"
  }

  }else{
     sendingData = {
      "em_type_id": id,
      "em_type": em_type,
      "action": "update_em_type"
  }
  }



$.ajax({
  method: "POST",
  dataType: "JSON",
  url: "Api/em_type.php",
  data : sendingData,
  success: function(data){
      let status= data.status;
      let response= data.data;

      if(status){
       typemessage("success", response);
       btnAction="Insert";
       $("#em_type_form")[0].reset();
  
       load_em_type();

     
      
       

      }else{
        typemessage("error", response);
      }
      
  },
  error: function(data){
      typemessage("error", data.responseText);

  }

})

})

function load_em_type(){
    $("#em_type_Table tbody").html('');
    $("#em_type_Table thead").html('');
   
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
  
                    tr += `<td> <a class="btn btn-info update_info"  update_id=${res['em_type_id']}><i class="fas fa-edit" style="color: #fff"></i></a>&nbsp;&nbsp <a class="btn btn-danger delete_info" delete_id=${res['em_type_id']}><i class="fas fa-trash"style="color: #fff"></i></a> </td>`
                    tr+= "</tr>"
                  
                })
                $("#em_type_Table thead").append(th);
                $("#em_type_Table tbody").append(tr);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }

  function get_em_type(em_type_id){
  
    let sendingData ={
      "action": "get_em_type",
      "em_type_id": em_type_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/em_type.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
               btnAction= "update";
               
                $("#update_id").val(response['em_type_id']);
                $("#em_type").val(response['name']);
                $("#em_type_modal").modal('show');
              
                
              
  
          }else{
            typemessage("error", response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }

  function Delete_em_type(em_type_id){
  
    let sendingData ={
      "action": "Delete_em_type",
      "em_type_id": em_type_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/em_type.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
            swal("Good job!", response, "success");
            load_em_type();
  
              
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }


  function typemessage(type, message){
    let success =   document.querySelector(".alert-success");
    let error =   document.querySelector(".alert-danger");
    if(type== "success"){
      error.classList= "alert alert-danger d-none";
       success.classList= "alert alert-success";
       success.innerHTML= message;
  
       setTimeout(function(){
        // $("#specialistmodal").modal("hide");
        success.classList= "alert alert-success d-none";
  
       },3000);
    }else{
      error.classList= "alert alert-danger";
      error.innerHTML= message;
    }
  }

  $("#em_type_Table").on('click', "a.update_info", function(){
    let id= $(this).attr("update_id");
    get_em_type(id)
  })

  $("#em_type_Table").on('click', "a.delete_info", function(){
    let id= $(this).attr("delete_id");
    if(confirm("Are you sure To Delete")){
        Delete_em_type(id)
  
    }
   
  })