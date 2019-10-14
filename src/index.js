document.addEventListener('DOMContentLoaded', function (){
    fetchDogs()
})

function fetchDogs(){
    fetch('http//localhost:3000/pups')
    .then(response => response.json)
    .then(dogs => {
        dogs.forEach(dog => showDogs(dog))
    })
}

function showDogs(dog){
    const dogBar = document.getElementById('dog-bar')
    const dogSpan = document.createElement('span')
    dogSpan.innerText = dog.name
    dogBar.appendChild(dogSpan)
}

function pupCard(dog{
    const dogInfo = document.getElementById('dog-info')
    if (dog.isGoodDog) {
      let buttonText = "Good Dog!"
    }else{
      let buttonText = "Bad Dog!"    
    }
dogInfi
})