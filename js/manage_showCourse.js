var courseObject= JSON.parse(sessionStorage.getItem("coursedata"));
var dataCourse = courseObject.result;


function initiatePage(){
   console.log(courseObject);
   console.log(dataCourse);
   var htmlstring='';

   for (var i = 0; i< dataCourse.length; ++i) {  
      var cousedID = dataCourse[i].GorC_id;
      var courseName = dataCourse[i].GorC_name;
      var courseDes = dataCourse[i].GorC_description;
      var chargerID = dataCourse[i].GorC_charger_id;
      
       htmlstring += '<div class="card">';
       htmlstring += '<h5 class="card-header">Course ID: '+cousedID+'</h5>';
       htmlstring += '<div class="card-body">';
       htmlstring += '<h5 class="card-title">Course Name: '+courseName+'</h5>';
       htmlstring += '<p class="card-text">Course Description: '+courseDes+'</p>';
       htmlstring += '<p class="card-text">Course Charger: '+chargerID+'</p>';
       htmlstring += '<a href="#" class="btn btn-info" id="btn_modify_detail'+i+'" >Modify Detail</a> '; 
       htmlstring += '<a href="#" class="btn btn-info" id="btn_modify_participant'+i+'" >Participant</a> ';
       htmlstring += '</div>';
       htmlstring += '</div>';
      

       
      }
      $("#card_course").append(htmlstring);
      $('#btn_back_to_main').click(function(){

         window.location.replace("manage.html");
      })
}

function initialteOnclick(){
  
   for(var i = 0; i< dataCourse.length; ++i){
      var detail_id = "#btn_modify_detail"+i+"";   
      var Participant_id = "#btn_modify_participant"+i+"";

      $(detail_id).attr("onclick","requestToModifyDetail("+i+")"); 
      $(Participant_id).attr("onclick","requestToShowParticipant("+i+")"); 
   }
 }

 function requestToModifyDetail(index){
   sessionStorage.setItem("coursedata_modify",JSON.stringify(dataCourse[index]));  
   window.location.replace("manage_modifyCourse.html");
 }

 function requestToShowParticipant(index){
  
   var cousedID = dataCourse[index].GorC_id;
   var chargerID = dataCourse[index].GorC_charger_id;
 

   var passdata = {
      result:{
         courseId: cousedID,
         chargerId: chargerID,  
      }                  
   }
   console.log(passdata);
   sessionStorage.setItem("showParticipant",JSON.stringify(passdata));
   window.location.replace('manage_showParticipant.html');
}