// Rover Object Goes Here
// ======================
const roverOne = {
  name: "roverOne",
  direction: "N",
  y: 0,
  x: 0,
  travelLog: []
}

const roverTwo = {
  name: "roverTwo",
  direction: "N",
  y: 3,
  x: 5,
  travelLog: []
}


// Grid Object
var row = [, , , , , , , , , ,];
const grid = {
  area: [[...row],[...row],[...row],[...row],[...row],
        [...row],[...row],[...row],[...row],[...row]],
  yMin: 0,
  xMin: 0,      
  yMax: 9,
  xMax: 9,
  checkPosition(yNew,xNew){ 
    if (yNew < this.yMin || yNew > this.yMax || xNew < this.xMin  || xNew > this.xMax) {
    return console.log("you bumped against the wall");
   } else if (grid.area[yNew][xNew]) {
    return console.log("You bumped into my rover!") ;
   } else {
    return true;
     }
}
}


// place the rovers on the grid area
grid.area[0][0] = roverOne.name;
grid.area[3][5] = roverTwo.name;

// ======================
function turnLeft(rover){
  console.log("turnLeft was called!");
  switch (rover.direction) {
    case "N":
    rover.direction = "W";
    imgTransform.style.transform = "rotate(-90deg)";
    break;
    case "E":
    rover.direction = "N";
    imgTransform.style.transform = "rotate(0deg)";
    break;
    case "S":
    rover.direction = "E";
    imgTransform.style.transform = "rotate(90deg)"; 
    break;
    case "W":
    rover.direction = "S";
    imgTransform.style.transform = "rotate(180deg)";
    break;
    default: rover.direction = "N";
    break;
  }
}

function turnRight(rover){
  console.log("turnRight was called!");
  let imgTransform = document.getElementById(`${rover.y}${rover.x}`).firstChild
  switch (rover.direction) {
    case "N":
    rover.direction = "E";
    imgTransform.style.transform = "rotate(90deg)"; 
    break;
    case "E":
    rover.direction = "S";
    imgTransform.style.transform = "rotate(180deg)"
    break;
    case "S":
    rover.direction = "W";
    imgTransform.style.transform = "rotate(-90deg)"
    break;
    case "W":
    rover.direction = "N";
    imgTransform.style.transform = "rotate(0deg)"
    break;
    default: rover.direction = "N";
    break;
  } 
}

function moveForward(rover){
  console.log("moveForward was called");
    let xNew = rover.x;
    let yNew = rover.y;
    switch (rover.direction) {
    case "N":
    yNew--
    break;
    case "E":
    console.log
    xNew ++;
    break;
    case "S":
    yNew ++;
    break;
    case "W":
    xNew --;
    break;
    default:
    console.log("Erorrrrr....No valid direction") ;
   } if (grid.checkPosition(yNew, xNew) === true) {
     grid.area[rover.y][rover.x] = null;
     grid.area[yNew][xNew] = rover.name;
     rover.x = xNew;
     rover.y = yNew;
     return updateTable();     
     } else {
       return grid.checkPosition;
     }
}
   
function moveBackward(rover){
  console.log("moveBackward was called");
    let xNew = rover.x;
    let yNew = rover.y;
    switch (rover.direction) {
    case "N":
    yNew ++;
    break;
    case "E":
    xNew --;
    break;
    case "S":
    yNew --;
    break;
    case "W":
    xNew ++;
    break;
    default:
    console.log("Erorrrrr....No valid direction") ;
  } if (grid.checkPosition(yNew, xNew) === true) {
    grid.area[rover.y][rover.x] = null;
    grid.area[yNew][xNew] = rover.name;
    rover.x = xNew;
    rover.y = yNew;
    return updateTable();
    } else {
      return grid.checkPosition;
    }
}

function travel(rover,string){
  console.log(`Hi it's me, ${rover.name}. I'm now at position ${[rover.y, rover.x]}`)
  for (i = 0; i < string.length; i++) {
    let previousPosition = [rover.y, rover.x]
    switch(string[i]) {
      case "f":
      moveForward(rover);
      rover.travelLog.push(previousPosition);
      break;
      case "b":
      moveBackward(rover);
      rover.travelLog.push(previousPosition);
      break;
      case "r":
      turnRight(rover);
      break;
      case "l":
      turnLeft(rover);
      break;
      default:
      return `I don't know the command ${string[i]}, I will stay here at ${[rover.y, rover.x]}`
    }
  } 
  return console.log(`My travel has ended at position ${[rover.y, rover.x]} `)
}


function updateTable() {
let gridarea = "<table border='1|1'><h1>Move on Mars</h1>";
for (let y = 0; y < grid.area.length; y++) {
  gridarea +="<tr>";
    for (let x = 0; x < grid.area[y].length; x++) {
      gridarea +=`<td id=${y}${x}>${grid.area[y][x] ? '<img src="images\\MarsRoverTopViewPurple.png"/>' : "" }</td>`;
    }
    gridarea +="</tr>";
}
gridarea +="</table>";
document.getElementById("box").innerHTML = gridarea ;
}

updateTable();