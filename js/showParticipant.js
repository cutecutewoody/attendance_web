var participantObj = JSON.parse(sessionStorage.getItem("showParticipant"));
var cousedID = participantObj.result[0].GorC_id;
var chargerID = participantObj.result[0].GorC_charger_id;

var sectionTotal = sessionStorage.getItem("sectionTotal");

function initiatePage(){

    
    $("#sayhi").html("You are in the course: "+cousedID + " <br> Course charger: " +chargerID+"."); 
    $('#btn_back').click(function(){
            window.location.replace("showCourse.html");
        })
    printOutParticipant(participantObj);

}


function printOutParticipant(data){  
   var htmlstring='';
   var participant_id='';
   var participant_attenNo= '';
   var percenStr ='';
   
       

   for (var i = 0; i< data.rowNum; ++i) {  
       participant_id = data.result[i].participant_id;
       participant_attenNo = data.result[i].atten_time;
      
       if(sectionTotal==0){
            percenStr = "No section yet"
        }else{
            percenStr = Math.round((participant_attenNo/sectionTotal)*100) + "%"
        }

       htmlstring += '<div class="card">';
       htmlstring += '<div class="card-body">';
       htmlstring += '<h8 class="card-title">Participant ID: '+participant_id+'';
       htmlstring += '<button type="button" id="btn_view_participant'+i+'" class="btn btn-info float-right">';
       htmlstring += 'Manage <span class="badge badge-warning"> '+percenStr+'</span>';
       htmlstring += '';
       htmlstring += '</button>';
       htmlstring += '</h8></div>';
       htmlstring += '</div>';           
      }
      $("#cardParticipant").append(htmlstring);
      initialteOnclick();
  
}
function initialteOnclick(){
  
    for(var i = 0; i< participantObj.rowNum; ++i){ 
       var partId = "#btn_view_participant"+i+"";   
       $(partId).attr("onclick","requestToManParticipant("+i+")");   
                            
    }
  }
function requestToManParticipant(indexOfBtn){

   var participant_id = participantObj.result[indexOfBtn].participant_id;
   
       sessionStorage.setItem("showParticipantDetail",participant_id);  
       window.location.replace('showParticipantDetail.html'); 
      
}