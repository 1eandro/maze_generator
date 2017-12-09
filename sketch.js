var cols, rows;
var w = 40
var grid = []

var current

function setup() {
    createCanvas(400, 400)
    cols = floor(width / w)
    rows = floor(height / w)

    frameRate(150)

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var cell = new Cell(i, j)
            grid.push(cell)
        }
    }

    current = grid[0]
}

function draw() {
    background(51)
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    current.visited = true;
    var next = current.checkNeighbors();
    if (next) {
        next.visited = true;
        current = next;
    }

}

function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1
    }
    return i + j * cols;
}

function Cell(i, j) {
    this.i = i
    this.j = j
    this.walls = [true, false, false, true]
    this.visited = false

    this.checkNeighbors = function() {
        var neighbors = [];

        var top = grid[index(i, j - 1)]
        var right = grid[index(i + 1, j)]
        var bottom = grid[index(i, j + 1)]
        var left = grid[index(i - 1, j)]

        if (top && !top.visited) {
            neighbors.push(top)
            // console.log('pushed top')
        }

        if (right && !right.visited) {
            neighbors.push(right)
            // console.log('pushed right')
        }

        if (bottom && !bottom.visited) {
            neighbors.push(bottom)
            // console.log('pushed bottom')
        }

        if (left && !left.visited) {
            neighbors.push(left)
            // console.log('pushed left')
        }

        if (neighbors.length > 0) {
            var r = floor(random(0, neighbors.length))
            return neighbors[r]
        } else {
            return undefined;
        }
    }

    this.show = function() {
        var x = this.i * w
        var y = this.j * w
        stroke(255, 255, 0)

        if (this.walls[0]) {
            line(x, y, x + w, y)
        }

        if (this.walls[1]) {
            line(x + w, y, x + w, y + w)
        }

        if (this.walls[2]) {
            line(x + w, y + w, x, y + w)
        }

        if (this.walls[3]) {
            line(x, y + w, x, y)
        }

        if (this.visited) {
            fill(255, 0, 255, 100)
            rect(x, y, w, w)
        }


        // noFill()
        // rect(x, y, w, w)
    }
}