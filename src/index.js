const container = document.getElementById('dog-bar');
const infoContainer = document.getElementById('dog-info');
let buttonText;
let currentDog;

function fetchDogs(){
    fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(data => {
        printDogs(data);
    });
}

function printDogs(data){
    data.forEach(dog => {
        let newSpan = document.createElement('span');
        newSpan.innerText = dog.name;
        container.appendChild(newSpan);
    });
}

function showDogInfo(dog){
    infoContainer.innerHTML = '';
    let newDiv = document.createElement('div');
    newDiv.setAttribute('data-id', dog.id);
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

function changeGoodDogStatus(dog){
    console.log(dog.isGoodDog)
    if(dog.isGoodDog){
        dog.isGoodDog = false;
    }else{
        dog.isGoodDog = true;
    }

    console.log(dog)

    // let configObj = {
    //     method: "PATCH",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json"
    //     },
    //     body: JSON.stringify({
    //         isGoodDog: dog.isGoodDog
    //     })
    // }

    // fetch(`http://localhost:3000/pups/${dog.id}`,configObj)

}


//when window loaded, fetch the db.json file and print the dogs in #dog-bar
document.addEventListener('DOMContentLoaded', (event)=>{
    fetchDogs();
});


//when click on a specific dog name in the #dog-bar container, display its info
container.addEventListener('click', (event)=>{
    if (event.target.tagName === 'SPAN'){
        fetch('http://localhost:3000/pups')
        .then(response => response.json())
        .then(data => {
            let dog = data.find(function(dog){
                return dog.name === event.target.innerText
            })
            showDogInfo(dog);
            currentDog = dog;
        });
    }
});


//when click on the good/bad dog button, toggle the button text and send fetch request 
//to change the db.json file 
infoContainer.addEventListener('click', (event)=>{
    if(event.target.id === 'isGoodDog'){
        let button = event.target;
        if(currentDog.isGoodDog){
            button.textContent = "Bad Dog!";
        }else{
            button.textContent = "Good Dog!";
        }
        changeGoodDogStatus(currentDog);
    }
});