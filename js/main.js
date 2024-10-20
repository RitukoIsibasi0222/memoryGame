const trump = document.getElementById("trump");
const trumpBack = [];
const trumpFront = [];
const turnOver = []; // クリックされたカードを格納する配列
const cardMark = ["card_club", "card_diamond", "card_heart", "card_spade"];
const cardNumber = ["_01", "_02", "_03", "_04", "_05", "_06", "_07", "_08", "_09", "_10", "_11", "_12", "_13"];
let frontCard = [];

// trump内にdiv.trump__setを52回繰り返して表示をする
function createTrump() {
  for (let i = 0; i < 52; i++) {
    const div = document.createElement("div");
    const imgFront = document.createElement("img");
    const imgBack = document.createElement("img");

    div.classList.add("trump__set");
    const trumpSet = trump.appendChild(div);

    // trumpSetの中にimgを2つ追加する
    imgBack.src = "../image/card_back.png";
    imgBack.classList.add("trump__back");
    trumpSet.appendChild(imgBack);
    trumpBack.push(imgBack);

    // cardMarkとcardNumberを組み合わせてfrontCardにする
    const mark = cardMark[Math.floor(i / 13)];
    const number = cardNumber[i % 13];
    
    frontCard = mark + number;
    // frontCardをtrumpFrontに格納する
    trumpFront.push(frontCard);
    
    imgFront.src = `../image/${frontCard}.png`;
    
    imgFront.classList.add("trump__front");
    trumpSet.appendChild(imgFront);
  }
}
createTrump();

// console.log(trumpFront);

// trumpFrontをシャッフルして再表示する
// 条件：trumpFrontの配列をシャッフルする
// 重複しないようにする
// 全てのカードが表示されるようにする
function shuffle() {
  for (let i = trumpFront.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    const tmp = trumpFront[i];
    trumpFront[i] = trumpFront[r];
    trumpFront[r] = tmp;
    // console.log(trumpFront[r]);
  }
  // console.log(trumpFront);
  const trumps = document.querySelectorAll('.trump__front');
  trumps.forEach( function( trump, index ) {
    trump.src = `../image/${trumpFront[index]}.png`;
    console.log(trumpFront[index]);
});
}
shuffle();

// trumpBackがクリックされたらクリックされたtrumpBackに.activeを追加する

function addAvtive() {
  trumpBack.forEach((back, index) => {
    back.addEventListener("click", () => {
      if (turnOver.length < 2) {
        back.classList.add("active");
        turnOver.push(trumpFront[index]);
        console.log(trumpFront[index] + " turnOver");
      }
    });
  });
} 
addAvtive();





