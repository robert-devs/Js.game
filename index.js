//challange:your age in days
function ageInDays() {
  var birthYear = prompt("what year were you born");
  var ageInDayss = (2018 - birthYear) * 365;
  var h1 = document.createElement("h1");
  const text = document.createTextNode("your are " + ageInDayss + " days old");
  h1.setAttribute("id", "ageInDays");
  h1.appendChild(text);
  document.getElementById("flex-box-result").appendChild(h1);
}
function reset() {
  document.getElementById("ageInDays").remove();
}
//challange 2:
function generateCat() {
  var image = document.createElement("img");
  var div = document.getElementById("flex-cat-gen");
  image.src = 'https://thecatapi.com/api/images/get?format=src&type=gif" alt="';
  div.appendChild(image);
}
//challange 3 rock,paper sciccors
function rpsGame(yourChoice) {
  console.log(yourChoice);
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(randToRpsInt());
  console.log("computer choice", botChoice);

  const results = decideWinner(humanChoice, botChoice);
  console.log(results);

  Message = finalMessage(results); //you won{'message,color'green'}
  console.log(Message);

  rpsFrontEnd(yourChoice.id, botChoice, Message);
}

function randToRpsInt() {
  return Math.floor(Math.random() * 3);
}
function numberToChoice(number) {
  return ["rock", "paper", "sciccors"][number];
}

function decideWinner(yourChoice, computerChoice) {
  console.log({ yourChoice, computerChoice });
  var rpsDatabase = {
    rock: { sciccors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, sciccors: 0 },
    sciccors: { paper: 1, sciccors: 0.5, rock: 0 },
  };
  var yourScore = rpsDatabase[yourChoice][computerChoice];
  var computerScore = rpsDatabase[computerChoice][yourChoice];

  return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return { message: "you lost!", color: "red" };
  } else if (yourScore === 0.5) {
    return { message: "you tied!", color: "yellow" };
  } else {
    return { message: "you won!", color: "green" };
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  var imagesDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    sciccors: document.getElementById("sciccors").src,
  };
  //let`s remove all images;
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("sciccors").remove();

  var humanDiv = document.createElement("div");
  var botDiv = document.createElement("div");
  var massageDiv = document.createElement("div");

  humanDiv.innerHTML =
    "<img src='" +
    imagesDatabase[humanImageChoice] +
    "'height='150' width='150 styles='box-shadow:0px 10px 50px rgba(37,50,233,1);'>";
  massageDiv.innerHTML =
    "<h1 style='color: " +
    finalMessage["color"] +
    ";font-size:60px; padding:30px;'>" +
    finalMessage["message"] +
    "</h1>";
  botDiv.innerHTML =
    "<img src='" +
    imagesDatabase[botImageChoice] +
    "'height='150' width='150 styles='box-shadow:0px 10px 50px rgba(243,38,24,1);'>";

  document.getElementById("flex-box-rps-div").appendChild(humanDiv);
  document.getElementById("flex-box-rps-div").appendChild(botDiv);
  document.getElementById("flex-box-rps-div").appendChild(massageDiv);
}
//challange change color of all button
var all_button = document.getElementsByTagName("button");

var copyAllButtons = [];
for (let i = 0; i < all_button.length; i++) {
  copyAllButtons.push(all_button[i].classList[1]);
}
console.log(copyAllButtons);

function buttonColorChange(buttonThingy) {
  if (buttonThingy.value === "red") {
    buttonsRed();
  } else if (buttonThingy.value === "green") {
    buttonsGreen();
  } else if (buttonThingy.value === "reset") {
    buttonColorReset();
  } else if (buttonThingy.value === "random") {
    randomColors();
  }
}
function buttonsRed() {
  for (let i = 0; i < all_button.length; i++) {
    all_button[i].classList.remove(all_button[i].classList[1]);
    all_button[i].classList.add("btn-danger");
  }
}
function buttonsGreen() {
  for (let i = 0; i < all_button.length; i++) {
    all_button[i].classList.remove(all_button[i].classList[1]);
    all_button[i].classList.add("btn-success");
  }
}
function buttonColorReset() {
  for (let i = 0; i < all_button.length; i++) {
    all_button[i].classList.remove(all_button[i].classList[1]);
    all_button[i].classList.add(copyAllButtons[i]);
  }
}
function randomColors() {
  let choices = ["btn-primary", "btn-danger", "btn-success", "btn-warning"];

  for (let i = 0; i < all_button.length; i++) {
    let randomNumber = Math.floor(Math.random() * 4);
    all_button[i].classList.remove(all_button[i].classList[1]);
    all_button[i].classList.add(choices[randomNumber]);
  }
}

