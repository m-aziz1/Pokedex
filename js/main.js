//POKEDEX

//DOCUMENT ELEMENTS
const pokemonTemplate = document.querySelector("[data-pokemon-template]");
const cardsContainer = document.getElementById("flex-container");

//GET JSON DATA
datafromURL("https://m-aziz1.github.io/Pokedex/pokedex.json");

function datafromURL(address) {
  fetch(address)
    .then((rawData) => rawData.json())
    .then((data) => {
      let numbers = paddedNumberList(data, 3);

      for (let i = 0; i < data.length; i++) {
        const card = pokemonTemplate.content.cloneNode(true).children[0];
        const image = card.querySelector("[data-image]");
        const info = card.querySelector("[data-info]");
        image.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${numbers[i]}.png`;
        image.alt = `${numbers[i]}`;
        info.innerHTML = `<p>${numbers[i]}<br>${data[i]["name"]["english"]}<br/>${data[i]["type"].join(", ")}</p>`;
        card.addEventListener("click", () => alert(data[i]["name"]["english"]));
        cardsContainer.appendChild(card);
      }
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
  const value = text.target.value;
  console.log(value);
});
