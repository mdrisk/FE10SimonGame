var ai = [];
var player = [];
var playerTurn = false;
var index = 0;
var match = 00;
var correct = true;
var on = false;
var battery = document.getElementById('battery');
var modal = document.getElementById('winModal');
var score = document.getElementById("score");
var strict = false;

function touched(this_id) {
  if (on) {
    var item = document.getElementById(this_id);
    if (this_id == "leftTop") {
      item.setAttribute("class", "led-green touch");
      var audio = document.getElementById("audio2");
      audio.play();
      item.disabled = true;
      setTimeout(function() {
        item.setAttribute("class", "touch");
        item.disabled = false;
      }, 500);
      if (playerTurn) {
        player.push("leftTop");
        check();
      }
    } else if (this_id == "rightTop") {
      item.setAttribute("class", "led-red touch");
      var audio = document.getElementById("audio3");
      audio.play();
      item.disabled = true;
      setTimeout(function() {
        item.setAttribute("class", "touch");
        item.disabled = false;
      }, 500);
      if (playerTurn) {
        player.push("rightTop");
        check();
      }
    } else if (this_id == "rightBottom") {
      item.setAttribute("class", "led-blue touch");
      var audio = document.getElementById("audio4");
      audio.play();
      item.disabled = true;
      setTimeout(function() {
        item.setAttribute("class", "touch");
        item.disabled = false;
      }, 500);
      if (playerTurn) {
        player.push("rightBottom");
        check();
      }
    } else if (this_id == "leftBottom") {
      item.setAttribute("class", "led-yellow touch");
      item.disabled = true;
      var audio = document.getElementById("audio1");
      audio.play();
      setTimeout(function() {
        item.setAttribute("class", "touch");
        item.disabled = false;
      }, 500);
      if (playerTurn) {
        player.push("leftBottom");
        check();
      }
    } else if (this_id == "ctr_mid_ctr") {
      newGame();
    }
  }
  if (this_id == "ctr_bottom") {
    if (!on) {
      on = true;
      battery.innerHTML = "On";
    } else {
      on = false;
      battery.innerHTML = "Off";
    }
  }
}

function replay() {
  index = 0;
  slowLoop();
}

function slowLoop() {
  touched(ai[index]);
  index += 1;
  if (index < ai.length)
    setTimeout(slowLoop, 1000);
  else
    playerTurn = true;
}

function strIndicator() {
  var indicator = document.getElementById("strictIndicator");
  if (!strict) {
    strict = true;
    indicator.setAttribute("class", "button-red-lit")
  } else {
    strict = false;
    indicator.setAttribute("class", "button-red-unlit")
  }
  reset();
}

function reset() {
  var id = window.setTimeout(function() {}, 0);
  while (id--) {
    window.clearTimeout(id);
  }
  modal.style.display = "none";
  ai = [];
  match = 00;
  score.innerHTML = match;
  playerTurn = false;
  endplayer = true;
}

function newGame() {
  reset();
  setTimeout(function() {
    start();
  }, 2500);
}

function start() {
  player = [];
  var selection = Math.floor(Math.random() * 4) + 1
  if (selection == 1)
    ai.push("leftTop");
  else if (selection == 2)
    ai.push("rightTop");
  else if (selection == 3)
    ai.push("rightBottom");
  else if (selection == 4)
    ai.push("leftBottom");
  replay();
}

function check() {
  for (var k = 0; k < player.length; k++) {
    if (ai[k] != player[k]) {
      console.log("No match");
      correct = false;
    }
  }
  if (player.length == ai.length && correct) {
    match += 1;
    score.innerHTML = match;
    if (match < 21) {
      playerTurn = false;
      endplayer = true;
      setTimeout(function() {
        start();
      }, 2500);
    } else {
      winPopUp();
    }
  } else if (!correct) {
    correct = true;
    player = [];
    playerTurn = false;
    var audio = document.getElementById("audio5");
    audio.play();
    if (strict) {
      ai = [];
      match = 00;
      score.innerHTML = match;
      setTimeout(function() {
        start();
      }, 2500);
    } else {
      setTimeout(function() {
        replay();
      }, 2500);
    }
  }
}


var span = document.getElementsByClassName("close")[0];

function winPopUp() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
function closeWindow() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
