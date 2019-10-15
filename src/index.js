document.addEventListener("DOMContentLoaded", () => {
  const dogBar = document.getElementById("dog-bar");
  const dogInfo = document.getElementById("dog-info");
  const onlyGoodBoisButton = document.getElementById("good-dog-filter");
  const dogUrl = "http://localhost:3000/pups";

  function getDogs(filter) {
    fetch(dogUrl)
      .then(resp => resp.json())
      .then(dogs => {
        for (const dog of dogs) {
          if (filter === false) {
            dogBar.innerHTML += `<span class="doggo" id ="${dog.id}">${dog.name}</span>`;
          } else if (filter === true && dog.isGoodDog === true) {
            dogBar.innerHTML += `<span class="doggo" id="${dog.id}">${dog.name}</span>`;
          }
        }
      });
  }

  function getSingleDog(dogId) {
    fetch(`${dogUrl}/${dogId}`)
      .then(resp => resp.json())
      .then(dog => displayPup(dog));
  }

  function updateDogStatus(dogId, boolean) {
    fetch(`${dogUrl}/${dogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        isGoodDog: boolean
      })
    });
  }

  function displayPup(dog) {
    let dogStatus;
    dog.isGoodDog === true
      ? (dogStatus = "Good Boy!")
      : (dogStatus = "Bad Boy!");
    dogInfo.innerHTML = `<img src="${dog.image}">
         <h2>${dog.name}</h2>
         <button data-id="${dog.id}" id='good-bad'>${dogStatus}</button>`;
  }

  document.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.className === "doggo") {
      event.preventDefault();
      getSingleDog(event.target.id);
    }

    if (event.target.innerText === "Filter good dogs: OFF") {
      onlyGoodBoisButton.innerText = "Filter good dogs: ON";
      dogBar.innerHTML = "";
      filter = true;
      getDogs(filter);
    } else if (event.target.innerText === "Filter good dogs: ON") {
      onlyGoodBoisButton.innerText = "Filter good dogs: OFF";
      dogBar.innerHTML = "";
      let filter = false;
      getDogs(filter);
    }

    const goodBadButton = document.querySelector("#good-bad");

    if (event.target.innerText === "Good Boy!") {
      event.target.innerText = "Bad Boy!";
      updateDogStatus(goodBadButton.dataset.id, false);
    } else if (event.target.innerText === "Bad Boy!") {
      event.target.innerText = "Good Boy!";
      updateDogStatus(goodBadButton.dataset.id, true);
    }
  });

  getDogs(false);
});
