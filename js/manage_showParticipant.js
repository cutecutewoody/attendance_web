var courseObj = JSON.parse(sessionStorage.getItem("showParticipant"));
var cousedID = courseObj.result.courseId
var chargerID = courseObj.result.chargerId



function initiatePage(){

    $("#sayhi").html("You are modifing the course: "+cousedID + " <br> Course charger: " +chargerID+"."); 
    $('#btn_back_to_main').click(function(){
        window.location.replace("manage.html");
    })
    var body = JSON.stringify({
       courseId: cousedID,
       chargerId: chargerID,
       aksi: 'getParticipant'
       });
      
    $.post("https://woodyfyp.000webhostapp.com/server_api/proses-api.php",body,
    function(data) {
       if(data.success){
        printOutParticipant(data); 

        $('#btn_addParticipant').click(function(){
            sessionStorage.setItem("addParticipant",JSON.stringify(courseObj));
            window.location.replace('manage_addParticipant.html');
        }) 
        }else{
          alert("Please add new participant")
          sessionStorage.setItem("addParticipant",JSON.stringify(courseObj));
          window.location.replace('manage_addParticipant.html');
        }       
    });
    


}

function printOutParticipant(data){

    
    var htmlstring='';

    for (var i = 0; i< data.rowNum; ++i) {  
       var participant_id = data.result[i].participant_id;

        htmlstring += '<div class="card">';
        htmlstring += '<div class="card-body">';
        htmlstring += '<h8 class="card-title">Participant ID: '+participant_id+'';
        htmlstring += '<a href="#" class="btn btn-info btn-sm float-right" id="btn_modify_detail'+i+'" >Delete</a> '; 
        htmlstring += '</h8></div>';
        htmlstring += '</div>';           
       }
       $("#cardParticipant").append(htmlstring);
     
   
}