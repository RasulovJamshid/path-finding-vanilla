let gridSize = [15,15];
let state = 3; //active button type to create wall|end|start
let start = [0, 0];
let end = [0, 0];
var root = document.getElementById("root");
let id = 1; //grid Creation
let winHeight=window.innerHeight;
let winWidth=window.innerWidth;

gridSize[1]=parseInt(winWidth/20,10)-5;
gridSize[0]=parseInt(winHeight/20,10)-5;

for (let i = 0; i < gridSize[0]; i++) {
  let row = document.createElement("div");
  row.className = "row";
  row.dataset.row = i;

  for (let j = 0; j < gridSize[1]; j++) {
    let col = document.createElement("span");

    
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
         case 4:
            {
              col.style.backgroundColor = "white";
              col.className = "column";
            }
            break;

          default:
            {
              col.style.backgroundColor = "#1f1e1ea6";
              col.className = "wall";
            }
            ;
        }
      });
    

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
    case "btn4":
      {
        state = 4;
      }
      break;

    default:
      state = 3;
  }
} //event listener to all button group elements


btnGroup.childNodes.forEach(i => i.addEventListener("click", markNode)); //path-finding function

function actionListener() {
  let grid = [];

  for (var i = 0; i < gridSize[0]; i++) {
    for (var j = 0; j < gridSize[1]; j++) {
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
    setTimeout(() => root.childNodes[result[i].x].childNodes[result[i].y].style.backgroundColor = "rgb(80, 237,229)", i * 50);
  }
}
  //path-finding function end

function clearColumns(){
  root.childNodes.forEach(i=>i.childNodes.forEach(j=>{j.className="column";j.style.backgroundColor="white";}))
}
      
