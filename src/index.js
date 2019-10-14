document.addEventListener('DOMContentLoaded', function(){
    function fetchDoggos(){
        fetch('http://localhost:3000/pups', {
            header: {
                'Content-Type':'application/json',
            }
        })
        .then(resp => resp.json())
        .then(data => {
            data.forEach(doggo => {
                const dogBar = document.getElementById('dog-bar');
                let doggoSpans = createDoggoBar(doggo.name, doggo.image, doggo.isGoodDog, doggo.id);
                dogBar.appendChild(doggoSpans);
            })
        })
    }

    fetchDoggos();

    document.addEventListener('click', function(){
        event.preventDefault();

        if(event.target.className === 'doggoSpan'){
            return renderDoggo(event.target.id);
        }
  
        if(event.target.className === 'goodDoggo'){
            const id = event.target.parentNode.getAttribute('data-id');
            event.preventDefault();
            fetch(`http://localhost:3000/pups/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type':'application/json',
                    'Accept': 'application/json'
                    },
                body: JSON.stringify({
                    'isGoodDog': false
                })
            })
            renderDoggo(id);
        }

        else if(event.target.className === 'badDoggo'){
            const id = event.target.parentNode.getAttribute('data-id');
            event.preventDefault();
            fetch(`http://localhost:3000/pups/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type':'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    isGoodDog: true
                })
            })
            renderDoggo(id);
        }
    })

    document.addEventListener('click', function(){
        if(event.target.innerHTML === 'Filter good dogs: OFF'){
            event.target.innerHTML = 'Filter good dogs: ON';
            const dogBar = document.getElementById('dog-bar');
            dogBar.innerHTML = ''
            return fetch('http://localhost:3000/pups', {
                header: {
                    'Content-Type':'application/json',
                }
            })
            .then(resp => resp.json())
            .then(data => {
                data.forEach(doggo => {
                    let doggoSpans = createDoggoBar(doggo.name, doggo.image, doggo.isGoodDog, doggo.id);
                    if(doggo.isGoodDog === true){
                        dogBar.appendChild(doggoSpans);
                    }
                })
            })
        }
        else if(event.target.innerHTML === 'Filter good dogs: ON'){
            event.target.innerHTML = 'Filter good dogs: OFF';
            fetchDoggos();
        }
    })

})

function createDoggoBar(name, image, isGoodDog=true, id){
    let doggoSpan = document.createElement('h6');
    doggoSpan.innerHTML = `
        <span id=${id} class='doggoSpan'>${name}</span>
    `

    return doggoSpan
}

function renderDoggo(id){
    fetch(`http://localhost:3000/pups/${id}`, {
            headers: {
                'Content-Type':'application/json',
                'Accept': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(doggo => {
            createDoggoCard(doggo);
        })
}

function createDoggoCard(doggo){
    let showDoggoCard = document.getElementById('dog-info');
    
    showDoggoCard.innerHTML = `
        <img src=${doggo.image} />
        <h2>${doggo.name}</h2>
    `
    if(doggo.isGoodDog === true){
        showDoggoCard.innerHTML = showDoggoCard.innerHTML + "<p>Currently: Good Doggo</p>" + "<button type='button' class='goodDoggo'>Make Bad Doggo</button>"
    }

    else if(doggo.isGoodDog === false){
        showDoggoCard.innerHTML = showDoggoCard.innerHTML + "<p>Currently: Bad Doggo</p>" + "<button type='button' class='badDoggo'>Make Good Doggo</button>"
    }

    showDoggoCard.setAttribute('data-id',`${doggo.id}`)
}