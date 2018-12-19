let currentSection = 0;
let isAnimating = false;
const bg = document.getElementById("slide");
const arrowLeft = document.getElementById("arrow-left");
const arrowRight = document.getElementById("arrow-right");
const become = document.getElementById("become");
const screenWidth = document.getElementById("container").clientWidth;
const bgLength = bg.clientWidth;
const sectionLength = roundNumber(bgLength / 8.5);
const step = {
  zero: [["WE ARE BREAKING OUR VOW OF SILENCE"], ["In January 2011, after a decade of digital, we opened the doors to our temple. Follow our eightfold path to digital enlightment here."]],
  one: [["TALENT IS GIVEN TRUE SKILL IS EARNED"], ["Step 1 out 8 on the path to digital enlightment"]],
  two: [["BE FLEXIBLE TO CHANGE AND STURDY IN CONVICTION"], ["Step 2 out 8 on the path to digital enlightment"]],
  three: [["USE MANY SKILLS YET WORK AS ONE"], ["Step 3 out 8 on the path to digital enlightment"]],
  four: [["TO MASTER ANYTHING FIND INTEREST IN EVERYTHING"], ["Step 4 out 8 on the path to digital enlightment"]],
  five: [["INDIVIDUA FLOURISH IF CULTURE AND WISDOM ARE SHARED"], ["Step 5 out 8 on the path to digital enlightment"]],
  six: [["TRAIN FOR PERFECTION BUT AIM FOR MORE"], ["Step 6 out 8 on the path to digital enlightment"]],
  seven: [["TAKE PRIDE IN YOUR WORK BUT DO NOT SEEK PRAISE"], ["Step 7 out 8 on the path to digital enlightment"]],
  eight: [["TEMPORARY SACRIFICE BRINGS LASTING RESULTS"], ["Step 8 out 8 on the path to digital enlightment"]],
}

arrowLeft.style.visibility = "hidden";
become.style.left = Math.ceil((screenWidth * 0.75) / 10) * 10 + "px";

let test = parseInt(become.style.left.replace("px", ""));
console.log(test);

function slide(dir) {
  let currentPos = parseInt(bg.style.left.replace("px", ""));
  const nextPos = dir == "left" ? currentPos + sectionLength : currentPos - sectionLength;
  let animate = setInterval(() => {
    move("right")
  }, 5)


  function move() {
    if (currentPos == nextPos) {
      if (currentSection == 9) {
        console.log("we are done here")
      }
      clearInterval(animate);
      if (dir == "left") currentSection--;
      if (dir == "right") currentSection++;
      if (currentSection == 0)
        arrowLeft.style.visibility = "hidden";
      else
        arrowLeft.style.visibility = "visible";
      if (currentSection == 9)
        arrowRight.style.visibility = "hidden";
      else
        arrowRight.style.visibility = "visible";
      console.log(currentSection);
    } else {
      if (dir == "left") {
        if (currentSection == 8) {
          currentPos = nextPos;
        } else {
          if (currentSection == 9) {
            if (isAnimating) {
              isAnimating = true;
              pushBecome();
            }
          }
          bg.style.left = currentPos + 10 + "px";
          currentPos = currentPos + 10;
        }
      }
      if (dir == "right") {
        if (currentSection == 7) {
          currentPos = nextPos;
        }
        else {
          bg.style.left = currentPos - 10 + "px";
          if (currentSection == 8) pullBecome();
          currentPos = currentPos - 10;
        }
      }
    }
  }
}

function roundNumber(v) {
  return Math.round(v / 10) * 10;
}

function pullBecome() {
  if (isAnimating) {
    let becomeWidth = test;
    let pullHandler = setInterval(() => {
      pull()
    }, 1000);

    function pull() {
      if (becomeWidth < 1) {
        clearInterval(pullHandler);
      } else {
        become.style.left = becomeWidth - 100 + "px";
        becomeWidth = becomeWidth - 100;
        console.log(become.style.left);
      }
    }
  }
}

function pushBecome() {
  let becomeWidth = test;
  let pushHandler = setInterval(() => {
    push()
  }, 1);

  function push() {
    if (becomeWidth > test) {
      clearInterval(pushHandler);
    } else {
      become.style.left = becomeWidth + (becomeWidth / 50) + "px";
      becomeWidth = becomeWidth + (becomeWidth / 50);
      console.log(becomeWidth);
    }
  }
}

// isanimating, pullbecome dicall terus terusan