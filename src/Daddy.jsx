import React, { useState } from 'react';

const NineMensMorrisGame = () => {
  const initialBoard = Array(24).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isPlayerOne, setIsPlayerOne] = useState(true);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [phase, setPhase] = useState('placing'); // 'placing' or 'moving'
  const [piecesLeft, setPiecesLeft] = useState({ player1: 9, player2: 9 });

  const handleClick = (index) => {
    if (phase === 'placing') {
      placePiece(index);
    } else if (phase === 'moving') {
      movePiece(index);
    }
  };

  const placePiece = (index) => {
    if (board[index] !== null) return;

    const newBoard = [...board];
    newBoard[index] = isPlayerOne ? 'player1' : 'player2';
    setBoard(newBoard);

    const newPiecesLeft = { ...piecesLeft };
    if (isPlayerOne) {
      newPiecesLeft.player1 -= 1;
    } else {
      newPiecesLeft.player2 -= 1;
    }
    setPiecesLeft(newPiecesLeft);

    if (newPiecesLeft.player1 === 0 && newPiecesLeft.player2 === 0) {
      setPhase('moving');
    }

    setIsPlayerOne(!isPlayerOne);
  };

  const movePiece = (index) => {
    if (selectedPiece !== null && board[selectedPiece] === (isPlayerOne ? 'player1' : 'player2')) {
      if (board[index] === null && isAdjacent(selectedPiece, index)) {
        const newBoard = [...board];
        newBoard[selectedPiece] = null;
        newBoard[index] = isPlayerOne ? 'player1' : 'player2';
        setBoard(newBoard);
        setSelectedPiece(null);
        setIsPlayerOne(!isPlayerOne);
      }
    } else if (board[index] === (isPlayerOne ? 'player1' : 'player2')) {
      setSelectedPiece(index);
    }
  };

  const isAdjacent = (from, to) => {
    const adjacencies = {
      0: [1, 9],
      1: [0, 2, 4],
      2: [1, 14],
      3: [4, 10],
      4: [1, 3, 5, 7],
      5: [4, 13],
      6: [7, 11],
      7: [4, 6, 8],
      8: [7, 12],
      9: [0, 10, 21],
      10: [3, 9, 11, 18],
      11: [6, 10, 15],
      12: [8, 13, 17],
      13: [5, 12, 14, 20],
      14: [2, 13, 23],
      15: [11, 16],
      16: [15, 17, 19],
      17: [12, 16],
      18: [10, 19],
      19: [16, 18, 20, 22],
      20: [13, 19],
      21: [9, 22],
      22: [19, 21, 23],
      23: [14, 22],
    };
    return adjacencies[from].includes(to);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500 p-10">
      <h1 className="text-4xl mb-10 text-white">Nine Men's Morris Game</h1>
      <div className="grid grid-cols-7 grid-rows-7 gap-1">
        {Array.from({ length: 49 }).map((_, index) => {
          const col = index % 7;
          const row = Math.floor(index / 7);

          // Only render slots for the board positions (there are 24 valid slots)
          if (
            (col === 0 && (row === 0 || row === 3 || row === 6)) ||
            (col === 1 && (row === 1 || row === 3 || row === 5)) ||
            (col === 2 && (row === 2 || row === 3 || row === 4)) ||
            (col === 3 && row === 3) ||
            (col === 4 && (row === 2 || row === 3 || row === 4)) ||
            (col === 5 && (row === 1 || row === 3 || row === 5)) ||
            (col === 6 && (row === 0 || row === 3 || row === 6))
          ) {
            const slotIndex =
              col === 0
                ? row === 0
                  ? 0
                  : row === 3
                  ? 9
                  : 21
                : col === 1
                ? row === 1
                  ? 1
                  : row === 3
                  ? 4
                  : 16
                : col === 2
                ? row === 2
                  ? 2
                  : row === 3
                  ? 7
                  : 14
                : col === 3
                ? row === 3
                  ? 10
                  : row === 2
                  ? 18
                  : 6
                : col === 4
                ? row === 2
                  ? 19
                  : row === 3
                  ? 11
                  : 13
                : col === 5
                ? row === 1
                  ? 3
                  : row === 3
                  ? 5
                  : 15
                : row === 0
                ? 23
                : row === 3
                ? 22
                : 8;

            const piece = board[slotIndex];
            const isSelected = selectedPiece === slotIndex;

            return (
              <div
                key={index}
                className={`w-12 h-12 bg-transparent border border-gray-400 cursor-pointer ${
                  isSelected ? 'border-red-500' : ''
                }`}
                onClick={() => handleClick(slotIndex)}
              >
                {piece && (
                  <div
                    className={`w-8 h-8 rounded-full ${
                      piece === 'player1' ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                  ></div>
                )}
              </div>
            );
          } else {
            return <div key={index} className="w-12 h-12 bg-transparent"></div>;
          }
        })}
      </div>
      <div className="mt-10 flex flex-col items-center">
        {phase === 'placing' && (
          <p className="text-2xl text-white">
            {isPlayerOne ? 'Player 1 (Red)' : 'Player 2 (Blue)'}'s Turn to Place a Piece
          </p>
        )}
        {phase === 'moving' && (
          <p className="text-2xl text-white">
            {isPlayerOne ? 'Player 1 (Red)' : 'Player 2 (Blue)'}'s Turn to Move a Piece
          </p>
        )}
      </div>
    </div>
  );
};

export default NineMensMorrisGame;
