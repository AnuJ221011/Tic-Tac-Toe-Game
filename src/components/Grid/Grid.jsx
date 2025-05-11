import { useState } from "react";
import Card from "../Card/Card";
import './Grid.css'
import isWinner from "../../helpers/checkWinner";

function Grid({numberOfCards}){
    const [board, setBoard] = useState(Array(numberOfCards).fill(""));

    const[turn, setTurn] = useState(true); // true => O, false => X

    const[winner, SetWinner] = useState(null);

    function play(index){

        if (board[index] !== "" || winner) return;

        if(turn){
            board[index] = 'O';
        }
        else{
            board[index] = 'X';
        }

        const win = isWinner(board, turn ? 'O' : 'X');
        if(win){
            SetWinner(win);
        }
        else if (!board.includes("")) {
            SetWinner("Draw"); // no winner and board is full
        }
        setBoard([...board]);
        setTurn(!turn);
    }

    function reset(){
        setTurn(true);
        SetWinner(null);
        setBoard(Array(numberOfCards).fill(""));
    }

    return (
        <div className="grid-wrapper">
            {
                winner && (
                    <>
                        <h1 className="turn-highlight">
                            {winner === "Draw" ? "Game Draw!" : `Winner is ${winner}`}
                        </h1>
                        <button className="reset" onClick={reset}>Reset Game</button>

                    </>
                )
            }
           {!winner && <h1 className="turn-highlight">Current Turn : {(turn) ? 'O':'X'}</h1>}
            <div className="grid">
                {board.map((ele, idx) => <Card gameEnd={winner ? true : false} key={idx} onPlay = {play} player={ele} index = {idx} />)}
            </div>
        </div>
    );
}

export default Grid;