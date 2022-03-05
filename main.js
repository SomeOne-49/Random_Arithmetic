const body = document.body;
const launcher = document.querySelector(".launcher");
const slideOut = document.querySelectorAll(".launcher span");

window.addEventListener("load", () => {
  slideOut.forEach((e) => {
    e.classList.add("slide-out");
  });
  setInterval(() => {
    launcher.style.opacity = `0`;
  }, 700);
  setInterval(() => {
    // I put this layout here to keep the launcher's cute effect
    launcher.style.zIndex = `-1`;
  }, 1000);
});

const login = document.querySelector(".login"),
  name = document.querySelector(".login input"),
  img = document.querySelectorAll(".login .avatar img"),
  start = document.querySelector(".login button");

let avatar;

img.forEach((e) => {
  e.onclick = () => {
    img.forEach((el) => {
      el.classList.remove("active");
      e.classList.add("active");
    });
    avatar = e.getAttribute("src");
  };
});

start.onclick = function () {
  if (name.value != "") {
    if (avatar != undefined) {
      login.style.opacity = "0";
      login.style.zIndex = "-1";
      body.classList.add("hidden");
      document.querySelector(".user img ").src = avatar;
      document.querySelector(".user span").textContent = name.value;
    } else alert("Please Choose your avatar...");
  } else alert("Please enter your name...");
};

const open = document.querySelector(".open");
const settings = document.querySelector(".settings");
const close = document.querySelector(".close");

open.onclick = opFun;

close.onclick = function () {
  body.classList.remove("blur");
  settings.style.transform = "scale(0)";
  settings.style.opacity = "0";
};

const question = document.querySelector(".question"),
  create = document.querySelector(".create"),
  check = document.querySelector(".check"),
  tips = document.querySelector(".tips"),
  good = document.querySelector(".good"),
  bad = document.querySelector(".bad"),
  correct = document.querySelector(".correct"),
  wrong = document.querySelector(".wrong"),
  numr = document.querySelectorAll(".num");
let type,
  answer,
  wro = [],
  cor = [];

create.onclick = function () {
  question.innerHTML = "";
  tips.innerHTML = "";
  type = document.querySelectorAll(".settings .type input:checked");
  type.length != 0
    ? createEl()
    : (alert(`Select type of Operations...`), opFun());
  answer = document.querySelector(".question input");
};

function opFun() {
  body.classList.add("blur");
  settings.style.transform = "scale(1)";
  settings.style.opacity = "1";
}

function limit(li) {
  return Math.ceil(Math.random() * li);
}

function numNumbere(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function calculate() {
  return Math.floor(Math.random() * type.length);
}

function test() {
  if (isNaN(+answer.value)) {
    alert("Please enter a number...");
    answer.value = "";
  }
}

function createEl() {
  let length = numNumbere(1, 3);
  for (let i = 0; i <= length; i++) {
    let num = document.createElement("span");
    num.className = "num";
    num.textContent = limit(15);
    question.appendChild(num);

    if (i < length) {
      let calc = document.createElement("i");
      calc.classList.add("fa-solid", type[calculate()].id, "Calculation");
      calc.setAttribute("data-type", data());
      function data() {
        if (calc.classList.contains("fa-plus")) {
          return "+";
        } else if (calc.classList.contains("fa-divide")) {
          return "/";
        } else if (calc.classList.contains("fa-xmark")) {
          return "*";
        } else {
          return "-";
        }
      }
      question.appendChild(calc);
    }

    if (i == length) {
      let equal = document.createElement("i");
      equal.classList.add("fa-solid", "fa-equals", "Calculation");
      question.appendChild(equal);

      let result = document.createElement("input");
      result.classList.add("result");
      result.setAttribute("maxlength", "3");
      question.appendChild(result);
      result.focus();
      result.oninput = test;
    }
  }
}

check.onclick = cHeck;
function cHeck() {
  if (answer.value != "") {
    tips.innerHTML = "";
    let nums = document.querySelectorAll(".question span"),
      arr = [];
    nums.forEach((e) => {
      arr.push(e.textContent, e.nextElementSibling.getAttribute("data-type"));
    });

    let total = math.evaluate(arr.join(" ")).toFixed(),
      tip = document.createElement("p");
    tip.className = "tip";
    tips.append(tip);
    if (answer.value != total) {
      bad.play();
      wrong.innerHTML = "";
      tip.textContent = "🤕 Please Try Again 🤕";
      addAnswer(arr, wro, wrong);
      numr[1].textContent = wrong.childElementCount;
    } else {
      good.play();
      correct.innerHTML = "";
      tip.textContent = "🥳 Your answer is correct 👏";
      addAnswer(arr, cor, correct);
      numr[0].textContent = correct.childElementCount;
    }
  } else alert("Please Type Your Answer...");
}

function addAnswer(arr, newArr, parent) {
  newArr.push(`${arr.join(" ")} = ${answer.value}`);
  ans = getUnique(newArr);
  ans.forEach((e) => {
    let span = document.createElement("span");
    span.textContent = e;
    parent.append(span);
  });
}
function getUnique(arr) {
  let unique = [];
  for (let val of arr) {
    if (unique.indexOf(val) === -1) {
      unique.push(val);
    }
  }
  return unique;
}
