import { newElement } from '../../src/modules/dom.mjs';

const MAP_WIDTH = 16;
const MAP_HEIGHT = MAP_WIDTH ;


let map = [];

export function generateMap() {

  for (let y = 0; y < MAP_HEIGHT; y++) {
    map[y] = [];
    for (let x = 0; x < MAP_WIDTH; x++) {
      map[y][x] = " ";
    }
  }


  for (let x = 0; x < MAP_WIDTH; x++) {
    map[0][x] = "#"; 
    map[MAP_HEIGHT - 1][x] = "#"; 
  }
  for (let y = 0; y < MAP_HEIGHT; y++) {
    map[y][0] = "#";
    map[y][MAP_WIDTH - 1] = "#";
  }


  for (let y = 2; y < MAP_HEIGHT - 1; y += 2) {
    for (let x = 2; x < MAP_WIDTH - 1; x += 2) {
      if (Math.random() < 0.5) {
        let bonus = Math.random()
        if (bonus<0.15) {
          map[y][x] = "B speed";
          // (map[y][x]).classList.add("bonusspeed")
          // (map[y][x]).style.backgroundImage= "url(../public/assets/bonusspeed.png)";
        } else if (bonus>0.15 && bonus<0.3){
          map[y][x] = "B flames";
          // (map[y][x]).classList.add("bonusflames")
          // (map[y][x]).style.backgroundImage= "url(../public/assets/bonusflames.png)";
        } else if (bonus>0.3 && bonus<0.45) {
          map[y][x] = "B bombs";
          // (map[y][x]).classList.add("bonusbombs")
          // (map[y][x]).style.backgroundImage= "url(../public/assets/bonusbombs.png)";
        } else {
         map[y][x] = "B";
        }
      }
    }
  }

  map[1][1] = "P1";
  map[1][MAP_WIDTH - 2] = "P2"; 
  map[MAP_HEIGHT - 2][1] = "P3";
  map[MAP_HEIGHT - 2][MAP_WIDTH - 2] = "P4";


  const centerX = Math.floor(MAP_WIDTH / 2);
  const centerY = Math.floor(MAP_HEIGHT / 2);

  map[centerY][centerX] = "#";
  if( centerX-7 >0 && centerY-7>0) {

    map[centerX-3][centerY-3] = "#"
    map[centerX+2][centerY+2] = "#"
    map[centerX+3][centerY+3] = "#"
    map[centerX+2][centerY+2] = "#"
    map[centerX-4][centerY-4] = "#"

    map[centerX+3][centerY-4] = "#"
    map[centerX+2][centerY-3] = "#"
    map[centerX-4][centerY+3] = "#"
    map[centerX-3][centerY+2] = "#"

    map[centerX+3][centerY-3] = "#"
    map[centerX-3][centerY+3] = "#"
    map[centerX+3][centerY] = "#"
    map[centerX+3][centerY-1] = "#"
    map[centerX+3][centerY+2] = "#"
    map[centerX][centerY-4] = "#"
    map[centerX-1][centerY-4] = "#"

    map[centerX][centerY+3]= "#"
    map[centerX-1][centerY+3]= "#"

    map[centerX-4][centerY]= "#"
    map[centerX-4][centerY-1]= "#"

    map[centerX-3][centerY-4] = "#"

    map[centerX-6][centerY+1] = "#"
    map[centerX-6][centerY+2] = "#"
    map[centerX-6][centerY-2] = "#"
    map[centerX-6][centerY-3] = "#"

    map[centerX-6][centerY-6] = "#"
    map[centerX-5][centerY-6] = "#"
    map[centerX+5][centerY-2] = "#"
    map[centerX+5][centerY-3] = "#"

    map[centerX+5][centerY+1] = "#"
    map[centerX+5][centerY+2] = "#"
    map[centerX+5][centerY+5] = "#"
    map[centerX+4][centerY+5] = "#"


    map[centerX-6][centerY+5] = "#"
    map[centerX-5][centerY+5] = "#"
    map[centerX][centerY+5] = "#"
    map[centerX-1][centerY+5] = "#"

    map[centerX][centerY-6] = "#"
    map[centerX-1][centerY-6] = "#"
    
    map[centerX+5][centerY-6] = "#"
    map[centerX+4][centerY-6] = "#"
    
  }

  if (MAP_WIDTH % 2 === 0 && MAP_HEIGHT % 2 === 0) {
    map[centerY][centerX-1] = "#";
    map[centerY-1][centerX-1] = "#";
    map[centerY-1][centerX] = "#";
  }
}

