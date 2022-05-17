document.addEventListener("DOMContentLoaded", () => {
  //card options
  const cardArray = [
    {
      name: "alicja1",
      img: "image/games/alicja1.png",
    },
    {
      name: "alicja2",
      img: "image/games/alicja2.png",
    },
    {
      name: "alicja3",
      img: "image/games/alicja3.png",
    },
    {
      name: "asger1",
      img: "image/games/asger1.png",
    },
    {
      name: "asger2",
      img: "image/games/asger2.png",
    },
    {
      name: "asger3",
      img: "image/games/asger3.png",
    },
    {
      name: "alicja1",
      img: "image/games/alicja1.png",
    },
    {
      name: "alicja2",
      img: "image/games/alicja2.png",
    },
    {
      name: "alicja3",
      img: "image/games/alicja3.png",
    },
    {
      name: "asger1",
      img: "image/games/asger1.png",
    },
    {
      name: "asger2",
      img: "image/games/asger2.png",
    },
    {
      name: "asger3",
      img: "image/games/asger3.png",
    },
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  //create your board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement("img");
      card.setAttribute("src", "image/games/blank.png");
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    }
  }

  //check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll("img");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute("src", "image/games/blank.png");
      cards[optionTwoId].setAttribute("src", "image/games/blank.png");
      Swal.fire({
        title: "Error!",
        text: "You have clicked the same image!",
        icon: "error",
        confirmButtonText: "Cool",
      });
    } else if (cardsChosen[0] === cardsChosen[1]) {
      Swal.fire({
        title: "Nice!",
        text: "You found a match!",
        icon: "success",
        confirmButtonText: "Keep going!",
      });
      //alert("You found a match");
      cards[optionOneId].setAttribute("src", "image/games/white.png");
      cards[optionTwoId].setAttribute("src", "image/games/white.png");
      cards[optionOneId].removeEventListener("click", flipCard);
      cards[optionTwoId].removeEventListener("click", flipCard);
      cardsWon.push(cardsChosen);
    } else {
      cards[optionOneId].setAttribute("src", "image/games/blank.png");
      cards[optionTwoId].setAttribute("src", "image/games/blank.png");
      Swal.fire({
        title: "Close!",
        text: "You'll get it next try!",
        icon: "error",
        confirmButtonText: "Try again!",
      });
      //alert("Sorry, try again");
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
      Swal.fire({
        title: "YOU WON!!!",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }
  }

  //flip your card
  function flipCard() {
    let cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute("src", cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }

  createBoard();
});
