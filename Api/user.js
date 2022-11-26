loadData();
btnAction = "Insert";

let fileimage= document.querySelector("#image");
let showInput= document.querySelector("#show");

const reader = new FileReader();

fileimage.addEventListener("change", (e)=> {
    const selectedFile= e.target.files[0];
    reader.readAsDataURL(selectedFile);
})

reader.onload= e=>{
    showInput.src= e.target.result;
}

$("#Addnew").on("click", function(){
    $("#usermodal").modal("show");
});

$("#userform").on("submit", function(event){
    
    event.preventDefault();


    // let amount= $("#amount").val();
    // let type= $("#type").val();
    // let description= $("#description").val();
    // let id= $("#update_id").val();

    let form_data= new FormData($("#userform")[0]);
    form_data.append("image", $("input[type=file]")[0].files[0]);
  

    if(btnAction == "Insert"){
      form_data.append("action", "register_user");
      loadData();
  

    }else{
      form_data.append("action", "update_user");
    
    }

  

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/user.php",
    data : form_data,
    processData : false,
    contentType : false,
    success: function(data){
        let status= data.status;
        let response= data.data;

        if(status){
          displaymessagee("success", response);
         btnAction="Insert";
         $("#userform")[0].reset();  
        loadData();
         

        }else{
          displaymessagee("error", response);
          console.log("response", response);
        }
        
    },
    error: function(data){

    }

  })

})

function displaymessagee(type, message){
  let success =   document.querySelector(".alert-success");
  let error =   document.querySelector(".alert-danger");
  if(type== "success"){
    error.classList= "alert alert-danger d-none";
     success.classList= "alert alert-success";
     success.innerHTML= message;

     setTimeout(function(){
      $("#usermodal").modal("hide");
      success.classList= "alert alert-success d-none";
      $("#userform")[0].reset();

     },3000);
  }else{
    error.classList= "alert alert-danger";
    error.innerHTML= message;
  }
}


function loadData(){
  $("#UserTable tr").html('');
 
  let sendingData ={
      "action": "get_user_list"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/user.php",
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
                 for(let i in res){
                  th+= `<th>${i}</th>`;
                 }

                 th+= "<th>Action</th></tr>";

                  tr += "<tr>";
                  for(let r in res){

                 if(r == "image"){
                 
                    tr += `<td><img style="width:50px; height:50px; border: 1px solid #e3ebe7;
                     border-radius:50%; object-fit:cover;" src="aploads/${res[r]}"></td>`;
               
                 }else{
                  tr += `<td>${res[r]}</td>`;
                 }

                  }

                  tr += `<td> <a class="btn btn-info update_info"  update_id=${res['id']}><i class="fas fa-edit" style="color: #fff"></i></a>&nbsp;&nbsp <a class="btn btn-danger delete_info" delete_id=${res['id']}><i class="fas fa-trash"style="color: #fff"></i></a> </td>`
                  tr+= "</tr>"
                
              })

              $("#UserTable thead").append(th);
              $("#UserTable tbody").append(tr);
          }

      },
      error: function(data){

      }

  })
}


function fetchuserinfo(id){
  
  let sendingData ={
    "action": "get_user_info",
    "id": id
}

$.ajax({
  method: "POST",
  dataType: "JSON",
  url: "Api/user.php",
  data : sendingData,

    success : function(data){
        let status= data.status;
        let response= data.data;
      

        if(status){

             btnAction= "update";

             $("#update_id").val(response['id']);
             $("#username").val(response['username']);
             $("#show").attr('src', `aploads/${response['image']}`);
             $("#usermodal").modal("show");
             
       
            
              
            

        }else{
          displaymessagee("error", response);
        }

    },
    error: function(data){

    }

})
}


function Delete_user_info(id){
  
  let sendingData ={
    "action": "Delete_user_info",
    "id": id
}

$.ajax({
  method: "POST",
  dataType: "JSON",
  url: "Api/user.php",
  data : sendingData,

    success : function(data){
        let status= data.status;
        let response= data.data;
      

        if(status){

          swal("Good job!", response, "success");
          loadData();

            
        }else{
          swal(response);
        }

    },
    error: function(data){

    }

})
}


$("#UserTable").on('click', "a.update_info", function(){
  let id= $(this).attr("update_id");
  fetchuserinfo(id)
})

$("#UserTable").on('click', "a.delete_info", function(){
  let id= $(this).attr("delete_id");
  if(confirm("Are you sure To Delete")){
    Delete_user_info(id)

  }
 
})