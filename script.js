// Game variables
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let gameState = `Player ${currentPlayer}'s turn`;

// Win combinations
const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

// Function to handle cell clicks
function handleClick(cellIndex) {
    if (gameActive && board[cellIndex] === '') {
        board[cellIndex] = currentPlayer;
        document.getElementById(`cell-${cellIndex}`).innerText = currentPlayer;

        if (checkWin()) {
            gameState = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (checkDraw()) {
            gameState = `It's a draw!`;
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            gameState = `Player ${currentPlayer}'s turn`;
        }

        document.getElementById('status').innerText = gameState;
    }
}

// Function to check for a win
function checkWin() {
    for (let combo of winCombinations) {
        let [a, b, c] = combo;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            highlightWinningCombo(a, b, c);
            return true;
        }
    }
    return false;
}

// Function to highlight winning combination
function highlightWinningCombo(a, b, c) {
    document.getElementById(`cell-${a}`).classList.add('win');
    document.getElementById(`cell-${b}`).classList.add('win');
    document.getElementById(`cell-${c}`).classList.add('win');
}

// Function to check for a draw
function checkDraw() {
    return board.every(cell => cell !== '');
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    gameState = `Player ${currentPlayer}'s turn`;

    document.getElementById('status').innerText = gameState;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('win');
    });
}
