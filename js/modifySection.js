var sectionObject= JSON.parse(sessionStorage.getItem("modify_sectiondata"));
var GorC_charger_id=sectionObject.GorC_charger_id;
var GorC_id=sectionObject.GorC_id;
var sectionId=sectionObject.sectionId;
var sectionName=sectionObject.sectionName;
var createAt=sectionObject.createAt;



function initiatePage(){
    console.log(GorC_charger_id);
    console.log(GorC_id);
    console.log(sectionId);
    console.log(sectionName);
    console.log(createAt);

    $("#sayhi").html("Hey! "+GorC_charger_id+",<br> You are modifying "+sectionName+" in course: "+GorC_id); 
    $('#btn_back').click(function(){
        window.location.replace("showSection.html");
    })
}