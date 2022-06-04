//POKEDEX

//GET JSON DATA
datafromURL("https://m-aziz1.github.io/Pokedex/pokedex.json");

function datafromURL(address) {
  fetch(address)
    .then((rawData) => rawData.json())
    .then((data) => {
      let pokemon = Object.entries(data);
      createCards(pokemon);
    });
}

//INFO CARDS GENERATOR
const cardsBody = document.getElementById("flex-container");

function createCards(dataArray) {
  let numbers = paddedNumberList(dataArray, 3);

  for (let i = 0; i < dataArray.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card-container");

    const img = Object.assign(document.createElement("img"), {
      src: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${numbers[i]}.png`,
      alt: `${numbers[i]}`,
    });

    //create text block
    const textDiv = Object.assign(document.createElement("div"), {
      classList: "card-info",
    });
    const text = Object.assign(document.createElement("p"), {
      innerHTML: `<p>${numbers[i]}<br>${
        dataArray[i][1]["name"]["english"]
      }<br/>${dataArray[i][1]["type"].join(", ")}</p>`,
    });
    textDiv.appendChild(text);

    card.append(img, textDiv);
    cardsBody.appendChild(card);

    card.addEventListener("click", () => alert(dataArray[i][1]["name"]["english"]));
  }
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
searchInput.addEventListener("input", text => {
  const value = text.target.value;
  console.log(value);
})
