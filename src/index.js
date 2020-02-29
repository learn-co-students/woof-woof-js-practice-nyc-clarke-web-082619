document.addEventListener("DOMContentLoaded", () => {

    function displayDogBar(json){
        let dogBar = document.getElementById('dog-bar');
        let dogSpan = document.createElement('span');
        let dogText = document.createTextNode(`${json.name}`);
        dogSpan.setAttribute('data-id', json.id);
        dogSpan.appendChild(dogText);
        dogBar.appendChild(dogSpan);
    }

    function fetchBar(){
        fetch("http://localhost:3000/pups")
        .then(response => response.json())
        .then(json => (json.forEach(elem => displayDogBar(elem))));
    }

    fetchBar();

    function deleteDogInfo(){
        let dogInfo = document.getElementById('dog-info');
        while(dogInfo.firstChild){
            dogInfo.removeChild(dogInfo.firstChild);
        }
    }

    function displayDog(json){
        deleteDogInfo();
        let dogInfo = document.getElementById('dog-info');
        let dogImg = document.createElement('img');
        dogImg.src = json.image;
        let dogH2 = document.createElement('h2');
        dogH2.setAttribute('data-id', json.id);
        let dogButton = document.createElement('button');
        dogButton.setAttribute('id','dog-button');
        let dogButtonText = document.createTextNode('');
        if(json.isGoodDog){
            dogButtonText.textContent = "Bad Dog!";
        }
        else{
            dogButtonText.textContent = "Good Dog!";
        }
        dogButton.appendChild(dogButtonText);
        dogInfo.appendChild(dogImg);
        dogInfo.appendChild(dogH2);
        dogInfo.appendChild(dogButton);
        dogButton.addEventListener("click", () => {
            event.preventDefault();
            let formData;
            if(dogButton.textContent === "Good Dog!"){
                formData = {isGoodDog: true};
            }
            else{
                formData = {isGoodDog: false}
            }
            let configObj = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(formData)
            }
            fetch(`http://localhost:3000/pups/${json.id}`,configObj)
            .then(response => response.json())
            .then(rjson => {
                if(rjson.isGoodDog){
                    dogButton.textContent = "Bad Dog!";
                }
                else{
                    dogButton.textContent = "Good Dog!";
                }
            })
            .catch(error => alert(error));
        })
    }

    function fetchDog(id){
        fetch(`http://localhost:3000/pups/${id}`)
        .then(response => response.json())
        .then(json => displayDog(json));
    }

    document.getElementById('dog-bar').addEventListener("click", (event) => {
        let target = event.target;
        fetchDog(target.getAttribute('data-id'));
    })
})