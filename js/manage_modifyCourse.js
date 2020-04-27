
var dataCourse = JSON.parse(sessionStorage.getItem("coursedata_modify"));
var courseId = dataCourse.GorC_id;
var courseName = dataCourse.GorC_name;
var courseCharger = dataCourse.GorC_charger_id;
var courseDesc = dataCourse.GorC_description;
var id = dataCourse.id;
var errMsg= '';

function initiatePage(){

        $('#course_id').val(courseId);
        $('#course_name').val(courseName);
        $('#course_description').val(courseDesc);
        $('#course_charger_id').val(courseCharger);

        $("#btn_back").click(function(){
            window.location.replace("manage_showCourse.html");
        });

        $("#btn_submit").click(function(){   
        
            courseId    = $('#course_id').val().toUpperCase();
            courseName  = $('#course_name').val();
            courseDesc  = $('#course_description').val();
            courseChargerId=$('#course_charger_id').val();
            

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

        })

}

function submitForm(){

    var body = JSON.stringify({      
        aksi: 'modifyCourse',
        courseId:   courseId,
        courseName: courseName,
        courseDesc: courseDesc,
        courseChargerId:courseChargerId,
        });
        console.log(body);

     $.post("https://woodyfyp.000webhostapp.com/server_api/proses-api.php",body,
     function(data) {
         console.log(data)
        if(data.success){
            $('#btn_back').hide();
            var htmlstring='';
            htmlstring += '<div class="card">';
            htmlstring += '<h5 class="card-header text-success">Successfully Updated '+data.result.courseId+' </h5>';
            htmlstring += '<div class="card-body">';
            htmlstring += '<h5 class="card-title">Course Name: '+data.result.courseName+'</h5>';
            htmlstring += '<p class="card-text">Course Description: '+data.result.courseDesc+'</p>';
            htmlstring += '<p class="card-text">Course Charger: '+data.result.courseChargerId+'</p>';
            htmlstring += '<a href="manage.html" class="btn btn-success" id="btn_backToMain" >Back To Main Page</a> '; 
            htmlstring += '</div>';
            htmlstring += '</div>';
            
            $(".container").html(htmlstring);
            
         }else{
           alert(data.msg)
         }       
     });
    
}