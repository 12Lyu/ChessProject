let chessBoard = document.querySelector(".chess-board");
let coinTemplate = `<div class="coin" onclick="rotateF(this)">
<div class="coin-face"></div>
<div class="coin-back-face"></div> 
<div class="coin-tale">
   <div class="coin-top"></div>
  <div class="coin-bottom"></div>
 </div>
<div class="coin-tale rotate-1">
  <div class="coin-top"></div>
  <div class="coin-bottom"></div>
</div>
<div class="coin-tale rotate-2">
  <div class="coin-top"></div>
  <div class="coin-bottom"></div>
</div>
<div class="coin-tale rotate-3">
  <div class="coin-top"></div>
  <div class="coin-bottom"></div>
</div>
<div class="coin-tale rotate-4">
  <div class="coin-top"></div>
  <div class="coin-bottom"></div>
</div>
<div class="coin-tale rotate-5">
  <div class="coin-top"></div>
  <div class="coin-bottom"></div>
</div>
</div>`


for (let rowIndex = 0; rowIndex < 8; ++rowIndex) {
    let row = document.createElement("DIV");
    row.className = "chess-row";
    for(let colIndex = 0; colIndex < 8; ++colIndex) {
        let cell = document.createElement("DIV");
        cell.className = "chess-cell";
        cell.innerHTML = coinTemplate;
        row.append(cell);
    }
    chessBoard.append(row);
}

let state = 0x8000000000000000n;

for (let i = 0n; i < 64n; ++i) {
    let val = (state >> i) & 1n;
    if (val == 1) {
        let elem = document.querySelectorAll('.coin')[i];
        if (elem) {
            elem.classList.add('rotated-state');
        }
    }
}

function rotateF(elem)
{
  
  if (elem.classList.contains('rotated-state')) {
    elem.classList.add('back-rotated');
    elem.classList.remove('rotated');
  } else {
    elem.classList.remove('back-rotated');
    elem.classList.add('rotated');
  }

  setTimeout(() =>{
    elem.classList.remove('back-rotated');
    elem.classList.remove('rotated');
    elem.classList.toggle('rotated-state');
  }, 500)
}

let xAngle = 60;
let zAngle = 0;

// set the initial mouse position
let prevX = 0;
let prevY = 0;

// add event listeners to the board element
window.addEventListener('mousedown', (event) => {
  prevX = event.clientX;
  prevY = event.clientY;
});

window.addEventListener('mousemove', (event) => {
  if (event.buttons === 1) {
    // calculate the difference in mouse position from the previous position
    const diffX = -(event.clientX - prevX) / 2;
    const diffY = -(event.clientY - prevY) / 2;

    // update the previous mouse position
    prevX = event.clientX;
    prevY = event.clientY;

    // update the rotation angles based on the mouse movement
    zAngle += diffX;
    xAngle += diffY;

    // set the rotation transform on the board element
    chessBoard.style.transform = `rotateX(${xAngle}deg) rotateZ(${zAngle}deg)`;
  }
});

window.addEventListener('mouseup', () => {
  prevX = 0;
  prevY = 0;
});