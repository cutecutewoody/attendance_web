var participantObjDetail='';
var participantObj = JSON.parse(sessionStorage.getItem("showParticipant"));
var cousedID = participantObj.result[0].GorC_id;
var chargerID = participantObj.result[0].GorC_charger_id;
var userId = sessionStorage.getItem("showParticipantDetail");

console.log(participantObj);


function initiatePage(){

    let body =JSON.stringify({
        aksi      :'viewPercentD',
        user_id   :userId, 
        course_id :cousedID,
        charger_id:chargerID
      });
    console.log(body)
      $.post("https://woodyfyp.000webhostapp.com/server_api/receiver-api.php",body,
        function(data) {
                console.log(data) 
                participantObjDetail=data.data;  
                console.log(data) 
                printOutRecord(participantObjDetail);
   });
    
    $("#sayhi").html("You are in the course: "+cousedID + " <br> Course charger: " +chargerID+". <br> Managing: "+userId); 
    $('#btn_back').click(function(){
        var body = JSON.stringify({
           courseId: cousedID,
           chargerId: chargerID,
           aksi: 'getParticipant'
           });
          
        $.post("https://woodyfyp.000webhostapp.com/server_api/proses-api.php",body,
        function(data) {
           if(data.success){
            sessionStorage.setItem("showParticipant",JSON.stringify(data));
            window.location.replace('showParticipant.html');
            
            }else{
             console.log(data.msg)
            }       
        });
    })
    
}

function printOutRecord(obj){
    var htmlstring='';
    console.log(obj)
    for (var i = 0; i< obj.length; ++i) {  
        console.log(obj[i].take_index)
        if(obj[i].take_index == 1){
            htmlstring += '<li class="list-group-item list-group-item-info">'+obj[i].section_name+'';
            htmlstring +='<img id="btn_take'+i+'" src="../icon/green_circle.png" class="float-right" style="width: 20px; height: 20px;">'
            htmlstring +='</li>'
     
        }else{
            htmlstring += '<li class="list-group-item list-group-item-info">'+obj[i].section_name+'';
            htmlstring +='<img id="btn_take'+i+'" src="../icon/red_circle.png" class="float-right" style="width: 20px; height: 20px;">'
            htmlstring +='</li>'
        }            
    }
        $("#percentageList").append(htmlstring);
        initialteOnclick();

}

function initialteOnclick(){
  
    for(var i = 0; i< participantObjDetail.length; ++i){ 
       var btnId = "#btn_take"+i+"";   
       if(participantObjDetail[i].take_index == 1){
        $(btnId).attr("onclick","untakeAtten("+i+")");   
       }else{
        $(btnId).attr("onclick","takeAtten("+i+")");   
       }
                            
    }
  }
  
function untakeAtten(index){
    if(confirm("Are you sure to un-take attendance?")){
        var sectionId = participantObjDetail[index].section_id;
        let body =JSON.stringify({
            aksi            : 'untakeAttendance',
            courseId        : cousedID,
            sectionId       : sectionId,
            courseCharger   : chargerID,
            userId          : userId
          })
    
          console.log(body);
          $.post("https://woodyfyp.000webhostapp.com/server_api/receiver-api.php",body,
          function(data) {
                  console.log(data);
                  location.reload();
     });
    }  
}
function takeAtten(index){
    if(confirm("Are you sure to take attenadnce?")){
    var sectionId = participantObjDetail[index].section_id;
    let body =JSON.stringify({
        aksi            : 'takeAttendance',
        courseId        : cousedID,
        sectionId       : sectionId,
        courseCharger   : chargerID,
        userId          : userId
      })

      console.log(body);
      $.post("https://woodyfyp.000webhostapp.com/server_api/receiver-api.php",body,
      function(data) {
              console.log(data);
              location.reload();
 });}
}