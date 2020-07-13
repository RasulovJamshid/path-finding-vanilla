let gridSize = 15;
let state = 3; //active button type to create wall|end|start

let start = [0, 0];
let end = [0, 0];
var root = document.getElementById("root");
let id = 1; //grid Creation

for (let i = 0; i < gridSize; i++) {
  let row = document.createElement("div");
  row.className = "row";
  row.dataset.row = i;

  for (let j = 0; j < gridSize; j++) {
    let col = document.createElement("span");

    if (j >= 5 && i === 5) {
      col.className = "wall";
    } else {
      col.className = "column";
      col.addEventListener("click", () => {
        switch (state) {
          case 1:
            {
              col.style.backgroundColor = "green";
              col.className = "start";
              start[0] = row.dataset.row;
              start[1] = col.dataset.column;
            }
            break;

          case 2:
            {
              col.style.backgroundColor = "red";
              col.className = "end";
              end[0] = row.dataset.row;
              end[1] = col.dataset.column;
            }
            break;

          default:
            {
              col.style.backgroundColor = "gray";
              col.className = "wall";
            }
            ;
        }
      });
    }

    col.ondragstart = "event.dataTransfer.setData('text/plain',null)";
    col.draggable = "true";
    col.dataset.column = j;
    row.appendChild(col);
  }

  root.appendChild(row);
} //grid Creation end


let btnGroup = document.getElementById("btnGroup"); //button type wall|start|end

function markNode(e) {
  let name = e.target.name;

  switch (name) {
    case "btn1":
      {
        state = 1;
      }
      break;

    case "btn2":
      {
        state = 2;
      }
      break;

    default:
      state = 3;
  }
} //event listener to all button group elements


btnGroup.childNodes.forEach(i => i.addEventListener("click", markNode)); //path-finding function

function actionListener() {
  let grid = [];

  for (var i = 0; i < gridSize; i++) {
    for (var j = 0; j < gridSize; j++) {
      grid.push([]);

      if (root.childNodes[i].childNodes[j].className === "wall") {
        grid[i].push(0);
      } else {
        grid[i].push(1);
      }
    }
  }

  let graph = new Graph(grid);
  let startPoint = graph.grid[start[0]][start[1]];
  root.childNodes[start[0]].childNodes[start[1]].style.backgroundColor = "red";
  let endPoint = graph.grid[end[0]][end[1]];
  root.childNodes[end[0]].childNodes[end[1]].style.backgroundColor = "red";
  let result = astar.search(graph, startPoint, endPoint);

  for (let i = 0; i < result.length - 1; i++) {
    setTimeout(() => root.childNodes[result[i].x].childNodes[result[i].y].style.backgroundColor = "green", i * 50);
  }
}
	//path-finding function end

		
	    

