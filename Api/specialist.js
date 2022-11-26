loadDataspecialist();
btnAction = "Insert";

$("#specialistform").on("submit", function(event){
    
  event.preventDefault();


  let specialist_name= $("#specialist_name").val();
  let id= $("#update_id").val();

  let sendingData = {}

  if(btnAction == "Insert"){
     sendingData = {
      "specialist_name": specialist_name,
      "action": "register_specialist"
  }

  }else{
     sendingData = {
      "specialist_id": id,
      "specialist_name": specialist_name,
      "action": "update_specialist"
  }
  }



$.ajax({
  method: "POST",
  dataType: "JSON",
  url: "Api/spacialist.php",
  data : sendingData,
  success: function(data){
      let status= data.status;
      let response= data.data;

      if(status){
       displaymassage("success", response);
       btnAction="Insert";
       $("#specialistform")[0].reset();
      //  $("#specialistmodal").modal("hide");
       loadDataspecialist();

     
      
       

      }else{
        displaymassage("error", response);
      }
      
  },
  error: function(data){
    displaymassage("error", data.responseText);

  }

})

})


function loadDataspecialist(){
    $("#specialistTable tbody").html('');
    $("#specialistTable thead").html('');
   
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
  
                    tr += `<td> <a class="btn btn-info update_info"  update_id=${res['specialist_id']}><i class="fas fa-edit" style="color: #fff"></i></a>&nbsp;&nbsp <a class="btn btn-danger delete_info" delete_id=${res['specialist_id']}><i class="fas fa-trash"style="color: #fff"></i></a> </td>`
                    tr+= "</tr>"
                  
                })
                $("#specialistTable thead").append(th);
                $("#specialistTable tbody").append(tr);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }

  function get_specialist(specialist_id){
  
    let sendingData ={
      "action": "get_specialist",
      "specialist_id": specialist_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/spacialist.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
               btnAction= "update";
               
                $("#update_id").val(response['specialist_id']);
                $("#specialist_name").val(response['specialist_name']);
                $("#specialistmodal").modal('show');
              
                
              
  
          }else{
            displaymassage("error", response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }


  function Delete_specialist(specialist_id){
  
    let sendingData ={
      "action": "Delete_specialist",
      "specialist_id": specialist_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/spacialist.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
            swal("Good job!", response, "success");
            loadDataspecialist();
  
              
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }


function displaymassage(type, message){
    let success =   document.querySelector(".alert-success");
    let error =   document.querySelector(".alert-danger");
    if(type== "success"){
      error.classList= "alert alert-danger d-none";
       success.classList= "alert alert-success";
       success.innerHTML= message;
  
       setTimeout(function(){
        $("#specialistmodal").modal("hide");
        success.classList= "alert alert-success d-none";
        $("#specialistform")[0].reset();
  
       },3000);
    }else{
      error.classList= "alert alert-danger";
      error.innerHTML= message;
    }
  }



  $("#specialistTable").on('click', "a.update_info", function(){
    let id= $(this).attr("update_id");
    get_specialist(id)
  })

  $("#specialistTable").on('click', "a.delete_info", function(){
    let id= $(this).attr("delete_id");
    if(confirm("Are you sure To Delete")){
        Delete_specialist(id)
  
    }
   
  })