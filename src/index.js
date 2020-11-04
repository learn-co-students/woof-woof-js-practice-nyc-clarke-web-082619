const dogsContainer = document.getElementById('dog-bar');
const infoContainer = document.getElementById('dog-info');
let currentDog;
let filterOn = false;

function fetchDogs(callback){
    fetch('http://localhost:3000/pups')
    .then( response => response.json() )
    .then( data => callback(data) );
}

function printDogNames(dogs){
    dogs.forEach(dog => {
        let newSpan = document.createElement('span');
        newSpan.setAttribute('data-id', dog.id);
        newSpan.innerText = dog.name;
        dogsContainer.appendChild(newSpan);
    })
}

function fetchSingleDog(id){
    fetch(`http://localhost:3000/pups/${id}`)
    .then(resp => resp.json())
    .then(data => {
        currentDog = data;
        showDogInfo(data);
    })
}


function showDogInfo(dog){
    infoContainer.innerHTML = '';
    let newDiv = document.createElement('div');
    let buttonText;
    
    if (dog.isGoodDog){
        buttonText = 'Good Dog!';
    }else{
        buttonText = 'Bad Dog!';
    }

    newDiv.innerHTML = `
        <img src='${dog.image}'>
        <h2>${dog.name}</h2>
        <button id="isGoodDog">${buttonText}</button>
    `;
    infoContainer.appendChild(newDiv);
}


function changeGoodDogStatus(){
    currentDog.isGoodDog = currentDog.isGoodDog ? false : true;

    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            isGoodDog: currentDog.isGoodDog
        })
    }

    fetch(`http://localhost:3000/pups/${currentDog.id}`,configObj)
    .then(resp => resp.json())
    .then(data => {
        showDogInfo(data);
        if(filterOn){
            fetchDogs(filterGoodDogs);
        }
    })
}


function filterGoodDogs(dogs){
    let goodDogs = dogs.filter(dog => dog.isGoodDog);
    dogsContainer.innerHTML = '';
    printDogNames(goodDogs);
}


//when window loaded, fetch the db.json file and print the dogs in #dog-bar
document.addEventListener('DOMContentLoaded', (event)=>{
    console.log('page loaded');
    fetchDogs(printDogNames);
});


document.addEventListener('click', (event)=>{
    //when click on a specific dog name in the #dog-bar container, display its info
    if (event.target.tagName === 'SPAN'){
        fetchSingleDog(event.target.dataset.id);
    }

    //when click on the good/bad dog button, toggle the button text and send fetch request 
    //to change the db.json file 
    if(event.target.id === 'isGoodDog'){
        changeGoodDogStatus();
    }

    //filter
    if(event.target.id === 'good-dog-filter'){
        console.log(filterOn);
        if(!filterOn){
            filterOn = true;
            event.target.innerText = 'Filter good dogs: ON';
            fetchDogs(filterGoodDogs);
        }else{
            filterOn = false;
            event.target.innerText = 'Filter good dogs: OFF';
            fetchDogs(printDogNames);
        }
    }
});

