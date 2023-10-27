

export default function GameBoard({ onSelectSquare , gameBoard}) {

    // const [gameBoard, setGameboard ] = useState(initialGameBoard); //commented due to recommended to derive

    // function handleSelectSquare(rowIndex, colIndex){
    //     setGameboard((prevGameBoard)=>{ //prevGameBoard is passed in automatically by react
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])]
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;

    //         //prevGameBoard[rowIndex][colIndex] = 'X' //do not use this
    //         //return prevGameBoard;
    //     }) 

    //     onSelectSquare(); //calling function from outside the gameboard component
    // }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex)=><li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => <li key={colIndex}><button onClick={()=> {onSelectSquare(rowIndex, colIndex)}} disabled={playerSymbol !== null}>{playerSymbol}</button></li>)}
                </ol>
            </li>)}
        </ol>
    )
}