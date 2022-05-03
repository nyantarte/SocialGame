function userProfile(_userName,_userPasswd){
    this.userName=_userName;
    this.userPasswd=_userPasswd;
 
}
function registUser(){
    var userName=document.userRegistForm.userName.value;
    var userPasswd=document.userRegistForm.userPasswd.value;
    
    var profile=new userProfile(userName,userPasswd);
    localStorage["userProfile"]=JSON.stringify(profile);
}
function moveGamePageIfUserProfileIsValid(){
    document.location.href="./index.html";

}
function initCanvas(){
    var canvas=document.getElementById("canvas");
    canvas.width=window.screen.availWidth;
    canvas.height=window.screen.availHeight;

}
function checkUserProfileExist(){
    var profile=localStorage.getItem("userProfile");
    return null!=profile;
}
function initGame(){
    initCanvas();
    if(!checkUserProfileExist()){
        document.location.href="./regist.html";
    }

}