//challange:5 blackjack
let blackjackGame = {
  you: { scoreSpan: "#your-blackjack-result", div: "#your-box", score: 0 },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "K", "Q", "A"],
  cardsMap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 10,
    K: 10,
    Q: 10,
    A: [1, 11],
  },
  wins: 0,
  losses: 0,
  draws: 0,
  isStand: false,
  turnOver: false,
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

const hitSound = new Audio("sounds/swish.m4a");
const winSound = new Audio("sounds/cash.mp3");
const lossSound = new Audio("sounds/aww.mp3");

document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);
document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", dealerLogic);

document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackjackDeal);

function blackjackHit() {
  if (blackjackGame["isStand"] === false) {
    let card = randomCard();
    console.log(card);
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][randomIndex];
}

function showCard(card, activePlayer) {
  if (activePlayer["score"] <= 21) {
    let cardImages = document.createElement("img");
    cardImages.src = `images/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImages);
    hitSound.play();
  }
}

function blackjackDeal() {
  if (blackjackGame["turnOver"] === true) {
    blackjackGame["isStand"] = false;

    let yourImages = document
      .querySelector("#your-box")
      .querySelectorAll("img");
    let dealerImages = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");

    yourImages[0].remove();

    for (i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }
    for (i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }
    YOU["score"] = 0;
    DEALER["score"] = 0;

    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").textContent = 0;

    document.querySelector("#your-blackjack-result").style.color = "#ffffff";
    document.querySelector("#dealer-blackjack-result").style.color = "#ffffff";

    document.querySelector("#blackjack-result").textContent = "let's play";
    document.querySelector("#blackjack-result").style.color = "black";
    blackjackGame["turnOver"] = true;
  }
}

function updateScore(card, activePlayer) {
  if (card === "A") {
    // adding 11 keeps me 21,add 11.otherwise,add 1,
    if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardsMap"][card][1];
    } else {
      activePlayer["scroe"] += blackjackGame["cardsMap"][card][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardsMap"][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function dealerLogic() {
  blackjackGame["isStand"] = true;

  while (DEALER["score"] < 16 && blackjackGame["isStand"] === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }

  blackjackGame["turnOver"] = true;
  let winner = computeWinner();
  showResult(winner);
}

//compute winner and return who just won
//update the wins , draw and losses
function computeWinner() {
  let winner;

  if (YOU["score"] <= 21) {
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      blackjackGame["wins"]++;
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"]) {
      blackjackGame["losses"]++;

      winner = DEALER;
    } else if (YOU["score"] === DEALER["score"]) {
      blackjackGame["draws"]++;

      //condation:when the user burst dealer doesnt
    } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
      blackjackGame["losses"]++;
      winner = DEALER;

      //condation:when you and dealer bursts
    } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
      blackjackGame["draws"]++;
    }
    console.log(blackjackGame);
    return winner;
  }
}

function showResult(winner) {
  let message, messageColor;
  if (blackjackGame["turnOver"] === true) {
    if (winner === YOU) {
      document.querySelector("#wins").textContent = blackjackGame["wins"];
      message = "you won";
      messageColor = "green";
      winSound.play();
    } else if (winner === DEALER) {
      document.querySelector("#losses").textContent = blackjackGame["losses"];
      message = "you lost";
      messageColor = "red";
      lossSound.play();
    } else {
      document.querySelector("#draws").textContent = blackjackGame["draws"];
      message = "you drew";
      messageColor = "black";
    }

    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
  }
}
