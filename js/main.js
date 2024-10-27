const trump = document.getElementById("trump");
const trumpBack = [];
const trumpFront = [];
const turnOver = []; // クリックされたカードを格納する配列
const cardMark = ["card_club", "card_diamond", "card_heart", "card_spade"];
const cardNumber = ["_01", "_02", "_03", "_04", "_05", "_06", "_07", "_08", "_09", "_10", "_11", "_12", "_13"];
let frontCard = [];
let turnOverIndex = [];
let turnOverName = [];
let playerCount = 0;
let player = 1;
let temporary = [];
let pair = [];
// let getPair = 0;
// let passing = 1;

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

// trumpFrontをシャッフルして再表示する
function shuffle() {
  for (let i = trumpFront.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    const tmp = trumpFront[i];
    trumpFront[i] = trumpFront[r];
    trumpFront[r] = tmp;
    // console.log(trumpFront[r]);
  }
  // console.log(trumpFront);
  const trumps = document.querySelectorAll(".trump__front");
  trumps.forEach(function (trump, index) {
    trump.src = `../image/${trumpFront[index]}.png`;
    console.log(trumpFront[index]);
  });
}
shuffle();

// trumpBackがクリックされた後の処理
trumpBack.forEach((back, index) => {
  back.addEventListener("click", () => {
    function addActive() {
      if (turnOver.length < 2) {
        turnOver.push(trumpFront[index]);
        // クリックをしたカードに.activeを追加する
        back.classList.add("active");
        // console.log(turnOver);

        // カードの数字を格納
        turnOverIndex.push(trumpFront[index].slice(-2));
        temporary.push(trumpFront[index]);
        // console.log(turnOverName + "turnOverName");
        // console.log(turnOverIndex);
      }
    }
    addActive();

    function compareCard() {
      // トランプの数字が同じだった時の処理
      if (turnOverIndex.length === 2) {
        if (turnOverIndex[0] === turnOverIndex[1]) {
          playerCount++;
          // pairにtemporaryの最後から２つの配列を追加する
          pair.push(temporary.slice(-2));
          console.log(pair + "pair");
          // getPair = 1; //ペアを持っている

          pair.forEach((pair) => {
            // console.log(pair);
            trumpFront.forEach((front, index) => {
              if (front === pair[0] || front === pair[1]) {
                // .get-pairを追加する
                trumpBack[index].classList.add("get-pair");
                // trumpBack[index].style.display = "none";
              }
            });
          });

          // トランプをめくれるように初期化
          turnOver.length = 0;
          turnOverIndex.length = 0;
          // console.log(playerCount + "playerCount");
        } else if (turnOverIndex[0] !== turnOverIndex[1]) { 
          setTimeout(() => {
            trumpBack.forEach((back) => {
              back.classList.remove("active");
              player = 0;
              // passing = 1; //ミスをした
              // トランプをめくれるように初期化
              turnOver.length = 0;
              turnOverIndex.length = 0;            
            });
          }, 3000);
        }
      }
    }
    compareCard();

    function count() {
      let turnCount = 0;
      turnCount = Math.floor(temporary.length / 2);
      // console.log(turnCount + "turnCount");
      if (turnCount > 0) {
        document.getElementById("count").textContent = `${turnCount}`;
      }
    }
    count();
  });
});

// resetボタンを押したらページをリロードする
document.getElementById("reset").addEventListener("click", () => {
  window.location.reload();
});
