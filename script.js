const bigCells = document.querySelectorAll('.big-cell');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let nextAllowedCell = null;

// Reset qilish funksiyasi
function resetGame() {
  bigCells.forEach(bigCell => {
    bigCell.innerHTML = '';
    bigCell.classList.remove('won');
    bigCell.dataset.winner = '';
  });
  currentPlayer = 'X';
  nextAllowedCell = null;
  document.getElementById('winner-display').textContent = '';
}

// G‘olibni aniqlash funksiyasi
function checkWinner(board) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a];
    }
  }
  return null;
}

// Katta katakda g‘olibni tekshirish
function checkBigBoardWinner() {
  const bigBoard = Array.from(bigCells).map(cell => cell.dataset.winner || '');
  const winner = checkWinner(bigBoard);
  if (winner) {
    document.getElementById('winner-display').textContent = `${winner} WON`;
    return true; // O'yin tugadi
  }
  if (!bigBoard.includes('')) {
    document.getElementById('winner-display').textContent = 'TIE';
    return true; // Durang holat
  }
  return false;
}

// O'yinchi harakat qilganda
bigCells.forEach((bigCell, index) => {
  const smallCells = [];
  for (let i = 0; i < 9; i++) {
    const smallCell = document.createElement('div');
    smallCell.dataset.index = i;
    smallCells.push(smallCell);
    bigCell.appendChild(smallCell);

    smallCell.addEventListener('click', () => {
      if (bigCell.dataset.winner || smallCell.textContent) return;

      // Katta katakdagi yo‘naltirish cheklovi
      if (
        nextAllowedCell !== null &&
        nextAllowedCell !== index &&
        !bigCells[nextAllowedCell].dataset.winner
      ) {
        alert('Siz faqat ruxsat etilgan katakka qo‘ya olasiz!');
        return;
      }

      smallCell.textContent = currentPlayer;

      // Kichik katakda g‘olibni tekshirish
      const board = smallCells.map(cell => cell.textContent);
      const winner = checkWinner(board);

      if (winner) {
        bigCell.innerHTML = winner;
        bigCell.classList.add('won');
        bigCell.dataset.winner = winner;
        nextAllowedCell = null; // G‘olib bo‘lgach, yo‘naltirish cheklovi olib tashlanadi
      } else {
        nextAllowedCell = parseInt(smallCell.dataset.index);
      }

      // Agar katta katakda g'olib aniqlansa, o'yinni tekshirish
      if (checkBigBoardWinner()) return;

      // O'yinchi almashtirish
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    });
  }
});

// Reset tugmasi funksiyasi
resetButton.addEventListener('click', resetGame);
