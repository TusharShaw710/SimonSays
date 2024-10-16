let gameseq = [];
let userseq = [];
let box = ["red", "green", "yellow", "blue"];
let h2 = document.querySelector("h2");

let maxlevel = 0;
let level = 0;
let start = false;

document.addEventListener("keypress", function (event) {
  if (start == false) {
    levelup();
    start = true;
  }
});

function levelup() {
  userseq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randomidx = Math.floor(Math.random() * 4);
  let randcolor = box[randomidx];
  gameflash(randcolor);
}

function gameflash(idx) {
  let inp = document.querySelector(`#${idx}`);
  inp.classList.add("flash");
  setTimeout(function () {
    inp.classList.remove("flash");
  }, 250);
  gameseq.push(idx);
  console.log(gameseq);
}

function userflash(idx) {
  let inp = document.querySelector(`#${idx}`);
  inp.classList.add("userflash");
  setTimeout(function () {
    inp.classList.remove("userflash");
  }, 250);
}

function btnpress() {
  let btn = this.id;
  userflash(btn);
  userseq.push(btn);
  let idx = userseq.length - 1;
  checkAns(idx);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
  btn.addEventListener("click", btnpress);
}

function checkAns(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length == gameseq.length) {
      setTimeout(function () {
        levelup();
      }, 1000); 
    }
  } else {
    let body = document.querySelector("body");
    body.classList.add("bodyflash");
    setTimeout(function () {
      body.classList.remove("bodyflash");
    }, 250);

    h2.innerHTML = `Game over! Your score is ${level}! <br> Please try again by pressing any key`;
    start = false;
    if (level > maxlevel) {
      maxlevel = level;
    }
    let max = document.querySelector(".maxscore");
    max.innerText = `Max score - ${maxlevel}`;

    
    level = 0;
    userseq = [];
    gameseq = [];
  }
}
