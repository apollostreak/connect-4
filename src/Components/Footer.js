import React from 'react'
import { GAME_STATE_PLAY } from "../Constants"

const Footer = ({onNewGameClick,onSuggestClick,gameState}) => {
  return (
    <div className='panel footer'>
      {gameState === GAME_STATE_PLAY && <button onClick={onSuggestClick}>Suggest</button>}
      {gameState !== GAME_STATE_PLAY && <button onClick={onNewGameClick}>New Game</button>}
    </div>
  )
}

export default Footer;