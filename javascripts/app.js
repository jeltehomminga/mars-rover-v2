// Rover Object Goes Here
// ======================
const roverOne = {
  name: "roverOne",
  direction: "N",
  y: 0,
  x: 0,
  travelLog: []
};

const roverTwo = {
  name: "roverTwo",
  direction: "N",
  y: 3,
  x: 5,
  travelLog: []
};

// Grid Object
// this will push new arrays with length 10 into the gridArray 
// while the gridArray length is less than 10 
let gridArray = [];
while(gridArray.push([...Array(10)]) < 10);

const grid = {
  area: gridArray,
  yMin: 0,
  xMin: 0,
  yMax: 9,
  xMax: 9,
  checkPosition(yNew, xNew) {
    if (
      yNew < this.yMin ||
      yNew > this.yMax ||
      xNew < this.xMin ||
      xNew > this.xMax
    ) {
      return console.log("you bumped against the wall");
    } else if (grid.area[yNew][xNew]) {
      return console.log("You bumped into my rover!");
    } else {
      return true;
    }
  }
};

// place the rovers on the grid area
grid.area[roverOne.y][roverOne.x] = roverOne.name;
// place the roverTwo randomly somewhere on the grid
roverTwo.y = Math.floor(Math.random() * 9) + 1;
roverTwo.x = Math.floor(Math.random() * 9) + 1;
grid.area[roverTwo.y][roverTwo.x] = roverTwo.name;

// ======================
function turnLeft(rover) {
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
    default:
      rover.direction = "N";
      break;
  }
  return updateTable();
}

function turnRight(rover) {
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
    default:
      rover.direction = "N";
      break;
  }
  return updateTable();
}

function moveForward(rover) {
  console.log("moveForward was called");
  let xNew = rover.x;
  let yNew = rover.y;
  switch (rover.direction) {
    case "N":
      yNew--;
      break;
    case "E":
      xNew++;
      break;
    case "S":
      yNew++;
      break;
    case "W":
      xNew--;
      break;
    default:
      console.log("Erorrrrr....No valid direction");
      break;
  }
  if (grid.checkPosition(yNew, xNew) === true) {
    grid.area[rover.y][rover.x] = null;
    grid.area[yNew][xNew] = rover.name;
    rover.x = xNew;
    rover.y = yNew;
    return updateTable();
  } else {
    return grid.checkPosition;
  }
}

function moveBackward(rover) {
  console.log("moveBackward was called");
  let xNew = rover.x;
  let yNew = rover.y;
  switch (rover.direction) {
    case "N":
      yNew++;
      break;
    case "E":
      xNew--;
      break;
    case "S":
      yNew--;
      break;
    case "W":
      xNew++;
      break;
    default:
      console.log("Erorrrrr....No valid direction");
      break;
  }
  if (grid.checkPosition(yNew, xNew) === true) {
    grid.area[rover.y][rover.x] = null;
    grid.area[yNew][xNew] = rover.name;
    rover.x = xNew;
    rover.y = yNew;
    return updateTable();
  } else {
    return grid.checkPosition;
  }
}

function travel(rover, string) {
  console.log(
    `Hi it's me, ${rover.name}. I'm now at position ${[rover.y, rover.x]}`
  );
  for (i = 0; i < string.length; i++) {
    let previousPosition = [rover.y, rover.x];
    switch (string[i]) {
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
        return `I don't know the command ${string[i]}, I will stay here at ${[
          rover.y,
          rover.x
        ]}`;
    }
  }
  return console.log(`My travel has ended at position ${[rover.y, rover.x]} `);
}

function updateTable() {
  let gridarea = "<table border='1|1'>";
  for (let y = 0; y < grid.area.length; y++) {
    gridarea += "<tr>";
    for (let x = 0; x < grid.area[y].length; x++) {
      gridarea += `<td id=${y}${x}>${
        grid.area[y][x]
          ? `<img id=${grid.area[y][x]} class=${
          grid.area[y][x] == "roverOne"
            ? roverOne.direction
            : roverTwo.direction
          } 
      src="images\\MarsRoverTopViewPurple.png"/>`
          : ""
        }</td>`;
    }
    gridarea += "</tr>";
  }
  gridarea += "</table>";
  document.getElementById("box").innerHTML = gridarea;
}

updateTable();

// control roverOne by mouse or keyboard

let upControl = document.getElementById("upcontrol");
let rightControl = document.getElementById("rightcontrol");
let leftControl = document.getElementById("leftcontrol");
let downControl = document.getElementById("downcontrol");

// control by mouseclick
upControl.onclick = () => travel(roverOne, "f");
rightControl.onclick = () => travel(roverOne, "r");
leftControl.onclick = () => travel(roverOne, "l");
downControl.onclick = () => travel(roverOne, "b");

//control by arrowkeys
document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 37:
      travel(roverOne, "l");
      break;
    case 38:
      travel(roverOne, "f");
      break;
    case 39:
      travel(roverOne, "r");
      break;
    case 40:
      travel(roverOne, "b");
      break;
  }
};

//submit travel plan

const button = document.getElementById("submittravelplan");

button.onclick = () => {
  let value = document.getElementById("inputtext").value;
  let valueLowerCase = value.toLowerCase();
  travel(roverOne, valueLowerCase);
  document.getElementById("inputtext").value = "";
};

const keyCode = event => event.keyCode == 13 ? button.onclick() : "";
