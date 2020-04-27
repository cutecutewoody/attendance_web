var courseObject="";
var dataCourse = "";
var userId= sessionStorage.getItem("userId");
var userName= sessionStorage.getItem("userName");


function initiatePage(){

   var body2 = JSON.stringify({
      userName  :userName,
      userID    :userId,
      aksi      : 'loadCourse'
      });
      console.log(body2)

      $.post("https://woodyfyp.000webhostapp.com/server_api/proses-api.php",body2,
      function(data2) {
        console.log(data2)
        sessionStorage.setItem("coursedata",JSON.stringify(data2));
        courseObject= JSON.parse(sessionStorage.getItem("coursedata"));
        dataCourse = courseObject.result.datacourse;
        

        var htmlstring='';

        for (var i = 0; i< dataCourse.length; ++i) {  
         var cousedID = dataCourse[i].GorC_id;
         var courseName = dataCourse[i].GorC_name;
         var courseDes = dataCourse[i].GorC_description;
         //var chargerID = dataCourse[i].GorC_charger_id;
         var section_total = dataCourse[i].section_total;
         
          htmlstring += '<div class="card">';
          htmlstring += '<h5 class="card-header">Course ID: '+cousedID+'</h5>';
          htmlstring += '<div class="card-body">';
          htmlstring += '<h5 class="card-title">Course Name: '+courseName+'</h5>';
          htmlstring += '<p class="card-text">Course Description: '+courseDes+'</p>';
          htmlstring += '<p class="card-text">No. Section Within The Course: '+section_total+'</p>';
          htmlstring += '<a href="#" class="btn btn-info btn-sm" id="btn_view_session'+i+'" >Course Section</a> '; 
          htmlstring += '<a href="#" class="btn btn-outline-info btn-sm" id="btn_view_participant'+i+'" >Participant Detail</a> '; 
          htmlstring += '</div>';
          htmlstring += '</div>';
         
         }
         $("#card_course").append(htmlstring);
         $("#sayhi").html("Hey! "+userId+",<br>"+userName); 
         initialteOnclick();
        });         
}

 function initialteOnclick(){
  
   for(var i = 0; i< dataCourse.length; ++i){
      var sessionid = "#btn_view_session"+i+"";   
      var partId = "#btn_view_participant"+i+"";
      

      $(sessionid).attr("onclick","requestToGetSection("+i+")");   
      $(partId).attr("onclick","requestToGetParticipant("+i+")");
                           
   }
 }
function requestToUpdateSecTotal(indexOfBtn){

}
function requestToGetSection(indexOfBtn){
   var cousedID = dataCourse[indexOfBtn].GorC_id;
   var chargerID = dataCourse[indexOfBtn].GorC_charger_id;
   var sectionTotal = dataCourse[indexOfBtn].section_total;
   var body = JSON.stringify({
      courseId: cousedID,
      chargerId: chargerID,
      section_total: sectionTotal,
      aksi: 'getSections'
      });
      
   $.post("https://woodyfyp.000webhostapp.com/server_api/proses-api.php",body,
   function(data) {
      if(data.success){
         console.log("success")
         sessionStorage.setItem("sectiondata",JSON.stringify(data));
         window.location.replace("showSection.html");                        
       }else{
         alert(data.msg)
       }       
   });
}

function requestToGetParticipant(indexOfBtn){

   var cousedID = dataCourse[indexOfBtn].GorC_id;
   var chargerID = dataCourse[indexOfBtn].GorC_charger_id;
   var sectionTotal = dataCourse[indexOfBtn].section_total;
   var body = JSON.stringify({
      courseId: cousedID,
      chargerId: chargerID,
      aksi: 'getParticipant'
      });
     
   $.post("https://woodyfyp.000webhostapp.com/server_api/proses-api.php",body,
   function(data) {
      if(data.success){
       //console.log(data.result);
       sessionStorage.setItem("showParticipant",JSON.stringify(data));
       sessionStorage.setItem("sectionTotal",sectionTotal);
       //console.log(JSON.stringify(data));
       window.location.replace('showParticipant.html');
       
       }else{
        console.log(data.msg)
       }       
   });
}

