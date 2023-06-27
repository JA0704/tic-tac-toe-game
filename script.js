const selectBox = document.querySelector('.select-box'),
  selectXBtn = selectBox.querySelector('.playerX'),
  selectOBtn = selectBox.querySelector('.playerO'),
  playBoard = document.querySelector('.play-board'),
  allBox = document.querySelectorAll('section span'),
  players = document.querySelector('.players'),
  resultBox = document.querySelector('.result-box'),
  wonText = resultBox.querySelector('.won-text'),
  replayBtn = resultBox.querySelector('button');

window.onload = () => {
  for (let i = 0; i < allBox.length; i++) {
    allBox[i].setAttribute('onclick', 'clickedBox(this)')
  }

  selectXBtn.onclick = () => {
    selectBox.classList.add('hide')
    playBoard.classList.add('show')
  }
  selectOBtn.onclick = () => {
    selectBox.classList.add('hide')
    playBoard.classList.add('show')
    players.setAttribute('class', 'players active player')
  }
}

let playerXIcon = 'close'
let playerOIcon = 'radio_button_unchecked'
let playerSign = 'X'
let runBot = true

function clickedBox(e) {
  if (players.classList.contains('player')) {
    e.innerHTML = `<i class="material-symbols-outlined">${playerOIcon}</i>`
    players.classList.add('active')
    playerSign = 'O'
    e.setAttribute('id', playerSign)
  } else {
    e.innerHTML = `<i class="material-symbols-outlined">${playerXIcon}</i>`
    players.classList.add('active')
    e.setAttribute('id', playerSign)
  }
  selectWinner()
  playBoard.style.pointerEvents = 'none'
  e.style.pointerEvents = 'none'
  let randomDelayTime = ((Math.random() * 1000) + 100).toFixed()
  setTimeout(() => {
    bot(runBot)
  }, randomDelayTime)
}

function bot(runBot) {
  if (runBot) {
    playerSign = 'O'
    let array = []
    for (let i = 0; i < allBox.length; i++) {
      if (allBox[i].childElementCount == 0) array.push(i);
    }
    let randomBox = array[Math.floor(Math.random() * array.length)]

    if (array.length > 0) {
      if (players.classList.contains('player')) {
        allBox[randomBox].innerHTML = `<i class="material-symbols-outlined">${playerXIcon}</i>`
        players.classList.remove('active')
        playerSign = 'X'
        allBox[randomBox].setAttribute('id', playerSign)
      } else {
        allBox[randomBox].innerHTML = `<i class="material-symbols-outlined">${playerOIcon}</i>`
        players.classList.remove('active')
        allBox[randomBox].setAttribute('id', playerSign)
      }
      selectWinner()
    }
    allBox[randomBox].style.pointerEvents = 'none'
    playBoard.style.pointerEvents = 'auto'
    playerSign = 'X'
  }
}
function getClass(idName) {
  return document.querySelector('.box' + idName).id
}
function checkClass(val1, val2, val3, sign) {
  const isGetClass = getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign
  if (isGetClass) return true
}
function selectWinner() {
  const isCheckClass = checkClass(1, 2, 3, playerSign) || checkClass(4, 5, 6, playerSign) || checkClass(7, 8, 9, playerSign) || checkClass(1, 4, 7, playerSign) || checkClass(2, 5, 8, playerSign) || checkClass(3, 6, 9, playerSign) || checkClass(1, 5, 9, playerSign) || checkClass(3, 5, 7, playerSign)

  if (isCheckClass) {
    runBot = false
    bot(runBot)
    setTimeout(() => {
      playBoard.classList.remove('show')
      resultBox.classList.add('show')
    }, 700);

    wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`
  } else {
    const isGetClass = getClass(1) != '' && getClass(2) != '' && getClass(3) != '' && getClass(4) != '' && getClass(5) != '' && getClass(6) != '' && getClass(7) != '' && getClass(8) != '' && getClass(9) != ''

    if (isGetClass) {
      runBot = false
      bot(runBot)
      setTimeout(() => {
        playBoard.classList.remove('show')
        resultBox.classList.add('show')
      }, 700);

      wonText.textContent = `Match has been drawn!`
    }
  }
}

replayBtn.onclick = () => {
  window.location.reload()
}