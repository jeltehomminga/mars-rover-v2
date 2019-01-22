// Rover Object Goes Here
// ======================
const roverOne = {
  name: "roverOne",
  direction: "N",
  x: 0,
  y: 0,
  travelLog: []
}

const roverTwo = {
  name: "roverTwo",
  direction: "N",
  x: 5,
  y: 3,
  travelLog: []
}


// Grid Object
var row = [null, null, null, null, null, null, null, null, null, null];
const grid = {
  area: [[...row],[...row],[...row],[...row],[...row],
        [...row],[...row],[...row],[...row],[...row]],
  yMin: 0,
  xMin: 0,      
  yMax: 9,
  xMax: 9,
  checkPosition(yNew,xNew){ 
    if (yNew < this.yMin || yNew > this.yMax || xNew < this.xMin  || xNew > this.xMax) {
    console.log("you bumped against the wall");
   } else if (grid.area[yNew][xNew]) {
    console.log("You bumped into my rover!") ;
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
    break;
    case "E":
    rover.direction = "N";
    break;
    case "S":
    rover.direction = "E";
    break;
    case "W":
    rover.direction = "S";
    break;
    default: rover.direction = "N";
  }
}

function turnRight(rover){
  console.log("turnRight was called!");
  switch (rover.direction) {
    case "N":
    rover.direction = "E";
    break;
    case "E":
    rover.direction = "S";
    break;
    case "S":
    rover.direction = "W";
    break;
    case "W":
    rover.direction = "N";
    break;
    default: rover.direction = "N";
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
    default:
    console.log("Erorrrrr....No valid direction") ;
   } if (grid.checkPosition(yNew, xNew) === true) {
     grid.area[rover.y][rover.x] = null;
     grid.area[yNew][xNew] = rover.name;
     rover.x = xNew;
     rover.y = yNew;
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
    default:
    console.log("Erorrrrr....No valid direction") ;
  } if (grid.checkPosition(yNew, xNew) === true) {
    grid.area[rover.y][rover.x] = null;
    grid.area[yNew][xNew] = rover.name;
    rover.x = xNew;
    rover.y = yNew;
    } else {
      return grid.checkPosition;
    }
}

function travel(rover,string){
  for (i = 0; i < string.length; i++) {
    let previousPosition = [rover.y, rover.x]
    if (string[i] === "f") {
      moveForward(rover);
      rover.travelLog.push(previousPosition);
    } else if (string[i] === "r") {
      turnRight(rover);
    } else if (string[i] === "l") {
      turnLeft(rover);
    } else if (string[i] === "b") {
      moveBackward(rover);
      rover.travelLog.push(previousPosition);
    } else {
      console.log("unknown travel command");
    }
  }

}