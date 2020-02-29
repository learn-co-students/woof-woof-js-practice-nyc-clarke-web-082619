document.addEventListener('DOMContentLoaded', function(event){

    let filter = false;
    function renderBar(filter){
        let dogBar = document.getElementById('dog-bar')
        while(dogBar.firstChild){
            dogBar.removeChild(dogBar.firstChild);
        }
        fetch('http://localhost:3000/pups')
        .then(resp=>{
            return resp.json();
        })
        .then(info =>{
            for(index of info){
                let doggo = document.createElement('span');
                doggo.id = index.id;
                doggo.innerText = index.name;
                if (filter === false){
                    dogBar.appendChild(doggo);
                }
                else if (filter === true && index.isGoodDog === true){
                    dogBar.appendChild(doggo);
                }
            }
        })
    }

    function getDoggo(dogId){

        fetch(`http://localhost:3000/pups/${dogId}`)
        .then(resp =>{
            return resp.json();
        })
        .then(info =>{
            renderDoggo(info);
        })
    }

    function renderDoggo(info){
        let pupper = info;
        let goodBoyDisplay = document.getElementById('dog-info');
        while(goodBoyDisplay.firstChild){
            goodBoyDisplay.removeChild(goodBoyDisplay.firstChild)
        }
        let h2 = document.createElement('h2');
        let img = document.createElement('img');
        img.id = pupper.id;
        let goodBtn = document.createElement('button');
        goodBtn.id = 'good-btn';
        if (pupper.isGoodDog === true){
            goodBtn.innerText = 'Good Dog'
        }
        else {
            goodBtn.innerText = 'Bad Dog'
        }
        h2.innerText = pupper.name;
        img.src = pupper.image;
        goodBoyDisplay.appendChild(h2);
        goodBoyDisplay.appendChild(img);
        goodBoyDisplay.appendChild(goodBtn);
    }

    function theyAreAllGoodBoys(id){
        
        return fetch(`http://localhost:3000/pups/${id}`,{
            method: 'PATCH',
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                isGoodDog: true
            })
        })
    }

    document.getElementById('dog-info').addEventListener('click', function(event){
        let b = document.getElementById('good-btn');
        
        if (event.target.id = 'good-btn'){
            if (b.innerText === 'Bad Dog'){
            b.innerText = 'Good Dog'
            let dogId = parseInt(b.previousElementSibling.id);
            theyAreAllGoodBoys(dogId);
            }
            else if (b.innerText === 'Good Dog'){
                alert("No. All Dogs Are Good Boys!")
            }
        }

    })

    let dogFilter = document.getElementById('good-dog-filter');
    dogFilter.addEventListener('click', function(){
        if (dogFilter.innerText === 'Filter good dogs: OFF'){
            dogFilter.innerText = 'Filter good dogs: ON';
            filter = true;
            renderBar(filter);
        }
        else if (dogFilter.innerText === 'Filter good dogs: ON'){
            dogFilter.innerText = 'Filter good dogs: OFF';
            filter = false;
            renderBar(filter);
        }

    })
    let dogBar = document.getElementById('dog-bar')
    dogBar.addEventListener('click', function(event){
        if (event.target.id !== 'dog-bar'){
            let dogId = event.target.id;
            getDoggo(dogId)
        }
        
    })
    renderBar(filter);
})