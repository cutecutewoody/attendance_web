

var courseObject = JSON.parse(sessionStorage.getItem("addParticipant"));
var courseId  = courseObject.result.courseId;
var courseChargerId= courseObject.result.chargerId;

function initiatePage(){
  
    $("#sayhi").html("You are modifing the course: "+courseId + " <br> Course charger: " +courseChargerId+"."); 
    $('#btn_back_to_main').click(function(){
        window.location.replace('manage.html');
    });
    $('#btn_submit_participant').click(function(){
       var textareaInput= $('#textarea_participant').val().split(";");
            textareaInput= deleteNullInput(textareaInput);
            console.log(textareaInput);
        if(textareaInput== null || textareaInput==''){
            alert("please input proper value");
        }else if(!isNum(textareaInput)){
            alert("please input number value only");
        }else{
            

            var body = JSON.stringify({
                participantArray:JSON.stringify(textareaInput),
                courseId:courseId,
                courseChargerId:courseChargerId,
                aksi: 'addParticipant'
                });

                console.log(body)
        
        
             $.post("https://woodyfyp.000webhostapp.com/server_api/proses-api.php",body,
             function(data) {
                if(data.success){
                    sessionStorage.setItem("showParticipant",JSON.stringify(courseObject));
                    window.location.replace("manage_showParticipant.html")   
                  }else{
                    alert(data.msg)
                  }   
             }); 
        }   
    });
}

function deleteNullInput(textareaInput){
    var filter = textareaInput.filter(function (el) {
        if(el!=null || el!="") return el;
      });
      return filter;
};
function isNum(textareaInput){
        for(var i=0; i<textareaInput.length;i++){
            if(!Number.isInteger(parseInt(textareaInput[i]))){
                return false
            }
        }       
 return true;
}