let mapCells = [];

export function displayMap() {
  const mapContainer = newElement({
    tag: 'div',
    attrs: {
      id: 'map-container',
      style: '--map-width: ' + MAP_WIDTH
    }
  });

  // Initialiser mapCells comme un tableau vide
  mapCells = [];

  for (let y = 0; y < MAP_HEIGHT; y++) {
    const row = [];

    for (let x = 0; x < MAP_WIDTH; x++) {
      const cell = createBoardCell(map[y][x]);
      mapContainer.appendChild(cell);

      // Stocker une référence à la cellule dans le tableau mapCells
      row.push(cell);
    }

    // Ajouter la ligne à mapCells
    mapCells.push(row);

    mapContainer.appendChild(document.createElement("br"));
  }

  document.body.appendChild(mapContainer);
}

function createBoardCell(type) {
  const cell = newElement({
     tag: 'div',
     attrs: {
       class: "map-cell"
     }
  });
  
  // console.log(type);
  if (type === '#') {
     cell.classList.add("wall");
     cell.style.backgroundImage = "url(../public/assets/brick1.png)";
  } else if (type === 'B bombs'){
    // console.log('bombs');
    cell.classList.add("block")
    cell.classList.add("bombs")
    cell.style.backgroundImage= "url(../public/assets/bonusbombs.png)";
  }else if (type === 'B flames'){
    // console.log('flames')
    cell.classList.add("block")
    cell.classList.add("flames")
    cell.style.backgroundImage= "url(../public/assets/bonusflames.png)";
  
  }else if (type === 'B speed'){
    // console.log('speed');
    cell.classList.add("block")
    cell.classList.add("speed")
    cell.style.backgroundImage= "url(../public/assets/bonuspeed.png)";
  } else if ((type === 'P1') || type === 'P2' || type === 'P3' || type === 'P4') {
    //  cell.appendChild(document.createTextNode(type));
     cell.classList.add("player");
     cell.classList.add(type);
     cell.style.backgroundImage = `url(../public/assets/${type}.png)`
     cell.style.zIndex = 999
  } else if (type === 'B') {
     cell.style.backgroundImage = "url(../public/assets/breakablebrick.png)"
     cell.classList.add("block");
    //  console.log("b");
     cell.style.backgroundImage= "url(../public/assets/breakablebrick.png)";
  } else if (type === "Bombplaced") {
    // console.log('c bien');
    cell.style.backgroundImage = "url(../public/assets/bombexplosion.png)";
    cell.classList.add("Bombplaced")
  }
 
  return cell;
 }

 function movePlayer(playerInfo, direction) {
  let playerPosition = null;
  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      if (map[y][x] === playerInfo) {
        playerPosition = { x, y };
        break;
      }
    }
    if (playerPosition) break;
  }

  if (!playerPosition) {
    console.error(`Player ${playerInfo} not found.`);
    return;
  }

  let newX = playerPosition.x;
  let newY = playerPosition.y;
  switch (direction) {
    case 'up':
      newY -= 1;
      break;
    case 'down':
      newY += 1;
      break;
    case 'left':
      newX -= 1;
      break;
    case 'right':
      newX += 1;
      break;
    default:
      console.error(`Invalid direction: ${direction}`);
      return;
  }

  const targetCell = map[newY][newX];
  if (targetCell === '#' || targetCell.includes('B') || targetCell.includes('P') || targetCell === 'Bombplaced') {
    console.log(`Cannot move ${playerInfo}`);
    return;
  }

  if (targetCell === 'Bombplaced') {
    console.log(`Cannot move ${playerInfo} into a bomb.`);
    return;
  }

  map[playerPosition.y][playerPosition.x] = ' ';
  map[newY][newX] = playerInfo;

  updateDisplay();
}



 function updateDisplay() {
  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      const cell = mapCells[y][x];
      const newType = map[y][x];
      if (cell.dataset.type !== newType) {
        cell.dataset.type = newType;
        updateCell(cell, newType);
      }
    }
  }
}

