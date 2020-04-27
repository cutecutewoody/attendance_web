
  function btn_login_Clicked() {
    
    var username = $("#username").val();
    var password = $("#userpassword").val();
    
    //Checking for blank fields.
    if( username ==''){
      $('#username').css("border","2px solid red");
      $('#username').css("box-shadow","0 0 3px red");
      alert("Please fill username");      
    }else if(password ==''){
      $('#userpassword').css("border","2px solid red");
      $('#userpassword').css("box-shadow","0 0 3px red");
      alert("Please password");
    }else{
    
      var body = JSON.stringify({
      username: username,
      password: password,
      aksi: 'login'
      });
     
      $.post("https://woodyfyp.000webhostapp.com/server_api/proses-api.php",body,
      function(data) {
        
        if(data.success){
        sessionStorage.setItem("userName",username);
        sessionStorage.setItem("userId",data.result.user_id);
          window.location.replace("./view/showCourse.html");    
        }else{
          alert(data.msg)
        }
     
      });
    }

};