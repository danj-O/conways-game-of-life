const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const resolution = 10
canvas.width = 800
canvas.height = 800

const cols = canvas.width / resolution
const rows = canvas.height / resolution

//builds the 10x10 array
function buildGrid() {
  return new Array(cols).fill(null)
    .map(() => new Array(rows).fill(null)
    .map(() => Math.floor(Math.random() * 2)))
}

let grid = buildGrid()
requestAnimationFrame(update)


function update() {
  grid = nextGen(grid )
  setTimeout(render(grid), 8000) 
  requestAnimationFrame(update)
}

//need to create a copy of the arrays to update grid
function nextGen(grid) {
  const nextGen = grid.map(arr => [...arr])

  for (let col = 0; col < grid.length; col++){
    for (let row = 0; row < grid[col].length; row++){
      const cell = grid[col][row]
      let numNeighbors = 0
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++){
          //don't count the grid item itself
          if (i === 0 && j === 0){
            continue;
          }
          const x_cell = col + i;
          const y_cell = row + j;

          if (x_cell >= 0 && y_cell >= 0 && x_cell < cols && y_cell < rows) {
            //find all the neighbors
            const currentNeightbor = grid[col + i][row + j]
            numNeighbors += currentNeightbor
          }
        }
      }
      //rules
      if (cell === 1 && numNeighbors < 2) {
        nextGen[col][row] = 0
      } else if (cell === 1 && numNeighbors > 3) {
        nextGen[col][row] = 0
      } else if (cell === 0 && numNeighbors === 3) {
        nextGen[col][row] = 1 
      }
    }
  }
  return nextGen
}

function render(grid) {
  for (let col = 0; col < grid.length; col++){
    for (let row = 0; row < grid[col].length; row++){
      const cell = grid[col][row]

      ctx.beginPath();
      // set x position, y position and width and height
      ctx.rect(col*resolution, row*resolution, resolution, resolution)
      ctx.fillStyle = cell ? 'yellow' : 'green'
      ctx.fill()
      // ctx.stroke()
    }
  }
}