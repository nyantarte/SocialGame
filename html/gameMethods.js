var curGameState=null;
const fontSize=30;
const MAIN_MENU_MODE=0;
const WAREHOUSE_MODE=MAIN_MENU_MODE+1;
const ORGANIZE_MODE=WAREHOUSE_MODE+1;
const MISSION_MODE=ORGANIZE_MODE+1;


const LIST_NOT_SELECTED=-1;
const LIST_BEGIN_PROG=-2;
const LIST_BEGIN_FBACK=-3;
function userProfile(_userName,_userPasswd){
    this.userName=_userName;
    this.userPasswd=_userPasswd;
    this.userLevel=1;

}
function gameState(){
    this.userProfile=JSON.parse(localStorage["userProfile"]);
    this.curMode=MAIN_MENU_MODE;
    this.mouseClickState=false;
    this.eventStateIdx=0;
    this.clickXPos=0;
    this.clickYPos=0;
    
  
}
function onClick(e){
    var rect=e.target.getBoundingClientRect();
    curGameState.clickXPos=e.clientX-rect.left;
    curGameState.clickYPos=e.clientY-rect.top;
    curGameState.mouseClickState=true;
    
   
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
    canvas.addEventListener("click",onClick,true);

}
function checkUserProfileExist(){
    var profile=localStorage.getItem("userProfile");
    return null!=profile;
}

function initGame(){
    initCanvas();
    if(!checkUserProfileExist()){
        document.location.href="./regist.html";
    }else{
        curGameState=new gameState();
        setTimeout(updateGameState,1000/15);
    }

}
function drawButton(context,caption,x,y){
    var btnW=caption.length*fontSize;
    
    context.fillText(caption,x,y,btnW);
    context.beginPath();
    context.rect(x,y,btnW,fontSize);
    context.stroke();
   
    if(x < curGameState.clickXPos && (x+btnW)>curGameState.clickXPos &&
       y < curGameState.clickYPos && (y+fontSize)>curGameState.clickYPos){
           return curGameState.mouseClickState;
       }
    return false;

}
function drawList(context,items,begin,x,y,w,h){
    if(begin >=items.length){
        return LIST_NOT_SELECTED;

    }
    if(drawButton(context,"-",(x+w)-fontSize,y)){
        return LIST_BEGIN_FBACK;
    }
    if(drawButton(context,"+",(x+w)-fontSize,(y+h)-fontSize)){
        return LIST_BEGIN_PROG;
    }
    var num=h/fontSize;
    for(var i=0;i < num;++i){
        var yPos=y+fontSize*i;
        if(drawButton(context,items[begin+i].toString(),x,yPos)){
            return i;
        }

    }
    return LIST_NOT_SELECTED;

}
function updateGameState(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');
    context.fillStyle ="white";
    context.fillStyle = "rgb(255,255, 255)";
    context.strokeStyle = "rgb(255,255, 255)";
    context.font = fontSize+"px 'ＭＳ ゴシック'";
    
    context.textAlign = "left";
    context.textBaseline = "top";
    context.clearRect(0,0,canvas.width,canvas.height);
        if(MAIN_MENU_MODE==curGameState.curMode){
            context.fillText(curGameState.userProfile.userName,0,0);
            var tmpTxt="Warehouse";
            var xPos=0;
            if(drawButton(context,tmpTxt,xPos,canvas.height-fontSize)){
                curGameState.curMode=WAREHOUSE_MODE;
            }
            xPos=tmpTxt.length*fontSize;
            tmpTxt="Organize";
            if(drawButton(context,tmpTxt,xPos,canvas.height-fontSize)){
                curGameState.curMode=ORGANIZE_MODE;
            }
            tmpTxt="Mission";
            xPos=canvas.width-tmpTxt.length*fontSize;
            if(drawButton(context,tmpTxt,xPos,canvas.height-fontSize)){
                curGameState.curMode=MISSION_MODE;
            }
        }
    curGameState.eventStateIdx=(curGameState.eventStateIdx+1)%2;
 
    curGameState.mouseClickState=false;
    setTimeout(updateGameState,1000/15);
}