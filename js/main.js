//POKEDEX

//Favourites List Height
const listDiv = document.getElementById("favourite-list");
setHeightfromTop(listDiv);

window.addEventListener("resize", () => {
  setHeightfromTop(listDiv);
});

function setHeightfromTop(element) {
  element.style.height = `${window.innerHeight - element.offsetTop}px`;
}

//DOCUMENT ELEMENTS
const pokemonTemplate = document.querySelector("[data-pokemon-template]");
const cardsContainer = document.getElementById("flex-container");
let cards = [];

//GET JSON DATA
datafromURL("https://m-aziz1.github.io/Pokedex/pokedex.json");

function datafromURL(address) {
  fetch(address)
    .then((rawData) => rawData.json())
    .then((data) => {
      //create array of padded numbers
      let numbers = paddedNumberList(data, 3);

      //clone and fill in HTML template for every pokemon
      cards = data.map((pokemon) => {
        const card = pokemonTemplate.content.cloneNode(true).children[0];
        const image = card.querySelector("[data-image]");
        const info = card.querySelector("[data-info]");
        image.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${
          numbers[pokemon["id"] - 1]
        }.png`;
        image.alt = `${numbers[pokemon["id"]]}`;
        info.innerHTML = `<p>${numbers[pokemon["id"] - 1]}<br>${
          pokemon["name"]["english"]
        }<br/>${pokemon["type"].join(", ")}</p>`;

        //replace this event listener with extra info div creation
        card.addEventListener("click", () => alert(pokemon["name"]["english"]));

        //drag and drop
        card.addEventListener("dragstart", () => {
          card.classList.add("dragging");
        });
        card.addEventListener("dragend", () => {
          card.classList.remove("dragging");
        });

        cardsContainer.appendChild(card);

        return {
          number: numbers[pokemon["id"] - 1],
          name: pokemon["name"]["english"].toLowerCase(),
          type: pokemon["type"].join("").toLowerCase(),
          element: card,
        };
      });
    });
}

//Drop Containers
const containers = document.querySelectorAll(".drag-container");
containers.forEach((container) => {
  container.addEventListener("dragover", (event) => {
    event.preventDefault();
    const afterElement = getDragAfterElement(container, event.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".card-container:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.POSITIVE_INFINITY }
  ).element;
}

//Pad Numbers
function paddedNumberList(dataArray, placeValues) {
  let temp = [];

  for (let i = 1; i <= dataArray.length; i++) {
    let numString = "" + i;
    while (numString.length < placeValues) {
      numString = "0" + numString;
    }
    temp.push(numString);
  }

  return temp;
}

//Search Bar
//call whenever input value changes
const searchInput = document.getElementById("input-bar");
searchInput.addEventListener("input", (event) => {
  const value = event.target.value.toLowerCase();
  for (let i = 0; i < cards.length; i++) {
    const show =
      cards[i]["number"].includes(value) ||
      cards[i]["name"].includes(value) ||
      cards[i]["type"].includes(value);
      
      //if show != true
    cards[i]["element"].classList.toggle("hide", !show);
  }
});
