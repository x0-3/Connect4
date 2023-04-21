let playerRed = "R";
let playerYellow = "Y";
let currentPlayer = playerRed;

let gameOver = false;
let board;

let rows = 6;
let cols = 7;
let currcols = []; //keeps track of which row each colsumn is at.

window.onload = function() {
    
    setGame();
}

function setGame() {
    
    board = [];
    currcols = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        
        let row = [];
        
        for (let c = 0; c < cols; c++) {
            
            row.push(' ');

            let tile = document.createElement("div");
            
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {

    if (gameOver) {
        
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // figure out which row the current colsumn should be on
    r = currcols[c]; 

    if (r < 0) {
        
        return;
    }

    board[r][c] = currentPlayer; //update JS board
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    
    if (currentPlayer == playerRed) {
        
        tile.classList.add("redPiece");
        currentPlayer = playerYellow;
    } else {
        
        tile.classList.add("yellowPiece");
        currentPlayer = playerRed;
    }

    r -= 1; //update the row height for that colsumn
    currcols[c] = r; //update the array

    checkWin();
}

function checkWin() {

    // horizontal
    for (let r = 0; r < rows; r++) {

        for (let c = 0; c < cols - 3; c++){

            if (board[r][c] != ' ') {

                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {

                    setWin(r, c);
                    return;
                }
            }
         }
    }

    // vertical
    for (let c = 0; c < cols; c++) {

        for (let r = 0; r < rows - 3; r++) {
            
            if (board[r][c] != ' ') {
                
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    
                    setWin(r, c);
                    return;
                }
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        
        for (let c = 0; c < cols - 3; c++) {
            
            if (board[r][c] != ' ') {
                
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    
                    setWin(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        
        for (let c = 0; c < cols - 3; c++) {
            
            if (board[r][c] != ' ') {
                
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    
                    setWin(r, c);
                    return;
                }
            }
        }
    }
}

function setWin(r, c) {
    
    let winner = document.getElementById("winner");
    
    if (board[r][c] == playerRed) {
       
        winner.innerText = "Red Wins";             
    } else {
        
        winner.innerText = "Yellow Wins";
    }
    
    gameOver = true;
}