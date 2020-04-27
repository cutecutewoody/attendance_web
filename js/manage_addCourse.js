var courseId    = $('#course_id').val().toUpperCase();
var courseName  = $('#course_name').val();
var courseDesc  = $('#course_description').val();
var courseChargerId=$('#course_charger_id').val();
var errMsg= '';

function initiatePage(){
    $('#btn_back').click(
        function(){
            window.location.replace("manage.html")
        }
    )
    $('#btn_submit').click(          
        function(){
            courseId    = $('#course_id').val().toUpperCase();
            courseName  = $('#course_name').val();
            courseDesc  = $('#course_description').val();
            courseChargerId=$('#course_charger_id').val();
            errMsg= '';

            if(courseId=='' || courseId== null){
                errMsg+= "Please input course ID \n";
            }
            if(courseName=='' || courseName == null){
                errMsg+= "Please input course Name\n";
            }
            if(courseDesc=='' || courseDesc == null){
                errMsg+= "Please input course Description\n";
            }
            if(courseChargerId=='' || courseChargerId == null){
                errMsg+= "Please input course charger ID\n";
            }else if(!Number.isInteger(parseInt(courseChargerId))){
                errMsg+= "Course charger ID should be interger\n";
            }
            if(errMsg!=""){
                alert(errMsg);
            }else{
                submitForm();
            }
            
        }
    )



}

function submitForm(){

    var body = JSON.stringify({      
        aksi: 'addCourse',
        courseId:   courseId,
        courseName: courseName,
        courseDesc: courseDesc,
        courseChargerId:courseChargerId,
        });
        console.log(body);

     $.post("https://woodyfyp.000webhostapp.com/server_api/proses-api.php",body,
     function(data) {
        if(data.success){
          sessionStorage.setItem("addParticipant",JSON.stringify(data));
          window.location.replace('manage_addParticipant.html');
            
         }else{
           alert(data.msg)
         }       
     });
    
}

