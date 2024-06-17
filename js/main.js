var btnSearch = document.getElementById('btnSearch');
var search1 = document.getElementById('search');
var row = document.getElementById('row');
var modalTitle1 = document.getElementById('modal-title1');
var modal = document.getElementById('modal');
var modalimg = document.getElementById('modal-img');
var urlInfo = document.getElementById('urlInfo');
var logOut = document.getElementById('logOut');
var navLink = document.querySelectorAll('.nav-link');
var close1 = document.querySelectorAll('.close');
var allData=[];
var Xval;


logOut.addEventListener('click',function(){
    window.location.replace("index.html");
})

function retreive(arr) {
    var str = ``;
    for (let i = 0; i < arr.length; i++) {
        str += `
        <div class="col-lg-3 col-md-6 d-flex justify-content-center align-items-center text-center">
            <div class="card shadowA1" style="width: 18rem;">
                <img src="${arr[i].image_url}" class="card-img-top" alt="...">
                <div class="card-body d-flex justify-content-center flex-column">
                    <h5 class="card-title">${arr[i].title}</h5>
                    <p class="card-text">${arr[i].recipe_id}</p>
                    <a btn='${arr[i].recipe_id}' href="#" class="btn btn-outline-success fw-bold">More</a>
                </div>
            </div>
        </div>
        `
    }
    row.innerHTML=str;
}

function search(arr){
    var result=[];
    for(let i=0;i<arr.length;i++){
        if(arr[i].title.toLowerCase().includes(search1.value.toLowerCase())|| arr[i].recipe_id.includes(search1.value)){
            result.push(arr[i]);
        }
    }
    retreive(result)
}

btnSearch.addEventListener('click',function(e){
    e.preventDefault();
    search(allData);
})

var objindex;
row.addEventListener('click',function(e){
    objindex=0;
    if(e.target.hasAttribute('btn')){
        var objid=e.target.getAttribute('btn');
        for(let i=0;i<allData.length;i++){
            if(allData[i].recipe_id==objid){
                objindex=i;
                break
            }
        }
    }
    modalTitle1.innerText=allData[objindex].title;
    modal.classList.toggle('d-block');
    modalimg.setAttribute('src', allData[objindex].image_url );
    urlInfo.setAttribute('href', allData[objindex].source_url );
    closeModal();
    console.log(objindex);
})


function closeModal(){
    for(let i=0;i<close1.length;i++){
        close1[i].addEventListener('click',function(){
            modal.classList.remove('d-block');
        })
    }
}



function findOutWhichTagWasPressed(nodeList){
    for(let i=0;i<nodeList.length;i++){
        nodeList[i].addEventListener("click",function(e){
            var currentActive = document.querySelector('.nav-link.active');
            if (currentActive) {
                currentActive.classList.remove('active');
            }
            e.target.classList.add('active');
            if(e.target.innerHTML=='Home'){
                getApi('potato');
            }
            else{
                getApi(e.target.innerHTML);
            }
        })
    }
}
findOutWhichTagWasPressed(navLink);

async function getApi(x) {
    try {
        var response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${x}`);
        var data = await response.json();
        allData = data.recipes;
        console.log(allData);
        retreive(allData);
    }
    catch (error) {
        console.log(error);
    }
}



getApi('potato');

