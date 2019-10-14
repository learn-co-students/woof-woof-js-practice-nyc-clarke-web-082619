
document.addEventListener('DOMContentLoaded', function(){
    fetchDogs()
})


document.addEventListener('click', function(event){
   let dogId = event.target.dataset.id
    if (event.target.tagName === "SPAN"){
        
        fetch(`http://localhost:3000/pups/${dogId}`)
        .then(resp => resp.json())
        .then(dog => pupCard(dog))
    }
    else if((event.target.tagName === "BUTTON") && (event.target.id != "good-dog-filter")) {
        let good;
        let buttonText;
        if(event.target.innerText === "Good Dog!"){
            good = false;
            buttonText = "Bad Dog!"
        }else {
            good = true;
            buttonText = "Good Dog!"
        }
        fetch(`http://localhost:3000/pups/${dogId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                isGoodDog: good
            })
        })
        .then(resp => resp.json())
        .then(event.target.innerText = buttonText)

    } else if (event.target.id === "good-dog-filter") {

    }
})

function fetchDogs(){
  fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(dogs => {
        dogs.forEach(dog => showDogs(dog))
    });
}

function showDogs(dog){
    const dogBar = document.getElementById('dog-bar')
    const dogSpan = document.createElement('span')
    dogSpan.innerText = dog.name
    dogSpan.setAttribute('data-id', dog.id)
    dogBar.appendChild(dogSpan)
}

function pupCard(dog){
   const dogInfo = document.getElementById('dog-info')
   let buttonText

   if (dog.isGoodDog){
       buttonText = "Good Dog!"
   }else{
       buttonText = "Bad Dog!"
   }
   dogInfo.innerHTML = 
   `<img src=${dog.image}>
    <h2>${dog.name}</h2>
    <button data-id=${dog.id}>${buttonText}</button>
   `
}

