var fname=document.getElementById('fname');
var lname=document.getElementById('lname');
var email=document.getElementById('email');
var pass1=document.getElementById('pass1');
var pass2=document.getElementById('pass2');
var btn=document.getElementById('btn');
var form=document.getElementById('form');
var eror=document.getElementById('eror');


var vEmail=false;
var vEmail1=false;
var vName=false;
var vPass=false;
var emailIndex=0;


if(localStorage.getItem('userData')!==null){
    var allUser=JSON.parse(localStorage.getItem('userData'));
}
else{
    var allUser=[];
}

function validateName(firstName, lastName) {
    const namePattern = /^[a-zA-Z\s-]+$/;
    if (!firstName || !lastName) {
        eror.innerText+= `First name and last name are required. &`;
        vName=false;
    }
    else if (!namePattern.test(firstName) || !namePattern.test(lastName)) {
        eror.innerText+= `Invalid first name or last name. &`;
        vName=false;
    }
    else{
        vName=true;
    }
}

function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
        eror.innerText+= `Emai is required. &`;
        vEmail=false;
    }
    else if (!emailPattern.test(email)) {
        eror.innerText+= `Invalid email. &`;
        vEmail=false;
    }
    else{
        vEmail=true;
    }
}

function emailVer(email){
    if(allUser.length!==0){
        for(let i=0;i<allUser.length;i++){
            if(email==allUser[i].email){
                vEmail1=false;
                emailIndex=i;
                eror.innerText+= `Invalid email. &`;
                break;
            }
            else{
                vEmail1=true;
            }
        }
    }
    else{
        vEmail1=true;
    }
}

function validatePass(pass1,pass2) {
    const passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; 
    if (!pass1 || !pass2) {
        eror.innerText+= `Password and password confirmation are required. &`;
        vPass=false;
    }
    else if (!passPattern.test(pass1) || !passPattern.test(pass2)) {
        eror.innerText+= `Invalid password. &`;
        vPass=false;
    }
    else if (pass1!==pass2){
        eror.innerText+='password does not match. &'
    }
    else{
        vPass=true;
    }
}

function clear(){
    fname.value='';
    lname.value='';
    pass1.value='';
    pass2.value='';
    email.value='';
    eror.innerText='';
}



function addUser(){
    var userObj={
        fname:fname.value,
        lname:lname.value,
        email:email.value,
        pass:pass1.value
    }
    allUser.push(userObj);
    var datastr=JSON.stringify(allUser)
    localStorage.setItem('userData',datastr);
    console.log(allUser);
    clear();
}


form.addEventListener('submit',function(e){
    e.preventDefault();
    validateName(fname.value,lname.value);
    validateEmail(email.value);
    validatePass(pass1.value,pass2.value);
    emailVer(email.value);
    if(vEmail&&vName&&vPass&&vEmail1){
        addUser();
        eror.classList.replace('text-danger','text-success');
        eror.innerText='success';
    }
})