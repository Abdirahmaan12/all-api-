loadxray();

function loadxray(){
    $("#xrayTable tbody").html('');
    $("#xrayTable thead").html('');
   
    let sendingData ={
        "action": "read_all_info"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/x_ray.php",
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
      
                    tr += `<td> <a class="btn btn-info update_info"  update_id=${res['xray_id']}><i class="fas fa-edit" style="color: #fff"></i></a>&nbsp;&nbsp <a class="btn btn-danger delete_info" delete_id=${res['xray_id']}><i class="fas fa-trash"style="color: #fff"></i></a> </td>`
                    tr+= "</tr>"
                  
                })
      
                $("#xrayTable thead").append(th);
                $("#xrayTable tbody").append(tr);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }