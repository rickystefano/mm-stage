let becomeWidthHelper;
let currentSection = 0;
let isAnimating = false;
const bg = document.getElementById("slide");
const arrowLeft = document.getElementById("arrow-left");
const arrowRight = document.getElementById("arrow-right");
const become = document.getElementById("become");
const navigators = document.getElementsByClassName("nav-item");
const screenWidth = document.getElementById("container").clientWidth;
const bgLength = bg.clientWidth;
const sectionLength = roundNumber(bgLength / 8.5);

const step = {
  zero: {
    text: "WE ARE BREAKING OUR VOW OF SILENCE",
    subtext: "In January 2011, after a decade of digital, we opened the doors to our temple. Follow our eightfold path to digital enlightment here.",
    className: "zero"
  },
  one: {
    text: "TALENT IS GIVEN TRUE SKILL IS EARNED",
    subtext: "Step 1 out 8 on the path to digital enlightment",
    className: "one"
  },
  two: {
    text: "BE FLEXIBLE TO CHANGE AND STURDY IN CONVICTION",
    subtext: "Step 2 out 8 on the path to digital enlightment",
    className: "two"
  },
  three: {
    text:"USE MANY SKILLS YET WORK AS ONE",
    subtext:"Step 3 out 8 on the path to digital enlightment",
    className: "three"
  },
  four: {
    text:"TO MASTER ANYTHING FIND INTEREST IN EVERYTHING",
    subtext:"Step 4 out 8 on the path to digital enlightment",
    className: "four"
  },
  five: {
    text:"INDIVIDUA FLOURISH IF CULTURE AND WISDOM ARE SHARED",
    subtext:"Step 5 out 8 on the path to digital enlightment",
    className: "five"
  },
  six: {
    text:"TRAIN FOR PERFECTION BUT AIM FOR MORE",
    subtext:"Step 6 out 8 on the path to digital enlightment",
    className: "six"
  },
  seven: {
    text:"TAKE PRIDE IN YOUR WORK BUT DO NOT SEEK PRAISE",
    subtext:"Step 7 out 8 on the path to digital enlightment",
    className: "seven"
  },
  eight: {
    text:"TEMPORARY SACRIFICE BRINGS LASTING RESULTS",
    subtext:"Step 8 out 8 on the path to digital enlightment",
    className: "eight"
  }
}

let state = step[Object.keys(step)[currentSection]];

document.addEventListener("DOMContentLoaded", () => {
  arrowLeft.style.visibility = "hidden";
  become.style.left = Math.ceil((screenWidth * 0.75) / 10) * 10 + "px";
  becomeWidthHelper = parseInt(become.style.left.replace("px", ""));

  
})


for (let i = 0; i < navigators.length; i++) {
  navigators[i].addEventListener("click", () => {
    const index = parseInt(navigators[i].getAttribute("data-section"));
    if (navigators[i] != currentSection) {
      slide(null, currentSection, index);
    } 
  }, false);
}


function slide(dir=null, ori=null, tar=null) {
  let becomeWidth = becomeWidthHelper;
  let currentPos = parseInt(bg.style.left.replace("px", ""));
  let nextPos;
  
  if(dir == "left") {
    nextPos = currentPos + sectionLength;
  } else if(dir == "right") {
    nextPos = currentPos - sectionLength;
  } else if(ori > tar) {
    nextPos = currentPos + (sectionLength* (ori - tar));
  } else if(ori < tar) {
    nextPos = currentPos - (sectionLength * (tar - ori));
  }

  let animate = setInterval(() => {
    move()
  }, 5)



  function move() {
    if (currentPos == nextPos) {
      if (currentSection == 9) {
        console.log("we are done here")
      }
      clearInterval(animate);

      if (dir != null) {
        navigators[currentSection].classList.remove("nav-active");
        if (dir == "left") currentSection--;
        if (dir == "right") currentSection++;
        navigators[currentSection].classList.add("nav-active");
      } else {
        currentSection = tar;
        navigators[ori].classList.remove("nav-active");
        navigators[tar].classList.add("nav-active");
        // console.log(currentSection);
      }

      if (currentSection == 0) {
        arrowLeft.style.visibility = "hidden";
      } 
      else{
        arrowLeft.style.visibility = "visible";
      }
      if (currentSection == 9){
        arrowRight.style.visibility = "hidden";
      }
      else{
        arrowRight.style.visibility = "visible";
      }
    } else{
      if (dir == "left") {
        if (currentSection == 8) {
          currentPos = nextPos;
        } else {
          if (currentSection == 9) {
            let pushHandler = setInterval(() => {
              push()
            }, 15);

            function push() {
              if (becomeWidth > becomeWidthHelper) {
                clearInterval(pushHandler);
              } else {
                become.style.left = becomeWidth + (becomeWidth / 50) + "px";
                becomeWidth = becomeWidth + (becomeWidth / 50);
                console.log(becomeWidth);
              }
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
          if (currentSection == 8) {
            let pullHandler = setInterval(() => {
              pull()
            }, 500);
            
            function pull() {
              if (becomeWidth < 1) {
                clearInterval(pullHandler);
              } else {
                become.style.left = becomeWidth - (becomeWidth / 20) + "px";
                becomeWidth = becomeWidth - (becomeWidth / 20);
                console.log(becomeWidth, become.style.left);
              }
            }
          }
          bg.style.left = currentPos - 10 + "px";
          currentPos = currentPos - 10;
        }
      }
      if (ori > tar) {
        bg.style.left = currentPos + 10 + "px";
        currentPos = currentPos + 10;
      }
      if (ori < tar) {
        console.log(ori, tar);
        if (tar == 8) {
          if(ori == 7) {
            currentPos == nextPos;
          }
          else {
            nextPos = nextPos - sectionLength;
          }
        } else {
          bg.style.left = currentPos - 10 + "px";
          currentPos = currentPos - 10;
        }
      }
    }
  }
}

function roundNumber(v) {
  return Math.round(v / 10) * 10;
}