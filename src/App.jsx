import Player from './components/Player';
import GameBoard from './components/Gameboard';
import Log from './components/Log';
import GameOver from './components/GameOver';

import { useState } from 'react';
import { WINNING_COMBINATIONS } from './winning-combinations';

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
}

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function deriveWinner(gameBoard, players){

  let winner = undefined;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function deriveGameboard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array=>[...array])] //creating deep copy

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player
  }

  return gameBoard
}

function App() {

  const [players, setPlayers] = useState(PLAYERS)

  function handlePlayerNameChange(symbol, newName){
    setPlayers((prevPlayers)=>{
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  const [gameTurns, setGameTurns] = useState([]);

  const gameBoard = deriveGameboard(gameTurns)

  const activePlayer = deriveActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {

    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns]
      return updatedTurns;
    })

  }

  function handleRestart(){
    setGameTurns([]);
  }

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner

  return (
    <main>
      <div id="game-container">
        {winner || hasDraw ? <GameOver winner={winner} onRestart={handleRestart}/> : null}
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange} />
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
