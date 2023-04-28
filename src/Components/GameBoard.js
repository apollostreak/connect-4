import React, { useEffect, useState } from "react";
import Header from "./Header";
import GameCircle from "./GameCircle";
import Footer from "./Footer";
import '../Game.css';
import { isDraw, isWinner, getComputerMove } from "../Helper";

import { GAME_STATE_PLAY, GAME_STATE_WIN, NOPLAYER, PLAYER_1, PLAYER_2, NO_CIRCLES, GAME_STATE_DRAW } from "../Constants"

const GameBoard = () => {
    const [gameBoard, setGameBoard] = useState(Array(NO_CIRCLES).fill(NOPLAYER));
    //gameBoard will give the current state and setGameBoard <callback function> will be used to update the state
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
    const [gameState, setGameState] = useState(GAME_STATE_PLAY);
    const [winPlayer, setWinPlayer] = useState(NOPLAYER);

    console.log(gameBoard);

    const initGame = () => {
        console.log('initGame');
        setGameBoard(Array(NO_CIRCLES).fill(NOPLAYER));
        setCurrentPlayer(PLAYER_1);
        setGameState(GAME_STATE_PLAY);
    }
    useEffect(() => { // will be fired when the component first loads
        initGame();
    },[]);

    const initBoard = () => {
        const circles = [];
        for (let i = 0; i < NO_CIRCLES; i++){
            circles.push(renderCircle(i));
        }
        return circles;
    }

    const suggestMove = () => {
        circleClicked(getComputerMove(gameBoard));
    }
     
    const circleClicked = (id) => {
        // here the circleClicked is passed as the callback function to child component (<GameCircle>) from the parent component (<GameBoard>)

        console.log('circleClicked: '+id);

        if(gameBoard[id] !== NOPLAYER) return;

        if(gameState !== GAME_STATE_PLAY) return;

        if(isWinner(gameBoard,id,currentPlayer)){
            setGameState(GAME_STATE_WIN);
            setWinPlayer(currentPlayer);
        }

        if(isDraw(gameBoard,id,currentPlayer)){
            setGameState(GAME_STATE_DRAW);
            setWinPlayer(NOPLAYER);
        }
        // const board = [...gameBoard];
        // board[id] = currentPlayer;
        // setGameBoard(board);

        setGameBoard(prev =>{
            return prev.map((circle,pos) => {
                if(pos === id) return currentPlayer;
                return circle;
            })
        })
        setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2: PLAYER_1);
        console.log(gameBoard);
        console.log(currentPlayer);
        // console.log(board);
    }    

    const renderCircle = id => {
        return (
        <GameCircle 
            key = {id}
            id = {id} 
            className = {`player_${gameBoard[id]}`} 
            onCircleClicked = {circleClicked} //circleClicked is the function prop/callback function passed to the GameCircle
        />
        );
    }

    return (
        <>
            <Header gameState = {gameState} currentPlayer = {currentPlayer} winPlayer = {winPlayer}/>
            <div className = "gameBoard">{initBoard()}</div>
            <Footer onNewGameClick = {initGame} onSuggestClick = {suggestMove} gameState = {gameState} />
        </>
    );
}
export default GameBoard;