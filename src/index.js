document.addEventListener("DOMContentLoaded", function () {
    console.log('%c HI', 'color: firebrick')
  
    fetchImages();
    fetchBreeds();
  
    function fetchImages() {
      const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  
      fetch(imgUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          handleImages(data.message);
        })
        .catch((error) => {
          console.error("Error fetching images:", error);
        });
    }
  
    function handleImages(images) {
      const dogImageContainer = document.getElementById("dog-image-container");
      dogImageContainer.innerHTML = "";
  
      images.forEach((imageUrl) => {
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        dogImageContainer.appendChild(imgElement);
      });
    }
  
    function fetchBreeds() {
        const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    
        fetch(breedUrl)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            handleBreeds(data.message);
            setupDropdown();
          })
          .catch((error) => {
            console.error("Error fetching breeds:", error);
          });
      }
    
      function handleBreeds(breeds) {
        const dogBreedsList = document.getElementById("dog-breeds");
    
        dogBreedsList.innerHTML = "";
    
        for (const breed in breeds) {
          const breedItem = document.createElement("li");
          breedItem.textContent = breed;
          breedItem.style.cursor = 'pointer';
    
          breedItem.addEventListener("click", () => {
            breedItem.style.color = "blue";
          });
    
          dogBreedsList.appendChild(breedItem);
        }
      }
    
      function setupDropdown() {
        const dropdown = document.getElementById("breed-dropdown");
    
        dropdown.addEventListener("change", function () {
          const selectedLetter = this.value.toLowerCase();
          filterBreedsByLetter(selectedLetter);
        });
      }
    
      function filterBreedsByLetter(selectedLetter) {
        const dogBreedsList = document.getElementById("dog-breeds");

        for (const breedItem of dogBreedsList.children) {
          const breedName = breedItem.textContent.toLowerCase();
          breedItem.style.display = breedName.startsWith(selectedLetter) ? "block" : "none";
        }
      }
  });
  