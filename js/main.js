//POKEDEX

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
      let numbers = paddedNumberList(data, 3);

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
        card.addEventListener("click", () => alert(pokemon["name"]["english"]));
        
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
const searchInput = document.getElementById("input-bar");
searchInput.addEventListener("input", (text) => {
  const value = text.target.value.toLowerCase();
  console.log(cards[1]["type"]);
  for (let i = 0; i < cards.length; i++) {
    const show =
      cards[i]["number"].includes(value) ||
      cards[i]["name"].includes(value) ||
      cards[i]["type"].includes(value);
    cards[i]["element"].classList.toggle("hide", !show);
  }
});