let explodetimer = 5000

function updateCell(cell, type) {
  cell.classList.remove('wall', 'block', 'player'); 
  cell.style.backgroundImage = '';
  switch (type) {
    case '#':
      cell.classList.add('wall');
      cell.style.backgroundImage = "url(../public/assets/brick1.png)";
      break;
    case 'B bombs':
      cell.classList.add('block', 'bombs');
      cell.style.backgroundImage = "url(../public/assets/bonusbombs.png)";
      break;
    case 'B flames':
      cell.classList.add('block', 'flames');
      cell.style.backgroundImage = "url(../public/assets/bonusflames.png)";
      break;
    case 'B speed':
      cell.classList.add('block', 'speed');
      cell.style.backgroundImage = "url(../public/assets/bonuspeed.png)";
      break;
    case 'P1':
    case 'P2':
    case 'P3':
    case 'P4':
      cell.classList.add('player');
      cell.style.backgroundImage = `url(../public/assets/${type}.png)`;
      break;
    case 'B':
      cell.classList.add('block');
      cell.style.backgroundImage = "url(../public/assets/breakablebrick.png)";
      break;
    case 'Bombplaced':
      cell.classList.add('Bombplaced')
      setTimeout(function() {
        cell.classList.remove('Bombplaced')
      }, explodetimer);
    default:
      break;
  }
}

 export function handleKeyDown(event) {
  const playerId = 'P1';
  let direction = '';
 
  switch (event.key) {
     case 'ArrowUp':
       direction = 'up';
       break;
     case 'ArrowDown':
       direction = 'down';
       break;
     case 'ArrowLeft':
       direction = 'left';
       break;
     case 'ArrowRight':
       direction = 'right';
       break;
      case ' ':
        placeBomb(playerId);
        return;
     default:
       return;
  }
 
  movePlayer(playerId, direction);
 }
 

let bonusBombsActive = false;
// let bonusBombsTimer = null;
let playerBombs = {}; 


function placeBomb(playerInfo) {
  let playerPosition = null;
  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      if (map[y][x] === playerInfo) {
        playerPosition = { x, y };
        break;
      }
    }
    if (playerPosition) break;
  }

  if (!playerPosition) {
    console.error(`Player ${playerInfo} not found on the map.`);
    return;
  }

  const bombX = playerPosition.x;
  const bombY = playerPosition.y;

  if (bonusBombsActive && playerBombs[playerInfo]?.length >= 3) {
    console.log(`Player ${playerInfo} can only place 3 bombs at a time.`);
    return;
  }


  map[bombY][bombX] = 'Bombplaced';

  if (!playerBombs[playerInfo]) {
    playerBombs[playerInfo] = [];
  }

  playerBombs[playerInfo].push({ x: bombX, y: bombY });

  updateDisplay();

  map[playerPosition.y][playerPosition.x] = playerInfo;

  setTimeout(function () {
    explodeBomb(bombX, bombY);
    map[bombX][bombY] = "";
    playerBombs[playerInfo] = [];
  }, explodetimer);
  return true;
}


function explodeBomb(bombX, bombY) {
  destroyCell(bombX, bombY - 1);
  destroyCell(bombX, bombY + 1);
  destroyCell(bombX, bombY);
  destroyCell(bombX - 1, bombY);
  destroyCell(bombX + 1, bombY);

  map[bombY][bombX] = '';
  updateDisplay();

  // if ((map[bombY][bombX] === 'B bombs') || (map[bombY-1][bombX] === 'B bombs') || (map[bombY][bombX-1] === 'B bombs') ||( map[bombY+1][bombX] === 'B bombs') || (map[bombY][bombX+1] === 'B bombs')) {
  //   console.log('bonus bombs');
  //   activateBonusBombs();
  // }
}



// function activateBonusBombs() {
//   bonusBombsActive = true;
//   bonusBombsTimer = setTimeout(function () {
//     bonusBombsActive = false;
//     clearTimeout(bonusBombsTimer);
//   }, 15000);
// }

function destroyCell(x, y) {
  if (x < 0 || x >= MAP_WIDTH || y < 0 || y >= MAP_HEIGHT) {
    return;
  } if (map[y][x] != '#') {
    map[y][x] = '';
  }
}