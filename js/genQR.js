var sectionObject   = JSON.parse(sessionStorage.getItem("StartSection"));
var JsonString      = sessionStorage.getItem("StartSection");
var sectionID       = sectionObject.sectionId;
var sectionName     = sectionObject.sectionName;
var courseID        = sectionObject.GorC_id;
var courseCharger   = sectionObject.GorC_charger_id;
var timestamp="";
var countDown=10;
var showCountDown;
var refreshQr;
var size = "1000x1000";
var baseURL = "http://api.qrserver.com/v1/create-qr-code/";
var generateBtn = $("#generateqr_btn");


console.log(sectionObject);

function initiatePage(){
        refreshQrCode();
        refreshTimeStamp();
        $("#btn_back").click(function(){
            window.location.replace("showSection.html");
        });

        $("#btn_stop").click(function(){           
                clearInterval(refreshQr);
                clearInterval(showCountDown);
        });
}

var refreshTimeStamp = function() {
    refreshQr=setInterval(refreshQrCode, 10000);//10 seconds
}

var refreshQrCode = function(){

    var body = JSON.stringify({
        aksi: 'refreshclock'
        });
    $.post("https://woodyfyp.000webhostapp.com/server_api/clock.php",body,
      function(data) {

        

        timestamp = data.nowtime;
        let urldata = courseID+";"+sectionID+";"+timestamp+";"+courseCharger;
        console.log("timestamp: "+timestamp);       
        let url = `${baseURL}?data=${urldata}&size=${size}`;
        
        console.log(url);
    
        //var decrypt=(CryptoJS.AES.decrypt(encrypt,"/")).toString(CryptoJS.enc.Utf8);
        
        clearInterval(showCountDown);
        countDown=10
        showCountDown = setInterval(function(){
            countDown--;
            $("#countdown").html(countDown);
        },1000);

        $("#myTextBox").val("");
        $("#myimg").attr("src",url);
        
      });
}


    

    
