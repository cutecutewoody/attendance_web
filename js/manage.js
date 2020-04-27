
function initiatePage(){


    $('#btn_search_course_id').click(function(){
        
      var courseId = $('#search_course_id').val();

     if(courseId =="" || courseId ==null){
       alert("Please enter course ID");
     }else{
        var body = JSON.stringify({
            courseId: courseId,
            aksi: 'getCourseByCourseID'
            });
           console.log(body)
            $.post("https://woodyfyp.000webhostapp.com/server_api/proses-api.php",body,
            function(data) {
               if(data.success){
                  sessionStorage.setItem("coursedata",JSON.stringify(data));   
                  console.log(data)
                  window.location.replace("manage_showCourse.html");                           
                }else{
                  alert(data.msg)
                }       
            });
     }
        
    });


    $('#btn_addCourse').click(function(){
        
      window.location.replace('manage_addCourse.html')
        
    });
    $('#btn_showAllCourse').click(function(){
        
      var body = JSON.stringify({
        aksi: 'manageCourse'
        });
       
        $.post("https://woodyfyp.000webhostapp.com/server_api/proses-api.php",body,
        function(data) {
           if(data.success){
              sessionStorage.setItem("coursedata",JSON.stringify(data));   
              window.location.replace("manage_showCourse.html");                           
            }else{
              alert(data.msg)
            }       
        });
        
    });

}