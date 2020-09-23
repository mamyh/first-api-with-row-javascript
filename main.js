let timer;
let deletePhotoForStart;
async function start(){
    let response =await fetch('https://dog.ceo/api/breeds/list/all');
    let data    = await response.json();
    createElement(data.message);
}

start();

function createElement(dataForDogs){
    document.getElementById('dogs').innerHTML=`
        <select onchange ="loadDogImage(this.value)">
            <option>choose a dog</option>
           ${Object.keys(dataForDogs).map(function(dog){
              return `<option>${dog}</option>`
           }).join('')}
        </select>
       `
}

async function loadDogImage(dog){
    if(dog !="choose a dog"){
        let response =await fetch(`https://dog.ceo/api/breed/${dog}/images`);
        let data = await response.json();
        createSlide(data.message);     
    }
    
}

function createSlide(dogImages){
    let currentPosition =0;
    clearInterval(timer);
    clearTimeout(deletePhotoForStart);
    if(dogImages.length >1){
        document.querySelector('.slide-box').innerHTML=`
           <div class="slide" style="background-image: url('${dogImages[0]}')"></div>
           <div class="slide" style="background-image: url('${dogImages[1]}')"></div>
        `;
        currentPosition  +=2;
        if(dogImages.length == 2) currentPosition = 0;
        timer =setInterval(nextslide,3000);

    }else{
        document.querySelector('.slide-box').innerHTML=`
           <div class="slide" style="background-image: url('${dogImages[0]}')"></div>
           <div class="slide"></div>
        `;
    }

   
    function nextslide(){
        document.querySelector('.slide-box').insertAdjacentHTML('beforeend',`<div class="slide" style="background-image: url('${dogImages[currentPosition]}')"></div>`);
       deletePhotoForStart= setTimeout(function(){
           document.querySelector('.slide').remove();

       },1000);
       if(currentPosition +1 >= dogImages.length ){
           currentPosition= 0 ;
       }else{
           currentPosition++;
       }
    }
}