const trump = document.getElementById("trump");
const cardMark = ["card_club", "card_diamond", "card_heart", "card_spade"];
const cardNumber = ["_01", "_02", "_03", "_04", "_05", "_06", "_07", "_08", "_09", "_10", "_11", "_12", "_13"];
let trumpBack = []; // 裏面のカードを格納する配列(ウサギ柄)
let trumpFront = []; // 表面のカードを格納する配列（数字とマーク）
let frontCardImages = [];
let turnOver = []; // めくったカードを格納する配列
let frontCard = []; //数字とマークを一緒にしたカードをいったん格納する配列
let turnOverIndex = []; // めくったカードの数字だけを格納する配列
let playerCount = 0; // プレイヤーがめくった回数をカウントする(2枚で1回)
let temporary = []; // activeの付与されたカードを格納する配列
let pair = [];

// trump内にdiv.trump__setを52回繰り返して表示をする
function createTrump() {
  for (let i = 0; i < 52; i++) {
    const div = document.createElement("div");
    const imgFront = document.createElement("img");
    const imgBack = document.createElement("img");

    div.classList.add("trump__set");
    const trumpSet = trump.appendChild(div);

    // trumpSetの中に表と裏のimgを追加する
    imgBack.src = "../image/card_back.png";
    imgBack.classList.add("trump__back");
    trumpSet.appendChild(imgBack);
    trumpBack.push(imgBack);

    frontCardImages.push(imgFront);

    // cardMarkとcardNumberを組み合わせてfrontCardにする
    const mark = cardMark[Math.floor(i / 13)];
    const number = cardNumber[i % 13];

    frontCard = mark + number;
    // frontCardをtrumpFrontに格納し52枚のトランプを作成する
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
  }
  const trumps = document.querySelectorAll(".trump__front");
  trumps.forEach(function (trump, index) {
    trump.src = `../image/${trumpFront[index]}.png`;
  });
}
shuffle();
console.log(trumpFront);

// trumpBackがクリックされた後の処理
function playGame() {
  trumpBack.forEach((back, index) => {
    back.addEventListener("click", () => {
      function addActive() {
        if (turnOver.length < 2) {
          turnOver.push(trumpFront[index]);
          // クリックをしたカードに.activeを追加する
          back.classList.add("active");

          // クリックしたカードの数字を格納
          turnOverIndex.push(trumpFront[index].slice(-2));
          // めくったカードをtemporaryに格納
          temporary.push(trumpFront[index]);
          console.log(temporary);
        }
      }
      addActive();

      function compareCard() {
        // ２枚めくれる
        if (turnOverIndex.length === 2) {
          if (turnOverIndex[0] === turnOverIndex[1]) {
            playerCount++;
            // pairにtemporary（めくったカード）の最後から２つの配列を追加してカードを比較
            pair.push(temporary.slice(-2));
            pair.forEach((pair) => {
              trumpFront.forEach((front, index) => {
                if (front === pair[0] || front === pair[1]) {
                  // 数字が同じだったら.get-pairを付与
                  trumpBack[index].classList.add("get-pair");
                }
              });
            });

            // トランプをめくれるように初期化
            turnOver.length = 0;
            turnOverIndex.length = 0;
            // めくった回数をカウント
            document.getElementById("player-count").textContent = `${playerCount}`;
          } else if (turnOverIndex[0] !== turnOverIndex[1]) {
            // トランプの数字が違った時の処理 activeを外して、3秒後に取得したペアを半透明にする
            setTimeout(() => {
              removeActive();
            }, 3000);

            setTimeout(() => {
              opaque();
            }, 3000);
          }
        }
      }
      compareCard();

      // 一致したカードを半透明にする
      function opaque() {
        pair.forEach((pair) => {
          trumpFront.forEach((front, index) => {
            if (front === pair[0] || front === pair[1]) {
              frontCardImages[index].classList.add("get-pair-opaque");
            }
          });
        });
      }

      function removeActive() {
        trumpBack.forEach((back) => {
          back.classList.remove("active");
          // トランプをめくれるように初期化
          turnOver.length = 0;
          turnOverIndex.length = 0;
        });
      }

      // ペアの数をカウント
      function count() {
        let turnCount = 0;
        turnCount = Math.floor(temporary.length / 2);
        if (turnCount > 0) {
          document.getElementById("count").textContent = `${turnCount}`;
        }
      }
      count();
      // 全てのカードをめくったら終了を表示
      if (playerCount === 26) {
        document.getElementById("result").textContent = "終了です！";
      }
    });
  });
}
playGame();

// リセットボタンを押したら全て初期化する
document.getElementById("reset").addEventListener("click", () => {
  trumpBack.forEach((back) => {
    back.classList.remove("active");
    back.classList.remove("get-pair");
  });

  frontCardImages.forEach((front) => {
    front.classList.remove("get-pair-opaque");
  });

  playerCount = 0;
  document.getElementById("player-count").textContent = `${playerCount}`;
  document.getElementById("count").textContent = "0";
  document.getElementById("result").textContent = "";

  let deleteTrump = document.querySelectorAll(".trump__set");
  deleteTrump.forEach((trump) => {
    trump.remove();
  });

  turnOver = [];
  frontCard = [];
  frontCardImages = [];
  turnOverIndex = [];
  playerCount = 0;
  temporary = [];
  pair = [];
  trumpFront = [];
  trumpBack = [];

  createTrump();
  shuffle();
  playGame();
});
