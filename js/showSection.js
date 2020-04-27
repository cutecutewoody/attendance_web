var sectionObject= JSON.parse(sessionStorage.getItem("sectiondata"));
var GorC_charger_id='';
var GorC_id='';


function initiatePage(){

    if(sectionObject.rowNum <= 0 ){ 
         GorC_charger_id=sectionObject.result.GorC_charger_id;
         GorC_id=sectionObject.result.GorC_id;
      $("#warning").text("You don't have any section yet");

    }else{
       
         GorC_charger_id=sectionObject.result[0].GorC_charger_id;
         GorC_id=sectionObject.result[0].GorC_id;  
         

         var htmlstring="";  
         
         for (var i = 0; i< sectionObject.rowNum; ++i) { 
            var sectionId = sectionObject.result[i].section_id;
            var sectionName = sectionObject.result[i].section;
            var createAt = sectionObject.result[i].create_at;      

                htmlstring += '<div class="card">';
                htmlstring += '<h8 class="card-header">Create At: '+createAt+'</h8>';
                htmlstring += '<div class="card-body">';
                htmlstring += '<h5 class="card-title">Section Name: '+sectionName+'';
                htmlstring += '<a href="#" class="btn btn-success float-right" style="border-radius: 50%;" id="btn_start'+i+'" >Start</a> </h5> ';
                htmlstring += '<a href="#" class="btn btn-info btn-sm" id="btn_modifySection'+i+'" >Modify Section</a> ';
                
                htmlstring += '</div>';
                htmlstring += '</div>';
          }
        $("#card_section").append(htmlstring);   
        $("#warning").hide();   
    }

  $("#sayhi").html("Hey! "+GorC_charger_id+",<br> You are in the course: "+GorC_id); 
  $("#add_section_input").hide();
  $("#btn_addSection").click(popUpAddSectionForm);
  $("#btn_addSection_submit").click(submitAddSection);
  $("#btn_addSection_cancel").click(hiddenAddSection)
  $("#Back_btn").click(goback);
   
  
}

function initialteOnclick(){
  
    for(var i = 0; i< sectionObject.rowNum; ++i){
       var id = "#btn_modifySection"+i+"";   
       var startId = "#btn_start"+i+"";
       $(id).attr("onclick","modifysection("+i+")");       
       $(startId).attr("onclick","startAttendance("+i+")");                      
    }
  }

function startAttendance(indexOfBtn){
    console.log(indexOfBtn);

    var sectionId = sectionObject.result[indexOfBtn].section_id;
    var sectionName = sectionObject.result[indexOfBtn].section;
    var createAt = sectionObject.result[indexOfBtn].create_at;  
       
    var passdata={
          sectionId:sectionId,
          sectionName:sectionName,
          createAt:createAt,
          GorC_id:GorC_id,
          GorC_charger_id,GorC_charger_id
        }

    sessionStorage.setItem("StartSection",JSON.stringify(passdata));
    window.location.replace("genQR.html")
}

function modifysection(indexOfBtn){
  console.log(indexOfBtn)
  var sectionId = sectionObject.result[indexOfBtn].section_id;
  var sectionName = sectionObject.result[indexOfBtn].section;
  var createAt = sectionObject.result[indexOfBtn].create_at;  
      var passdata={

        sectionId:sectionId,
        sectionName:sectionName,
        createAt:createAt,
        GorC_id:GorC_id,
        GorC_charger_id,GorC_charger_id
      }


  sessionStorage.setItem("modify_sectiondata",JSON.stringify(passdata));
  window.location.replace("modifySection.html")
}


function requestToGetSectionDetail(indexOfSection){

    // var cousedID = dataCourse[indexOfBtn].GorC_id;
    // var chargerID = dataCourse[indexOfBtn].GorC_charger_id;
 
    // var body = JSON.stringify({
    //    courseId: cousedID,
    //    chargerId: chargerID,
    //    aksi: 'getSectionsDetail'
    //    });
       
    // $.post("https://woodyfyp.000webhostapp.com/server_api/proses-api.php",body,
    // function(data) {
    //    if(data.success){
    //       console.log("success")
    //       sessionStorage.setItem("sectiondata",JSON.stringify(data));
    //       window.location.replace("showSection.html");                        
    //     }else{
    //       alert(data.msg)
    //     }       
    // });

}  
var goback = function(){
window.location.replace("showCourse.html")
}

var popUpAddSectionForm = function (){
    $("#add_section_input").show();
}
var hiddenAddSection=function (){
    $("#add_section_input").hide(); 
}

var submitAddSection = function(){
    
    var sectionName = $('#sectionName').val();

    if(sectionName=="" || sectionName==null){
     alert("please enter the section Name")
        return;   
    }

    var body = JSON.stringify({
        courseId  : GorC_id,
        chargerId : GorC_charger_id,
        secctionName  :sectionName,
        sectionTotal  :sectionObject.rowNum+1,
        aksi: 'addSection'
        });
        console.log(body);
    $.post("https://woodyfyp.000webhostapp.com/server_api/proses-api.php",body,
    function(data) {
       if(data.success){
          console.log(data)  

          $("#warning").text("Dear "+data.result.chargerId+", You have Successfully Add Section: "+data.result.secctionName+" In Course: "+data.result.courseId+" ");             
          $("#add_section_input").hide();
          postRequestToGetSection();
          postRequestToUpdateCourse();
        }else{
        console.log("fails")
        $("#warning").text("Sorry"+ data.msg);
        }       
    });
}

function postRequestToGetSection(){
   
    var body = JSON.stringify({
       courseId: GorC_id,
       chargerId: GorC_charger_id,
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

 function postRequestToUpdateCourse(){
      var body = JSON.stringify({
        chargerId: GorC_charger_id,
        aksi: 'getCourseByChargerID'
        });
        
    $.post("https://woodyfyp.000webhostapp.com/server_api/proses-api.php",body,
    function(data) {
        console.log(data.result)
      
        sessionStorage.setItem("coursedata",JSON.stringify(data));
    });

 }