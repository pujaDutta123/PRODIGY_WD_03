document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const resetBtn = document.getElementById('resetBtn');
    let currentPlayer = 'X';
    let gameActive = true;
    let boardState = ['', '', '', '', '', '', '', '', ''];

    // Function to handle click on cells
    const handleCellClick = (index) => {
        if (boardState[index] === '' && gameActive) {
            boardState[index] = currentPlayer;
            renderBoard();
            if (checkWin()) {
                alert(`${currentPlayer} wins!`);
                gameActive = false;
            } else if (checkDraw()) {
                alert("It's a draw!");
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    };

    // Function to render the board
    const renderBoard = () => {
        board.innerHTML = '';
        boardState.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.textContent = cell;
            cellElement.addEventListener('click', () => handleCellClick(index));
            board.appendChild(cellElement);
        });
    };

    // Function to check for a win
    const checkWin = () => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return winConditions.some((condition) => {
            const [a, b, c] = condition;
            return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        });
    };

    // Function to check for a draw
    const checkDraw = () => {
        return !boardState.includes('');
    };

    // Function to reset the game
    const resetGame = () => {
        currentPlayer = 'X';
        gameActive = true;
        boardState = ['', '', '', '', '', '', '', '', ''];
        renderBoard();
    };

    // Event listener for reset button
    resetBtn.addEventListener('click', resetGame);

    // Initial render
    renderBoard();
});
