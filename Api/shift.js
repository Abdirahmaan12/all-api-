
loadshift();
btnAction = "Insert";

$("#shiftform").on("submit", function(event){
    
  event.preventDefault();


  let shift_name= $("#shift_name").val();
  let id= $("#update_id").val();

  let sendingData = {}

  if(btnAction == "Insert"){
     sendingData = {
      "shift_name": shift_name,
      "action": "register_shift"
  }

  }else{
     sendingData = {
      "shift_id": id,
      "shift_name": shift_name,
      "action": "update_shift"
  }
  }



$.ajax({
  method: "POST",
  dataType: "JSON",
  url: "Api/shifti.php",
  data : sendingData,
  success: function(data){
      let status= data.status;
      let response= data.data;

      if(status){
       displymessage("success", response);
       btnAction="Insert";
       $("#shiftform")[0].reset();
    //    $("#specialistmodal").modal("hide");
       loadshift();

     
      
       

      }else{
        displymessage("error", response);
      }
      
  },
  error: function(data){
      displaymessage("error", data.responseText);

  }

})

})

function loadshift(){
    $("#shiftTable tbody").html('');
    $("#shiftTable thead").html('');
   
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
  
                    tr += `<td> <a class="btn btn-info update_info"  update_id=${res['shift_id']}><i class="fas fa-edit" style="color: #fff"></i></a>&nbsp;&nbsp <a class="btn btn-danger delete_info" delete_id=${res['shift_id']}><i class="fas fa-trash"style="color: #fff"></i></a> </td>`
                    tr+= "</tr>"
                  
                })
                $("#shiftTable thead").append(th);
                $("#shiftTable tbody").append(tr);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }

  function get_shift(shift_id){
  
    let sendingData ={
      "action": "get_shift",
      "shift_id": shift_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/shifti.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
               btnAction= "update";
               
                $("#update_id").val(response['shift_id']);
                $("#shift_name").val(response['name']);
                $("#shiftmodal").modal('show');
              
                
              
  
          }else{
            displymessage("error", response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }

  function Delete_shift(shift_id){
  
    let sendingData ={
      "action": "Delete_shift",
      "shift_id": shift_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/shifti.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
            swal("Good job!", response, "success");
            loadshift();
  
              
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }


  function displymessage(type, message){
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

  $("#shiftTable").on('click', "a.update_info", function(){
    let id= $(this).attr("update_id");
    get_shift(id)
  })

  $("#shiftTable").on('click', "a.delete_info", function(){
    let id= $(this).attr("delete_id");
    if(confirm("Are you sure To Delete")){
        Delete_shift(id)
  
    }
   
  })