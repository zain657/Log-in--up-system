var form=document.getElementById('form');
var email1=document.getElementById('email1');
var pass12=document.getElementById('pass12');
var eror=document.getElementById('eror');

var vpassexisit=false;

var allUser1=[];

function passForEmail(pass,email){
    allUser1=JSON.parse(localStorage.getItem('userData'));
    for(let i=0;i<allUser1.length;i++){
        if(allUser1[i].email==email){
            if(allUser1[i].pass==pass){
                vpassexisit=true;
                allUser1[i].done=true;
                localStorage.setItem('userData', JSON.stringify(allUser1));
            }
        }
    }
}

function GoToTheMainPage(){
    window.location.replace("main.html");
}

function clear(){
    pass12.value='';
    email1.value='';
}

form.addEventListener('submit',function(e){
    e.preventDefault();
    passForEmail(pass12.value,email1.value);
    if(vpassexisit){
        eror.classList.replace('text-danger','text-success');
        eror.innerText='sucsecs';
        GoToTheMainPage();
        vpassexisit=false;
        clear();
    }
    else{
        eror.classList.replace('text-success','text-danger');
        eror.innerText='Invalid email or password.';
    }
})