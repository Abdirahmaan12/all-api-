fillpatient();
fillaccoun();
fill_p_method();
loadpayment();
function fillpatient(){
 
    let sendingData ={
        "action": "read_patient"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/payment.php",
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
  
                $("#patient_id").append(html);
  
               
            }else{
              displaymessage("error", response);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }

  function fillaccoun(){
 
    let sendingData ={
        "action": "read_account"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/Account.php",
      data : sendingData,
  
        success : function(data){
            let status= data.status;
            let response= data.data;
            let html='';
            let tr= '';
  
            if(status){
                response.forEach(res=>{
                  html+= `<option value="${res['accoun_id']}">${res['bank_name']}</option>`;
                   
                })
  
                $("#accoun_id").append(html);
  
               
            }else{
              displaymessage("error", response);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }

  function fill_p_method(){
 
    let sendingData ={
        "action": "read_all_p_method"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/pe_method.php",
      data : sendingData,
  
        success : function(data){
            let status= data.status;
            let response= data.data;
            let html='';
            let tr= '';
  
            if(status){
                response.forEach(res=>{
                  html+= `<option value="${res['p_method_id']}">${res['name']}</option>`;
                   
                })
  
                $("#p_method_id").append(html);
  
               
            }else{
              displaymessage("error", response);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }

  btnAction = "Insert";

  $("#paymentform").on("submit", function(event){
    
    event.preventDefault();
  
  
    let patient_id= $("#patient_id").val();
    let amount= $("#amount").val();
    let accoun_id= $("#accoun_id").val();
    let p_method_id= $("#p_method_id").val();
    let date= $("#date").val();
    let id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {
        "patient_id": patient_id,
        "amount": amount,
        "accoun_id": accoun_id,
        "p_method_id": p_method_id,
        "date": date,
        "action": "register_payment"
    }
  
    }else{
      sendingData = {
          "payment_id": id,
          "patient_id": patient_id,
          "amount": amount,
          "accoun_id": accoun_id,
          "p_method_id": p_method_id,
          "date": date,
          "action": "update_payment"
   }
   }
  
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/payment.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         displaymssage("success", response);
         btnAction="Insert";
         $("#paymentform")[0].reset();
      //    $("#specialistmodal").modal("hide");
         loadpayment();
  
       
        
         
  
        }else{
          displaymssage("error", response);
        }
        
    },
    error: function(data){
        displaymessage("error", data.responseText);
  
    }
  
  })
  
  })

  function get_payment_info(payment_id){
  
    let sendingData ={
      "action": "get_payment_info",
      "payment_id": payment_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/payment.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
               btnAction= "update";
               
                $("#update_id").val(response['payment_id']);
                $("#patient_id").val(response['patient_id']);
                $("#amount").val(response['amount']);
                $("#accoun_id").val(response['accoun_id']);
                $("#p_method_id").val(response['p_method_id']);
                $("#date").val(response['date']);
                $("#payment_modal").modal('show');
                loadpayment();
              
                
              
  
          }else{
            displaymssage("error", response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }
  



  function loadpayment(){
    $("#paymentTable tbody").html('');
    $("#paymentTable thead").html('');
   
    let sendingData ={
        "action": "read_all_payment"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/payment.php",
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
                if(res[r] == "paid"){
                  tr += `<td><span class="badge badge-success">${res[r]}</span></td>`;
                }else{
                  tr += `<td><span class="badge badge-danger">${res[r]}</span></td>`;
                }
               }else{
                tr += `<td>${res[r]}</td>`;
               }

                }
                th += "<td>Action</td></tr>";

                tr += `<td> <a class="btn btn-info update_info"  update_id=${res['ID']}><i class="fas fa-edit" style="color: #fff"></i></a>&nbsp;&nbsp <a class="btn btn-danger delete_info" delete_id=${res['ID']}><i class="fas fa-trash"style="color: #fff"></i></a> </td>`
                tr+= "</tr>"
              
            })

            $("#paymentTable thead").append(th);
            $("#paymentTable tbody").append(tr);
        }

            
  
        },
        error: function(data){
  
        }
  
    })
  }


  function Delete_payment(payment_id){
  
    let sendingData ={
      "action": "Delete_payment",
      "payment_id": payment_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/payment.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
            swal("Good job!", response, "success");
            loadpayment();
  
              
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }



function displaymssage(type, message){
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


  $("#paymentTable").on('click', "a.update_info", function(){
    let id= $(this).attr("update_id");
    get_payment_info(id)
  })

  $("#paymentTable").on('click', "a.delete_info", function(){
    let id= $(this).attr("delete_id");
    if(confirm("Are you sure To Delete")){
      Delete_payment(id)
  
    }
   
  })
